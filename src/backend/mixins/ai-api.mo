import LeadTypes "../types/leads";
import Common "../types/common";
import AiLib "../lib/ai";
import LocalSeoLib "../lib/local-seo";
import ProfileLib "../lib/profile";
import ColdCallConfigLib "../lib/cold-call-config";
import SignUpFormTypes "../types/signup-forms";
import SignUpFormsLib "../lib/signup-forms";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

mixin (
  leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
  profiles : Map.Map<Principal, Common.UserProfile>,
  coldCallConfigs : Map.Map<Principal, Common.ColdCallScriptConfig>,
  subscriptions : List.List<Common.UserSubscription>,
  apiKeyRef : { var key : Text },
  formsMap : Map.Map<Principal, List.List<SignUpFormTypes.SignUpForm>>,
) {


  // ── Token helper ─────────────────────────────────────────────────
  // Returns ?sub if the caller has tAI tokens available, null otherwise.
  // Caller MUST deduct after a successful HTTP call.
  func findSubWithTai(caller : Principal) : ?Common.UserSubscription {
    subscriptions.find(func(s) {
      Principal.equal(s.principal, caller) and s.taiTokens > 0
    })
  };

  // ── Helper: resolve the effective Theta API key ─────────────────
  // Reads from the mutable ref injected at construction time.
  // The ref is pre-populated with the hardwired default in main.mo so it is
  // never empty in practice — but we guard anyway.
  // Named resolveAiThetaKey to avoid collision with theta-api.mo mixin.
  func resolveAiThetaKey() : Text {
    apiKeyRef.key
  };

  // ── Helper: make Theta LLM HTTP call ─────────────────────────────
  // Calls the Theta EdgeCloud On-Demand Model API (llama_3_8b:quantized).
  // URL: https://ondemand.thetaedgecloud.com/infer_request/chat/completions
  // stream is always false — IC HTTP outcalls do not support streaming.
  // Retries up to 3 times on transient failures.
  // Returns #ok(content) or #err(message) with HTTP status in error string.
  func callThetaLlm(systemPrompt : Text, userMessage : Text, maxResponseBytes : Nat64) : async { #ok : Text; #err : Text } {
    let key = if (apiKeyRef.key != "") apiKeyRef.key else AiLib.THETA_API_KEY_DEFAULT;
    if (key == "") {
      return #err("AI service not configured — please set the Theta API key in the admin panel.");
    };
    let requestBody = AiLib.buildThetaRequestBody(systemPrompt, userMessage);
    var attempt = 0;
    var lastErr = "AI service error: request did not execute";
    label retryLoop while (attempt < 3) {
      attempt += 1;
      try {
        let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
          url = AiLib.THETA_LLM_URL;
          max_response_bytes = ?maxResponseBytes;
          method = #post;
          headers = [
            { name = "Content-Type"; value = "application/json" },
            { name = "Authorization"; value = "Bearer " # key },
          ];
          body = ?requestBody;
          transform = null;
          is_replicated = ?false;
        });
        if (response.status == 200) {
          return #ok(AiLib.extractThetaContent(response.body));
        } else {
          let bodyText = switch (response.body.decodeUtf8()) {
            case (?t) t;
            case null "could not decode response body";
          };
          lastErr := "AI call failed (status " # response.status.toText() # "): " # bodyText;
          // 401/403 = bad key — no point retrying
          if (response.status == 401 or response.status == 403) {
            return #err(lastErr);
          };
        }
      } catch (e) {
        lastErr := "AI service error: HTTP call failed (attempt " # attempt.toText() # ") — check that the Theta API key is valid and the canister has HTTP outcall permissions.";
      };
    };
    #err(lastErr)
  };

  // ── Legacy Anthropic key resolver (kept for aiGenerateBrandedForm website fetch step) ──
  func resolveAnthropicKey() : Text {
    // No longer used for AI text generation — all calls now route to Theta LLM.
    // Retained only so the website-fetch step in aiGenerateBrandedForm can reference it
    // if ever re-routed back.  Returns empty intentionally.
    ""
  };

  // ── aiSearchLeads ────────────────────────────────────────────────
  // Takes a natural language query and searches the caller's lead list.
  // Returns a JSON array of matching lead IDs, e.g. [1,5,12].
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiSearchLeads(searchQuery : Text) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let callerLeads = switch (leadsMap.get(caller)) {
          case (?list) list.toArray();
          case null { [] };
        };
        if (callerLeads.size() == 0) return "[]";

        var leadsJson = "[";
        var first = true;
        for (l in callerLeads.values()) {
          if (not first) leadsJson #= ",";
          leadsJson #= AiLib.leadToJson(l);
          first := false;
        };
        leadsJson #= "]";

        let systemPrompt = "You are a smart lead search assistant for a sales agent. "
          # "You will be given a list of sales prospects in JSON format and a natural language query. "
          # "Return ONLY a JSON array of the numeric lead IDs that match the query — nothing else. "
          # "If no leads match, return []. Example output: [1,5,12]";

        let userMessage = "Leads:\n" # leadsJson # "\n\nQuery: " # searchQuery;

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateSmsTemplate ────────────────────────────────────────
  // Convenience wrapper — generates an SMS template using the shared template generator.
  // Returns JSON {"body":"..."} (body under 160 chars).
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiGenerateSmsTemplate(
    goal : Text,
    audience : Text,
    keyPoints : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = "You are an expert business communication specialist helping sales agents "
          # "reach out to prospects and grow their pipeline. "
          # "Your tone is always consultative, professional, and respectful — never salesy or pushy. "
          # "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
          # "{\"body\":\"...\"} — SMS body must be under 160 characters.";

        let userMessage = "Generate an SMS template.\n"
          # "Goal: " # goal # "\n"
          # "Target audience: " # audience # "\n"
          # "Key points to include: " # keyPoints;

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateEmailTemplate ──────────────────────────────────────
  // Convenience wrapper — generates an email template using the shared template generator.
  // Returns JSON {"subject":"...","body":"..."}.
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiGenerateEmailTemplate(
    goal : Text,
    audience : Text,
    keyPoints : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = "You are an expert business communication specialist helping sales agents "
          # "reach out to prospects and grow their pipeline. "
          # "Your tone is always consultative, professional, and respectful — never salesy or pushy. "
          # "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
          # "{\"subject\":\"...\",\"body\":\"...\"}";

        let userMessage = "Generate an email template.\n"
          # "Goal: " # goal # "\n"
          # "Target audience: " # audience # "\n"
          # "Key points to include: " # keyPoints;

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateTemplate ───────────────────────────────────────────
  // Generates a professional email or SMS template for a sales agent.
  // templateType: "email" | "sms"
  // For email: returns JSON {"subject":"...","body":"..."}
  // For SMS: returns JSON {"body":"..."} (under 160 chars)
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiGenerateTemplate(
    templateType : Text,
    goal : Text,
    audience : Text,
    keyPoints : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let formatInstructions = if (templateType == "email") {
          "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
            # "{\"subject\":\"...\",\"body\":\"...\"}"
        } else {
          "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
            # "{\"body\":\"...\"} — SMS body must be under 160 characters."
        };

        let systemPrompt = "You are an expert business communication specialist helping sales agents "
          # "reach out to prospects and grow their pipeline. "
          # "Your tone is always consultative, professional, and respectful — never salesy or pushy. "
          # "Focus on helping prospects understand how your solution can support their goals. "
          # formatInstructions;

        let userMessage = "Generate a " # templateType # " template.\n"
          # "Goal: " # goal # "\n"
          # "Target audience: " # audience # "\n"
          # "Key points to include: " # keyPoints;

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateAdCopy ─────────────────────────────────────────────
  // Generates ad copy tailored to a specific platform's format constraints.
  // platform: "meta" | "google"
  // Returns JSON string: {"headline":"...","bodyCopy":"...","cta":"..."}
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiGenerateAdCopy(
    platform : Text,
    offerDescription : Text,
    repName : Text,
    companyName : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let (headlineLimit, bodyLimit, platformNotes) = if (platform == "meta") {
          (
            "40",
            "125",
            "Meta (Facebook/Instagram) ad format: primary text shown above the image (bodyCopy, up to 125 characters), "
              # "a short headline shown below the image or in the link preview (up to 40 characters), "
              # "and a CTA button label (e.g. 'Learn More', 'Sign Up', 'Get Started', 'Contact Us').",
          )
        } else {
          (
            "30",
            "90",
            "Google Search ad format: a short headline (up to 30 characters, no punctuation at the end), "
              # "a description line shown below the headline (up to 90 characters), "
              # "and a short CTA phrase (e.g. 'Get a Free Quote', 'Start Today', 'Learn More').",
          )
        };

        let systemPrompt = "You are an expert digital advertising copywriter. "
          # "You write concise, high-converting ad copy for sales professionals. "
          # "Platform context: " # platformNotes # " "
          # "STRICT character limits: headline must be " # headlineLimit # " characters or fewer, "
          # "bodyCopy must be " # bodyLimit # " characters or fewer. "
          # "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
          # "{\"headline\":\"...\",\"bodyCopy\":\"...\",\"cta\":\"...\"}";

        let userMessage = "Create " # platform # " ad copy for the following:\n"
          # "Sales rep: " # AiLib.jsonEscape(repName) # "\n"
          # "Company: " # AiLib.jsonEscape(companyName) # "\n"
          # "Offer / what you are selling: " # AiLib.jsonEscape(offerDescription);

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateAdCreatives ────────────────────────────────────────
  // Generates a creative brief for a visual ad campaign.
  // Returns JSON: {"imageDescription":"...","headlines":["...","...","..."],"colorPalette":["...","...","..."],"overlayText":"...","cta":"..."}
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiGenerateAdCreatives(
    platform : Text,
    conceptDescription : Text,
    targetAudience : Text,
    visualStyle : Text,
    companyName : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let platformContext = if (platform == "meta") {
          "Meta (Facebook/Instagram) visual ad: square or portrait image (1080x1080 or 1080x1350), "
            # "bold visual with minimal overlay text, strong CTA."
        } else {
          "Google Display ad: clean horizontal or square banner image, "
            # "clear brand identity, concise overlay text."
        };

        let systemPrompt = "You are an expert visual advertising creative director for digital campaigns. "
          # "Generate a creative brief for a " # platform # " ad. "
          # "Platform context: " # platformContext # " "
          # "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
          # "{\"imageDescription\":\"...\",\"headlines\":[\"...\",\"...\",\"...\"],\"colorPalette\":[\"...\",\"...\",\"...\"],\"overlayText\":\"...\",\"cta\":\"...\"}. "
          # "imageDescription: 2-3 sentence visual description for a designer or AI image generator. "
          # "headlines: exactly 3 headline variations, each under 40 characters. "
          # "colorPalette: exactly 3 hex color codes suggested for the creative. "
          # "overlayText: short bold text to display on the image (under 10 words). "
          # "cta: call-to-action button text (2-4 words).";

        let userMessage = "Create a creative brief for a " # platform # " ad.\n"
          # "Company: " # AiLib.jsonEscape(companyName) # "\n"
          # "Concept: " # AiLib.jsonEscape(conceptDescription) # "\n"
          # "Target audience: " # AiLib.jsonEscape(targetAudience) # "\n"
          # "Visual style: " # AiLib.jsonEscape(visualStyle);

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiCustomizeLandingTemplate ───────────────────────────────────
  // Generates a full HTML landing page for a specific industry and business.
  // The page includes: hero section, benefits, testimonial, and a lead capture form.
  // Costs 1 LtAI token (Landing Page AI token), not a standard tAI token.
  // If formId is non-empty, the generated HTML is also stored on the SignUpForm record.
  // Returns "INSUFFICIENT_LTAI_TOKENS: ..." if no LtAI tokens remain.
  // Returns the full HTML string or "ERROR: ..." on failure.
  public shared ({ caller }) func aiCustomizeLandingTemplate(
    templateHtml : Text,
    industry : Text,
    businessName : Text,
    formId : Text,
  ) : async Text {
    // Check LtAI token balance
    let maybeSub = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_LTAI_TOKENS: You have 0 LtAI tokens remaining. Purchase more for $0.25 each.";
      };
      case (?sub) {
        if (sub.ltaiTokens == 0) {
          return "INSUFFICIENT_LTAI_TOKENS: You have 0 LtAI tokens remaining. Purchase more for $0.25 each.";
        };

        let biz = if (businessName == "") industry # " Business" else businessName;

        let systemPrompt = "You are an expert web developer and copywriter specializing in lead generation landing pages. "
          # "Generate a COMPLETE, self-contained HTML landing page for the given business. "
          # "STRICT RULES — follow every one: "
          # "1. Output ONLY raw HTML starting with <!DOCTYPE html> — no markdown, no code fences, no explanation before or after. "
          # "2. Use only inline CSS styles — no external stylesheets, no <link> tags, no <style> blocks. "
          # "3. The page must be mobile-responsive using inline style max-width and percentage widths. "
          # "4. Include these 4 sections in order: "
          # "   a) HERO: large headline, subheadline, and a prominent CTA button that scrolls to the form. "
          # "   b) BENEFITS: 3 concise benefit cards with bold titles and 1-sentence descriptions. "
          # "   c) TESTIMONIAL: one short quote from a satisfied customer with a name and title. "
          # "   d) LEAD FORM: fields for Full Name, Phone Number, Email Address, and a submit CTA button. "
          # "5. The <form> must have: id=\"lead-form\", action=\"\", method=\"post\", and a hidden <input name=\"formId\"> whose value is the formId placeholder __FORM_ID__. "
          # "6. Color scheme: deep navy (#1a2744) header/footer, white body, orange (#f97316) CTA buttons. "
          # "7. Font: system-ui, -apple-system, sans-serif. "
          # "8. Keep the total HTML under 8000 characters.";

        let userMessage = "Generate a landing page for:\n"
          # "Business name: " # AiLib.jsonEscape(biz) # "\n"
          # "Industry: " # AiLib.jsonEscape(industry) # "\n"
          # (if (templateHtml != "") "Style inspiration (use only as tone reference, do not copy HTML): " # AiLib.jsonEscape(templateHtml.size().toText() # " chars provided") # "\n" else "");

        // Pre-deduct LtAI token before the HTTP call to prevent double-deduction on retry.
        sub.ltaiTokens -= 1;
        let thetaKey = if (apiKeyRef.key != "") apiKeyRef.key else AiLib.THETA_API_KEY_DEFAULT;
        let htmlResult = try {
          let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
            url = AiLib.THETA_LLM_URL;
            max_response_bytes = ?32768;
            method = #post;
            headers = [
              { name = "Content-Type"; value = "application/json" },
              { name = "Authorization"; value = "Bearer " # thetaKey },
            ];
            body = ?AiLib.buildThetaRequestBodyWithTokens(systemPrompt, userMessage, 2048);
            transform = null;
            is_replicated = ?false;
          });
          if (response.status == 200) {
            #ok(AiLib.extractThetaContent(response.body))
          } else {
            let bodyText = switch (response.body.decodeUtf8()) {
              case (?t) t;
              case null "could not decode response";
            };
            #err("AI call failed (status " # response.status.toText() # "): " # bodyText)
          }
        } catch (e) {
          #err("AI service error: HTTP call failed — check that the Theta API key is valid and the canister has HTTP outcall permissions.")
        };
        switch (htmlResult) {
          case (#ok(content)) {
            // Inject the actual formId into the placeholder
            let html = if (formId != "") {
              content.replace(#text "__FORM_ID__", formId)
            } else {
              content
            };
            // Persist the HTML on the form record so getPublicForm can serve it
            if (formId != "") {
              ignore SignUpFormsLib.setFormPageHtml(formsMap, caller, formId, html);
            };
            html
          };
          case (#err(msg)) {
            // Restore token on failure so user is not charged for a failed request
            sub.ltaiTokens += 1;
            "ERROR: " # msg
          };
        }
      };
    }
  };

  // ── aiGenerateColdCallScript ─────────────────────────────────────
  // Generates a personalized cold call script for the given lead.
  // Uses the caller's ColdCallScriptConfig and UserProfile to personalize the script.
  // Returns the script as plain text with EXACTLY these 4 sections:
  //   === GREETING ===
  //   === PRE-QUALIFYING ===
  //   === THE PITCH ===
  //   === A/B CHOICE CLOSE ===
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the lead is not found or the AI call fails.
  public shared ({ caller }) func aiGenerateColdCallScript(leadId : Nat) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let callerLeadsForScript = switch (leadsMap.get(caller)) {
          case (?list) list;
          case null { return "ERROR: Lead not found" };
        };
        switch (callerLeadsForScript.find(func(l : LeadTypes.Lead) : Bool { l.id == leadId })) {
          case null { "ERROR: Lead not found" };
          case (?l) {
            let maybeProfile = ProfileLib.getProfile(profiles, caller);
            let maybeConfig = ColdCallConfigLib.getConfig(coldCallConfigs, caller);

            let repName = switch (maybeProfile) {
              case (?p) { p.name };
              case null { "your rep" };
            };
            let companyName = switch (maybeProfile) {
              case (?p) { p.companyName };
              case null { "our company" };
            };

            let whatYouAreSelling = switch (maybeConfig) {
              case (?c) { c.whatYouAreSelling };
              case null { "our products/services" };
            };
            let preQualifyingNeeds = switch (maybeConfig) {
              case (?c) { c.preQualifyingNeeds };
              case null { "budget, authority, need, timeline" };
            };
            let packagesOrServices = switch (maybeConfig) {
              case (?c) { c.packagesOrServices };
              case null { "various packages and services" };
            };
            let goalType = switch (maybeConfig) {
              case (?c) { c.goalType };
              case null { "appointment" };
            };

            let closeInstructions = if (goalType == "close") {
              "=== A/B CHOICE CLOSE ===\n"
                # "Offer two specific pricing or package options from the packages listed above, "
                # "tailored to the lead's context. Ask which option fits their needs better. "
                # "Keep it natural and low-pressure."
            } else {
              "=== A/B CHOICE CLOSE ===\n"
                # "Offer two specific appointment time options (e.g. 'Would Tuesday at 2pm or Thursday at 10am work better for a quick 15-minute call?'). "
                # "Keep it simple and direct."
            };

            let systemPrompt = "You are an expert sales coach helping a sales representative write a cold call script. "
              # "Output ONLY the following 4 sections in order, each preceded by its exact header. "
              # "Do not include any preamble, introduction, notes, or text outside of these 4 sections. "
              # "Use plain text only — no markdown, no bullet symbols, no asterisks. "
              # "The exact section headers you MUST use are:\n"
              # "=== GREETING ===\n"
              # "=== PRE-QUALIFYING ===\n"
              # "=== THE PITCH ===\n"
              # "=== A/B CHOICE CLOSE ===\n\n"
              # "Section instructions:\n"
              # "=== GREETING ===\n"
              # "A warm, natural opening. Use the rep's name (" # AiLib.jsonEscape(repName) # ") and company (" # AiLib.jsonEscape(companyName) # "). "
              # "Reference the lead's name if known. Keep it brief and friendly.\n\n"
              # "=== PRE-QUALIFYING ===\n"
              # "List 3-5 qualifying questions based on these needs: " # AiLib.jsonEscape(preQualifyingNeeds) # ". "
              # "Write them as natural conversational questions, not a checklist.\n\n"
              # "=== THE PITCH ===\n"
              # "A concise, consultative pitch for: " # AiLib.jsonEscape(whatYouAreSelling) # ". "
              # "Packages/services available: " # AiLib.jsonEscape(packagesOrServices) # ". "
              # "Tailor the pitch to the lead's industry and context. Focus on value, not features.\n\n"
              # closeInstructions;

            let leadContext = "Lead name: " # l.name # "\n"
              # "Industry: " # l.industry # "\n"
              # "Location: " # l.city # ", " # l.state # "\n"
              # "Notes: " # l.notes;

            let userMessage = "Generate the cold call script for this lead:\n" # leadContext;

            switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
              case (#ok(content)) {
                sub.taiTokens -= 1;
                content
              };
              case (#err(msg)) { "ERROR: " # msg };
            }
          };
        }
      };
    }
  };

  // ── aiGenerateColdCallScriptGeneric ─────────────────────────────
  // Generates a cold call script without requiring a specific lead.
  // The caller provides freeform context (industry, prospect type, etc.).
  // Returns the same 4-section format as aiGenerateColdCallScript.
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: ..." string if the AI call fails.
  public shared ({ caller }) func aiGenerateColdCallScriptGeneric(
    prospectContext : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let maybeProfile = ProfileLib.getProfile(profiles, caller);
        let maybeConfig = ColdCallConfigLib.getConfig(coldCallConfigs, caller);

        let repName = switch (maybeProfile) {
          case (?p) { p.name };
          case null { "your rep" };
        };
        let companyName = switch (maybeProfile) {
          case (?p) { p.companyName };
          case null { "our company" };
        };
        let whatYouAreSelling = switch (maybeConfig) {
          case (?c) { c.whatYouAreSelling };
          case null { "our products/services" };
        };
        let preQualifyingNeeds = switch (maybeConfig) {
          case (?c) { c.preQualifyingNeeds };
          case null { "budget, authority, need, timeline" };
        };
        let packagesOrServices = switch (maybeConfig) {
          case (?c) { c.packagesOrServices };
          case null { "various packages and services" };
        };
        let goalType = switch (maybeConfig) {
          case (?c) { c.goalType };
          case null { "appointment" };
        };

        let closeInstructions = if (goalType == "close") {
          "=== A/B CHOICE CLOSE ===\n"
            # "Offer two specific pricing or package options from the packages listed above. "
            # "Keep it natural and low-pressure."
        } else {
          "=== A/B CHOICE CLOSE ===\n"
            # "Offer two specific appointment time options. Keep it simple and direct."
        };

        let systemPrompt = "You are an expert sales coach helping a sales representative write a cold call script. "
          # "Output ONLY the following 4 sections in order, each preceded by its exact header. "
          # "Do not include any preamble, introduction, notes, or text outside of these 4 sections. "
          # "Use plain text only — no markdown, no bullet symbols, no asterisks. "
          # "The exact section headers you MUST use are:\n"
          # "=== GREETING ===\n"
          # "=== PRE-QUALIFYING ===\n"
          # "=== THE PITCH ===\n"
          # "=== A/B CHOICE CLOSE ===\n\n"
          # "Section instructions:\n"
          # "=== GREETING ===\n"
          # "A warm, natural opening. Use the rep's name (" # AiLib.jsonEscape(repName) # ") and company (" # AiLib.jsonEscape(companyName) # "). Keep it brief and friendly.\n\n"
          # "=== PRE-QUALIFYING ===\n"
          # "List 3-5 qualifying questions based on these needs: " # AiLib.jsonEscape(preQualifyingNeeds) # ". Write them as natural conversational questions.\n\n"
          # "=== THE PITCH ===\n"
          # "A concise, consultative pitch for: " # AiLib.jsonEscape(whatYouAreSelling) # ". "
          # "Packages/services available: " # AiLib.jsonEscape(packagesOrServices) # ". Focus on value, not features.\n\n"
          # closeInstructions;

        let userMessage = "Generate the cold call script.\n"
          # (if (prospectContext != "") "Prospect context: " # prospectContext else "No specific lead — write a general script.");

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateLandingPageHtml ────────────────────────────────────
  // Alias for aiCustomizeLandingTemplate — generates a full marketing landing page
  // for a business. Costs 1 LtAI token.
  // Returns the full HTML string or "ERROR: ..." / "INSUFFICIENT_LTAI_TOKENS: ..." on failure.
  public shared ({ caller }) func aiGenerateLandingPageHtml(
    industry : Text,
    businessName : Text,
    businessDescription : Text,
    targetAudience : Text,
    formId : Text,
  ) : async Text {
    // Check LtAI token balance
    let maybeSub = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_LTAI_TOKENS: You have 0 LtAI tokens remaining. Purchase more for $0.25 each.";
      };
      case (?sub) {
        if (sub.ltaiTokens == 0) {
          return "INSUFFICIENT_LTAI_TOKENS: You have 0 LtAI tokens remaining. Purchase more for $0.25 each.";
        };

        let thetaKeyLp = if (apiKeyRef.key != "") apiKeyRef.key else AiLib.THETA_API_KEY_DEFAULT;
        if (thetaKeyLp == "") {
          return "INSUFFICIENT_LTAI_TOKENS: AI service not configured — please set the Theta API key in the admin panel.";
        };

        let biz = if (businessName == "") industry # " Business" else businessName;

        let systemPrompt = "You are an expert web developer and copywriter specializing in lead generation landing pages. "
          # "Generate a COMPLETE, self-contained HTML landing page for the given business. "
          # "STRICT RULES — follow every one: "
          # "1. Output ONLY raw HTML starting with <!DOCTYPE html> — no markdown, no code fences, no explanation before or after. "
          # "2. Use only inline CSS styles — no external stylesheets, no <link> tags, no <style> blocks. "
          # "3. The page must be mobile-responsive using inline style max-width and percentage widths. "
          # "4. Include these 4 sections in order: "
          # "   a) HERO: large headline, subheadline, and a prominent CTA button that scrolls to the form. "
          # "   b) BENEFITS: 3 concise benefit cards with bold titles and 1-sentence descriptions. "
          # "   c) TESTIMONIAL: one short quote from a satisfied customer with a name and title. "
          # "   d) LEAD FORM: fields for Full Name, Phone Number, Email Address, and a submit CTA button. "
          # "5. The <form> must have: id=\"lead-form\", action=\"\", method=\"post\", and a hidden <input name=\"formId\"> whose value is the formId placeholder __FORM_ID__. "
          # "6. Color scheme: deep navy (#1a2744) header/footer, white body, orange (#f97316) CTA buttons. "
          # "7. Font: system-ui, -apple-system, sans-serif. "
          # "8. Keep the total HTML under 8000 characters.";

        let userMessage = "Generate a landing page for:\n"
          # "Business name: " # AiLib.jsonEscape(biz) # "\n"
          # "Industry: " # AiLib.jsonEscape(industry) # "\n"
          # "Description: " # AiLib.jsonEscape(businessDescription) # "\n"
          # "Target audience: " # AiLib.jsonEscape(targetAudience);

        // Pre-deduct LtAI token before the HTTP call
        sub.ltaiTokens -= 1;
        let htmlResult = try {
          let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
            url = AiLib.THETA_LLM_URL;
            max_response_bytes = ?32768;
            method = #post;
            headers = [
              { name = "Content-Type"; value = "application/json" },
              { name = "Authorization"; value = "Bearer " # thetaKeyLp },
            ];
            body = ?AiLib.buildThetaRequestBodyWithTokens(systemPrompt, userMessage, 2048);
            transform = null;
            is_replicated = ?false;
          });
          if (response.status == 200) {
            #ok(AiLib.extractThetaContent(response.body))
          } else {
            let bodyText = switch (response.body.decodeUtf8()) {
              case (?t) t;
              case null "could not decode response";
            };
            #err("AI call failed (status " # response.status.toText() # "): " # bodyText)
          }
        } catch (e) {
          #err("AI service error: HTTP call failed — check that the Anthropic API key is valid.")
        };
        switch (htmlResult) {
          case (#ok(content)) {
            let html = if (formId != "") {
              content.replace(#text "__FORM_ID__", formId)
            } else {
              content
            };
            if (formId != "") {
              ignore SignUpFormsLib.setFormPageHtml(formsMap, caller, formId, html);
            };
            html
          };
          case (#err(msg)) {
            sub.ltaiTokens += 1;
            "ERROR: " # msg
          };
        }
      };
    }
  };

  // ── aiGenerateBrandedForm ────────────────────────────────────────
  // Accepts a website URL, fetches its HTML, sends to Anthropic Claude to extract
  // branding (colors, font, logo, style), then generates a branded sign-up form
  // with matching aesthetics. Returns the self-contained HTML form as Text.
  // Costs 1 LtAI token per successful generation.
  // Returns #err if the URL fetch fails or if the caller has no LtAI tokens.
  public shared ({ caller }) func aiGenerateBrandedForm(
    websiteUrl : Text,
    formId : Text,
  ) : async { #ok : Text; #err : Text } {
    // Check LtAI token balance
    let maybeSub = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    switch (maybeSub) {
      case null {
        return #err("INSUFFICIENT_LTAI_TOKENS: You have 0 LtAI tokens remaining. Purchase more for $0.25 each.");
      };
      case (?sub) {
        if (sub.ltaiTokens == 0) {
          return #err("INSUFFICIENT_LTAI_TOKENS: You have 0 LtAI tokens remaining. Purchase more to generate AI-branded forms.");
        };

        let thetaKeyBf = if (apiKeyRef.key != "") apiKeyRef.key else AiLib.THETA_API_KEY_DEFAULT;

        // Step 1: Fetch the website HTML via HTTP outcall (GET)
        let fetchedHtml : Text = try {
          let fetchResponse = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
            url = websiteUrl;
            max_response_bytes = ?65536; // 64 KB — enough for branding extraction
            method = #get;
            headers = [
              { name = "User-Agent"; value = "Mozilla/5.0 (compatible; Tele-Blast/1.0)" },
              { name = "Accept"; value = "text/html,application/xhtml+xml" },
            ];
            body = null;
            transform = null;
            is_replicated = ?false;
          });
          if (fetchResponse.status == 200) {
            switch (fetchResponse.body.decodeUtf8()) {
              case (?html) html;
              case null {
                return #err("Could not decode the webpage content. Please check the URL and try again.");
              };
            }
          } else {
            return #err("Could not fetch the website (HTTP " # fetchResponse.status.toText() # "). Please check the URL is publicly accessible.");
          }
        } catch (e) {
          return #err("Failed to fetch the website. Make sure the URL is correct, publicly accessible, and starts with https://");
        };

        // Truncate HTML to avoid exceeding Anthropic request limits (keep first 12000 chars)
        let htmlSnippet : Text = if (fetchedHtml.size() > 12000) {
          var truncated = "";
          var count = 0;
          label truncLoop for (c in fetchedHtml.toIter()) {
            if (count >= 12000) break truncLoop;
            truncated #= Text.fromChar(c);
            count += 1;
          };
          truncated
        } else {
          fetchedHtml
        };

        // Step 2: Extract branding and generate the form via Anthropic Claude
        let systemPrompt = "You are an expert web designer specializing in brand analysis and lead generation forms. "
          # "You will receive HTML from a website. Analyze it to extract branding information, then generate a complete, polished branded sign-up form. "
          # "STRICT OUTPUT RULES — follow every rule exactly: "
          # "1. Output ONLY raw HTML starting with <!DOCTYPE html> — no markdown, no code fences, no explanation before or after. "
          # "2. Use ONLY inline CSS styles — no <style> blocks, no external stylesheets, no <link> tags. "
          # "3. The page must be FULLY mobile-responsive using max-width, percentage widths, and viewport meta tag. Include: <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">. "
          # "4. Extract from the HTML: "
          # "   - dominant primary color (from buttons, links, headers) "
          # "   - secondary/accent color "
          # "   - background color "
          # "   - text color "
          # "   - font family (check inline styles, <style> tags, Google Fonts links) "
          # "   - logo URL (look for <img> with 'logo' in src/alt/class/id — use absolute URL if found, else skip logo). "
          # "5. Build a FULL marketing landing page (not just a form card) with these 3 sections: "
          # "   a) HEADER: logo (if found) + business name, styled with extracted primary color as background. "
          # "   b) HERO: welcoming headline ('Ready to Get Started?'), 1-sentence description, and 2-3 benefit bullet points matching the business type. "
          # "   c) FORM SECTION: white/light background card, fields for Full Name (text), Phone Number (tel), Email Address (email), and a CTA submit button. "
          # "6. Style the submit button using the extracted primary color; if no primary color found, use #1e3a5f (navy) with #f97316 (orange) for the button. "
          # "7. The <form> element must have EXACTLY: id=\"lead-form\", action=\"\", method=\"post\", onsubmit=\"return false;\", and a hidden <input name=\"formId\" value=\"__FORM_ID__\">. "
          # "8. Below the form, add a small footer with the text 'Your information is kept private and secure.' "
          # "9. Keep the total HTML under 5000 characters. "
          # "10. The design must look professional and trustworthy — like a real business landing page, not a generic template.";

        let userMessage = "Here is the website HTML to analyze for branding:\n\n" # AiLib.jsonEscape(htmlSnippet) # "\n\nGenerate a branded sign-up form matching this website's visual identity.";

        // Pre-deduct LtAI token before the HTTP call
        sub.ltaiTokens -= 1;
        let formResult = try {
          let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
            url = AiLib.THETA_LLM_URL;
            max_response_bytes = ?16384;
            method = #post;
            headers = [
              { name = "Content-Type"; value = "application/json" },
              { name = "Authorization"; value = "Bearer " # thetaKeyBf },
            ];
            body = ?AiLib.buildThetaRequestBodyWithTokens(systemPrompt, userMessage, 1500);
            transform = null;
            is_replicated = ?false;
          });
          if (response.status == 200) {
            #ok(AiLib.extractThetaContent(response.body))
          } else {
            let bodyText = switch (response.body.decodeUtf8()) {
              case (?t) t;
              case null "could not decode response";
            };
            #err("AI call failed (status " # response.status.toText() # "): " # bodyText)
          }
        } catch (e) {
          #err("AI service error: HTTP call failed — check that the Theta API key is valid and the canister has HTTP outcall permissions.")
        };

        switch (formResult) {
          case (#ok(content)) {
            // Inject the actual formId into the placeholder
            let html = if (formId != "") {
              content.replace(#text "__FORM_ID__", formId)
            } else {
              content
            };
            // Persist the HTML on the form record so getPublicForm can serve it
            if (formId != "") {
              ignore SignUpFormsLib.setFormPageHtml(formsMap, caller, formId, html);
            };
            #ok(html)
          };
          case (#err(msg)) {
            // Restore token on failure so the user is not charged
            sub.ltaiTokens += 1;
            #err(msg)
          };
        }
      };
    }
  };

  // ── aiResearchLead ───────────────────────────────────────────────
  // Costs 1 tAI token per call ($0.05 to user).
  // On success: stores the research result in the lead's aiResearch field.
  // Returns #ok(researchResult) or #err(message).
  public shared ({ caller }) func aiResearchLead(leadId : Nat) : async { #ok : Text; #err : Text } {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return #err("INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.");
      };
      case (?sub) {
        let callerLeadsList = switch (leadsMap.get(caller)) {
          case (?list) list;
          case null { return #err("Lead not found") };
        };
        let idx = callerLeadsList.findIndex(func(l : LeadTypes.Lead) : Bool { l.id == leadId });
        switch (idx) {
          case null { #err("Lead not found") };
          case (?i) {
            let lead = callerLeadsList.at(i);

            let businessContext = if (lead.name != "") lead.name
              else switch (lead.firstName) {
                case (?fn) fn # (switch (lead.lastName) { case (?ln) " " # ln; case null "" });
                case null "Unknown";
              };

            let locationContext = if (lead.city != "" and lead.state != "") {
              lead.city # ", " # lead.state
            } else if (lead.state != "") {
              lead.state
            } else {
              "unknown location"
            };

            let systemPrompt = "You are a business research assistant helping sales agents learn about their prospects before calling. "
              # "Search your knowledge to provide information about the given business or contact. "
              # "Return ONLY valid JSON in this exact format (no markdown, no explanation, no preamble): "
              # "{"
              # "\"overview\":\"...\","
              # "\"socialProfiles\":[{\"platform\":\"...\",\"url\":\"...\"}],"
              # "\"verifiedPhone\":null,"
              # "\"verifiedEmail\":null,"
              # "\"additionalNotes\":\"...\""
              # "} "
              # "overview: 2-3 sentences describing what the business does, size, and any notable public information. "
              # "socialProfiles: array of found social media profiles (LinkedIn, Facebook, Instagram, X/Twitter, YouTube) — include only ones you are reasonably confident about. "
              # "verifiedPhone: a publicly listed phone number if found, otherwise null. "
              # "verifiedEmail: a publicly listed email if found, otherwise null. "
              # "additionalNotes: any other relevant public information (website, specialties, recent news) in 1-2 sentences.";

            let userMessage = "Research this prospect:\n"
              # "Business/Contact name: " # AiLib.jsonEscape(businessContext) # "\n"
              # "Industry: " # AiLib.jsonEscape(lead.industry) # "\n"
              # "Location: " # AiLib.jsonEscape(locationContext) # "\n"
              # (if (lead.phone != "") "Known phone: " # AiLib.jsonEscape(lead.phone) # "\n" else "")
              # (if (lead.email != "") "Known email: " # AiLib.jsonEscape(lead.email) # "\n" else "");

            switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
              case (#err(msg)) { #err(msg) };
              case (#ok(content)) {
                sub.taiTokens -= 1;
                // Store research result on the lead
                let updatedLead : LeadTypes.Lead = { lead with aiResearch = ?content };
                callerLeadsList.put(i, updatedLead);
                #ok(content)
              };
            }
          };
        }
      };
    }
  };

  // ── batchAiResearchLeads ─────────────────────────────────────────
  // Runs AI research sequentially for multiple leads.
  // Each lead costs 1 tAI token (so N leads = N tokens).
  // Returns an array of per-lead results.
  public shared ({ caller }) func batchAiResearchLeads(
    leadIds : [Nat]
  ) : async [{ leadId : Nat; result : { #ok : Text; #err : Text } }] {
    let results = List.empty<{ leadId : Nat; result : { #ok : Text; #err : Text } }>();
    for (lid in leadIds.values()) {
      let res = await aiResearchLead(lid);
      results.add({ leadId = lid; result = res });
    };
    results.toArray()
  };

  // ── aiGenerateGbpProfile ─────────────────────────────────────────
  // Generates Google Business Profile content (description, tagline, categories, attributes, posts).
  // Uses prompt builders from lib/local-seo.mo.
  // Returns JSON or "ERROR: ..." / "INSUFFICIENT_TOKENS: ..." on failure.
  public shared ({ caller }) func aiGenerateGbpProfile(
    businessName : Text,
    category : Text,
    description : Text,
    location : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = LocalSeoLib.buildGbpSystemPrompt();
        // Map frontend params: category → services, description → uniqueValue, "" for hours
        let userMessage = LocalSeoLib.buildGbpUserMessage(businessName, category, location, "", description);
        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES_LARGE)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateOnPageSeo ──────────────────────────────────────────
  // Generates on-page SEO copy (title, meta description, H1, H2s, intro, CTA, keywords).
  // Uses prompt builders from lib/local-seo.mo.
  // Returns JSON or "ERROR: ..." / "INSUFFICIENT_TOKENS: ..." on failure.
  public shared ({ caller }) func aiGenerateOnPageSeo(
    url : Text,
    keywords : Text,
    businessType : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = LocalSeoLib.buildOnPageSeoSystemPrompt();
        // Map frontend params: businessType → businessName, keywords → services, url → formSlug, "" for location/targetAudience
        let userMessage = LocalSeoLib.buildOnPageSeoUserMessage(businessType, keywords, "", "", url);
        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── aiGenerateBacklinkSuggestions ────────────────────────────────
  // Generates a list of backlink building opportunities for a local business.
  // Returns JSON array of suggestions or "ERROR: ..." / "INSUFFICIENT_TOKENS: ..." on failure.
  public shared ({ caller }) func aiGenerateBacklinkSuggestions(
    businessName : Text,
    industry : Text,
    location : Text,
  ) : async Text {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = "You are an expert local SEO specialist helping small businesses build high-quality backlinks. "
          # "Generate a list of specific, actionable backlink opportunities for the given business. "
          # "Return ONLY valid JSON in this exact format (no markdown, no explanation, no preamble): "
          # "{"
          # "\"suggestions\":["
          # "{"
          # "\"type\":\"...\","
          # "\"source\":\"...\","
          # "\"url\":\"...\","
          # "\"priority\":\"high|medium|low\","
          # "\"action\":\"...\""
          # "}"
          # "],"
          # "\"strategy\":\"...\""
          # "} "
          # "suggestions must contain 8-12 entries with specific, real directories, platforms, or sites relevant to the business type and location. "
          # "type: category of backlink (e.g. 'Local Directory', 'Industry Association', 'News Site', 'Review Platform'). "
          # "source: name of the website or platform. "
          # "url: the exact URL where the business can submit or create a listing. "
          # "priority: high for the most impactful opportunities, medium for good ones, low for supplementary. "
          # "action: a 1-sentence description of exactly what to do to get the backlink. "
          # "strategy: a 2-3 sentence overall backlink strategy tailored to this business type and location.";

        let userMessage = "Generate backlink suggestions for:\n"
          # "Business name: " # AiLib.jsonEscape(businessName) # "\n"
          # "Industry: " # AiLib.jsonEscape(industry) # "\n"
          # "Location: " # AiLib.jsonEscape(location);

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };

  // ── checkAiAccess ─────────────────────────────────────────────────
  // Returns true if the caller's subscription tier includes AI feature access.
  // The $30 Pro plan returns false — all higher tiers return true.
  // Frontend uses this to conditionally show or hide AI feature sections.
  // NOTE: Update call (not query) so it always reads fresh stable-storage data after admin tier changes.
  public shared ({ caller }) func checkAiAccess() : async Bool {
    let maybeSub = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    switch (maybeSub) {
      case null { false };
      case (?sub) { AiLib.isAiTier(sub.tier) };
    };
  };

  // ── rewriteTemplateMessage ───────────────────────────────────────
  // Rewrites/spins a given SMS template text into a fresh natural-sounding variation.
  // Preserves personalization tokens such as {{first_name}}, {{business_name}}, etc.
  // Costs 1 tAI token. Returns #ok(rewrittenText) or #err(message).
  // Uses claude-3-haiku-20240307 with a 300-character target for SMS.
  public shared ({ caller }) func rewriteTemplateMessage(templateText : Text) : async { #ok : Text; #err : Text } {
    let maybeSub = findSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return #err("INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.");
      };
      case (?sub) {
        let systemPrompt = "You are an expert SMS copywriter for sales professionals. "
          # "Your job is to rewrite the given SMS message as a fresh, natural-sounding variation "
          # "that conveys the same meaning but uses different phrasing and word choices. "
          # "STRICT RULES: "
          # "1. Keep the rewritten message under 300 characters. "
          # "2. Preserve ALL personalization tokens exactly as-is — for example {{first_name}}, {{business_name}}, {{city}}, etc. must appear in the output unchanged. "
          # "3. Return ONLY the rewritten SMS text — no explanation, no quotes, no preamble. "
          # "4. Sound human and conversational — not robotic or salesy.";

        let userMessage = "Rewrite this SMS message:\n" # templateText;

        switch (await callThetaLlm(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            #ok(content)
          };
          case (#err(msg)) { #err(msg) };
        }
      };
    }
  };
};
