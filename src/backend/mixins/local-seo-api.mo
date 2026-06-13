import AiLib "../lib/ai";
import Common "../types/common";
import LocalSeoLib "../lib/local-seo";
import List "mo:core/List";
import Principal "mo:core/Principal";

mixin (
  subscriptions : List.List<Common.UserSubscription>,
  apiKeyRef : { var key : Text },
) {


  // Token helper — returns ?sub if caller has tAI tokens available.
  func findSeoSubWithTai(caller : Principal) : ?Common.UserSubscription {
    subscriptions.find(func(s) {
      Principal.equal(s.principal, caller) and s.taiTokens > 0
    })
  };

  // ── Helper: resolve the effective Theta API key ──────────────────
  func resolveThetaSeoKey() : Text {
    apiKeyRef.key
  };

  // Shared Theta LLM call helper for SEO functions.
  // URL: https://ondemand.thetaedgecloud.com/infer_request/chat/completions
  // stream is always false — IC HTTP outcalls do not support streaming.
  // Retries up to 3 times on transient failures.
  // maxResponseBytes allows callers to request a larger buffer for lengthy outputs.
  func callThetaLlmSeo(systemPrompt : Text, userMessage : Text, maxResponseBytes : Nat64) : async { #ok : Text; #err : Text } {
    let key = if (apiKeyRef.key != "") apiKeyRef.key else AiLib.THETA_API_KEY_DEFAULT;
    if (key == "") {
      return #err("AI service not configured — please set the Theta API key in the admin panel.");
    };
    let requestBody = AiLib.buildThetaRequestBodyWithTokens(systemPrompt, userMessage, 2048);
    var attempt = 0;
    var lastErr = "AI service error: request did not execute";
    label retryLoopSeo while (attempt < 3) {
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

  // ── aiGenerateGbpProfile ─────────────────────────────────────────
  // Generates a complete Google Business Profile write-up using AI.
  // Costs 1 tAI token.
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: <message>" on failure.
  public shared ({ caller }) func aiGenerateGbpProfile(
    businessName : Text,
    services : Text,
    location : Text,
    hours : Text,
    uniqueValue : Text,
  ) : async Text {
    let maybeSub = findSeoSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = LocalSeoLib.buildGbpSystemPrompt();
        let userMessage = LocalSeoLib.buildGbpUserMessage(businessName, services, location, hours, uniqueValue);

        switch (await callThetaLlmSeo(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES_LARGE)) {
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
  // Generates on-page SEO copy for a landing page created in the Forms section.
  // Costs 1 tAI token.
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: <message>" on failure.
  public shared ({ caller }) func aiGenerateOnPageSeo(
    businessName : Text,
    services : Text,
    location : Text,
    targetAudience : Text,
    formSlug : Text,
  ) : async Text {
    let maybeSub = findSeoSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = LocalSeoLib.buildOnPageSeoSystemPrompt();
        let userMessage = LocalSeoLib.buildOnPageSeoUserMessage(businessName, services, location, targetAudience, formSlug);

        switch (await callThetaLlmSeo(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
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
  // Generates AI-powered backlink suggestions for the user's business.
  // Costs 1 tAI token.
  // Returns "INSUFFICIENT_TOKENS: ..." if no tAI tokens remain.
  // Returns "ERROR: <message>" on failure.
  public shared ({ caller }) func aiGenerateBacklinkSuggestions(
    businessName : Text,
    industry : Text,
    location : Text,
    website : Text,
  ) : async Text {
    let maybeSub = findSeoSubWithTai(caller);
    switch (maybeSub) {
      case null {
        return "INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.";
      };
      case (?sub) {
        let systemPrompt = "You are an expert SEO strategist specializing in local business link building. "
          # "Generate a list of specific, actionable backlink opportunities for a local business. "
          # "Return ONLY valid JSON in this exact format (no markdown, no explanation): "
          # "{\"opportunities\":[{\"category\":\"...\",\"source\":\"...\",\"description\":\"...\",\"difficulty\":\"Easy|Medium|Hard\",\"url\":\"...\"}]} "
          # "Include 8-12 opportunities across categories like: local directories, industry associations, "
          # "local news/blogs, chamber of commerce, social profiles, review sites, and educational resources. "
          # "Make each source specific and actionable — name actual websites, not generic categories.";

        let userMessage = "Generate backlink opportunities for:\n"
          # "Business: " # AiLib.jsonEscape(businessName) # "\n"
          # "Industry: " # AiLib.jsonEscape(industry) # "\n"
          # "Location: " # AiLib.jsonEscape(location) # "\n"
          # "Website: " # AiLib.jsonEscape(website);

        switch (await callThetaLlmSeo(systemPrompt, userMessage, AiLib.MAX_RESPONSE_BYTES)) {
          case (#ok(content)) {
            sub.taiTokens -= 1;
            content
          };
          case (#err(msg)) { "ERROR: " # msg };
        }
      };
    }
  };
};
