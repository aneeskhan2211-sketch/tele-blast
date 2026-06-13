import Common "../types/common";
import AiLib "../lib/ai";
import ThetaAiLib "../lib/theta-ai";
import List "mo:core/List";
import Principal "mo:core/Principal";

mixin (
  subscriptions : List.List<Common.UserSubscription>,
  thetaApiKeyRef : { var key : Text },
) {

  // ── Token helper (shared pattern from ai-api.mo) ─────────────────
  func findSubWithTaiTheta(caller : Principal) : ?Common.UserSubscription {
    subscriptions.find(func(s) {
      Principal.equal(s.principal, caller) and s.taiTokens > 0
    })
  };

  // Hardwired fallback — used when the mutable ref is empty (e.g. first boot or key not yet saved).
  let THETA_KEY_FALLBACK : Text = "u2x588uq1cjjhwc6201zpim5r7cckw1v1s9668i2yjbkzhr2xqurjbwucst7juat";

  // ── Helper: resolve the effective Theta key ──────────────────────
  func resolveThetaKey() : Text {
    let saved = thetaApiKeyRef.key;
    if (saved != "") saved else THETA_KEY_FALLBACK
  };

  // ── getThetaApiStatus ────────────────────────────────────────────
  // Canonical status method. Returns {configured: Bool; hasKey: Bool}.
  // configured = true when a non-empty key is available (saved or hardwired default).
  // hasKey mirrors configured for backwards-compatible frontend checks.
  public query func getThetaApiStatus() : async { configured : Bool; hasKey : Bool } {
    let hasKey = resolveThetaKey() != "";
    { configured = hasKey; hasKey }
  };

  // ── aiGenerateImage ──────────────────────────────────────────────
  // Calls Theta EdgeCloud FLUX on-demand endpoint to generate a professional
  // business image from a text prompt.
  // URL: https://ondemand.thetaedgecloud.com/infer_request/flux
  // style: optional style hint (e.g. "clean professional corporate photography")
  // Deducts 1 tAI token on success.
  // Retries up to 3 times on transient failures.
  // Returns #ok(imageUrl) or #err(userFacingMessage).
  public shared ({ caller }) func aiGenerateImage(
    prompt : Text,
    style : Text,
  ) : async { #ok : Text; #err : Text } {
    let key = resolveThetaKey();
    if (key == "") {
      return #err("Image generation is not configured — please set the Theta EdgeCloud API key in the admin panel.");
    };

    let maybeSub = findSubWithTaiTheta(caller);
    switch (maybeSub) {
      case null {
        return #err("INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.");
      };
      case (?sub) {
        let fullPrompt = "Professional business marketing image: " # prompt
          # ". High quality, clean, suitable for advertising.";
        let negativePrompt = "blurry, low quality, amateur, watermark, text overlay, cartoon, illustration, distorted faces";
        let styleHint = if (style == "") "professional corporate photography, clean background" else style;
        let requestBody = ThetaAiLib.buildImageRequestBody(fullPrompt, styleHint, negativePrompt);

        var attempt = 0;
        var lastErr = "Image generation error: request did not execute";
        label retryImg while (attempt < 3) {
          attempt += 1;
          try {
            let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
              url = ThetaAiLib.THETA_API_URL;
              max_response_bytes = ?ThetaAiLib.MAX_RESPONSE_BYTES;
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
              let urlOrError = ThetaAiLib.extractOutputUrl(response.body);
              if (urlOrError.contains(#text "ERROR:")) {
                let bodyText = switch (response.body.decodeUtf8()) {
                  case (?t) t;
                  case null "could not decode response";
                };
                lastErr := "Image generation error: " # bodyText;
              } else {
                sub.taiTokens -= 1;
                return #ok(urlOrError);
              }
            } else {
              let bodyText = switch (response.body.decodeUtf8()) {
                case (?t) t;
                case null "could not decode response";
              };
              lastErr := "Image generation error (status " # response.status.toText() # "): " # bodyText;
              if (response.status == 401 or response.status == 403) {
                return #err(lastErr);
              };
            }
          } catch (e) {
            lastErr := "Image generation error: HTTP call failed (attempt " # attempt.toText() # ") — check that the Theta API key is valid.";
          };
        };
        #err(lastErr)
      };
    }
  };

  // ── aiGeneratePromoImage ─────────────────────────────────────────
  // Generates a styled background/promo image via Theta EdgeCloud FLUX on-demand.
  // URL: https://ondemand.thetaedgecloud.com/infer_request/flux
  // promoText : the main promotional message or theme
  // ctaText   : call-to-action text (informs the style of the image)
  // style     : optional visual style hint (e.g. "bold vibrant", "minimalist corporate")
  // Deducts 1 tAI token on success. Retries up to 3 times on transient failures.
  // Returns #ok(imageUrl) or #err(userFacingMessage).
  public shared ({ caller }) func aiGeneratePromoImage(
    promoText : Text,
    ctaText : Text,
    style : Text,
  ) : async { #ok : Text; #err : Text } {
    let key = resolveThetaKey();
    if (key == "") {
      return #err("Image generation is not configured — please set the Theta EdgeCloud API key in the admin panel.");
    };

    let maybeSub = findSubWithTaiTheta(caller);
    switch (maybeSub) {
      case null {
        return #err("INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.");
      };
      case (?sub) {
        let styleHint = if (style == "") "clean professional marketing layout, high contrast" else style;
        let fullPrompt = "Professional promo image: "
          # promoText
          # ". Call to action: "
          # ctaText
          # ". Style: "
          # styleHint
          # ". Clean layout with text overlay space, logo space top-left, high contrast readable text, suitable for social media advertising.";
        let negativePrompt = "blurry, low quality, amateur, watermark, cluttered, dark, cartoon, illustration, distorted faces";
        let requestBody = ThetaAiLib.buildImageRequestBody(fullPrompt, styleHint, negativePrompt);

        var attempt = 0;
        var lastErr = "Promo image generation error: request did not execute";
        label retryPromo while (attempt < 3) {
          attempt += 1;
          try {
            let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
              url = ThetaAiLib.THETA_API_URL;
              max_response_bytes = ?ThetaAiLib.MAX_RESPONSE_BYTES;
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
              let urlOrError = ThetaAiLib.extractOutputUrl(response.body);
              if (urlOrError.contains(#text "ERROR:")) {
                let bodyText = switch (response.body.decodeUtf8()) {
                  case (?t) t;
                  case null "could not decode response";
                };
                lastErr := "Promo image generation error: " # bodyText;
              } else {
                sub.taiTokens -= 1;
                return #ok(urlOrError);
              }
            } else {
              let bodyText = switch (response.body.decodeUtf8()) {
                case (?t) t;
                case null "could not decode response";
              };
              lastErr := "Promo image generation error (status " # response.status.toText() # "): " # bodyText;
              if (response.status == 401 or response.status == 403) {
                return #err(lastErr);
              };
            }
          } catch (e) {
            lastErr := "Promo image generation error: HTTP call failed (attempt " # attempt.toText() # ") — check that the Theta API key is valid.";
          };
        };
        #err(lastErr)
      };
    }
  };
  // ── aiGenerateVideo ──────────────────────────────────────────────
  // Calls the Theta EdgeCloud On-Demand step_video endpoint to generate a promo video.
  // URL: https://ondemand.thetaedgecloud.com/infer_request/step_video
  // Authentication: Bearer token (same thetaApiKeyRef as image/LLM calls).
  // The old Theta Video API (api.thetavideoapi.com) with service-account auth has been
  // replaced by this unified on-demand endpoint.
  // Deducts 1 tAI token on a successful API call (2xx response).
  // Retries up to 3 times on transient failures.
  // Returns #ok(videoUrlOrId) or #err(userFacingMessage).
  public shared ({ caller }) func aiGenerateVideo(
    promoText : Text,
    imageUrls : [Text],
    logoUrl : ?Text,
  ) : async { #ok : Text; #err : Text } {
    ignore imageUrls;
    ignore logoUrl;

    let key = resolveThetaKey();
    if (key == "") {
      return #err("Video generation error: Theta API key is not configured — please save it in Admin > AI Settings.");
    };

    let maybeSub = findSubWithTaiTheta(caller);
    switch (maybeSub) {
      case null {
        return #err("INSUFFICIENT_TOKENS: You have 0 tAI tokens remaining. Please purchase more to continue using AI features.");
      };
      case (?sub) {
        let requestBody = ThetaAiLib.buildVideoRequestBody(promoText, [], null);

        var attempt = 0;
        var lastErr = "Video generation error: request did not execute";
        label retryVideo while (attempt < 3) {
          attempt += 1;
          try {
            let response = await (actor "aaaaa-aa" : AiLib.HttpOutcallActor).http_request({
              url = ThetaAiLib.THETA_VIDEO_API_URL;
              max_response_bytes = ?ThetaAiLib.THETA_VIDEO_MAX_RESPONSE_BYTES;
              method = #post;
              headers = [
                { name = "Content-Type"; value = "application/json" },
                { name = "Authorization"; value = "Bearer " # key },
              ];
              body = ?requestBody;
              transform = null;
              is_replicated = ?false;
            });

            let bodyText = switch (response.body.decodeUtf8()) {
              case (?t) t;
              case null "could not decode response";
            };

            if (response.status == 200 or response.status == 201) {
              // On-demand step_video returns {"id":"...","output":...}
              // Extract output URL or fall back to raw body
              let outputUrl = ThetaAiLib.extractOutputUrl(response.body);
              sub.taiTokens -= 1;
              if (outputUrl.contains(#text "ERROR:")) {
                return #ok(bodyText); // return raw body as fallback
              } else {
                return #ok(outputUrl);
              }
            } else if (response.status == 401 or response.status == 403) {
              return #err("Video generation error (status " # response.status.toText() # "): Authentication failed — check that your Theta API key is correct in Admin > AI Settings.");
            } else {
              lastErr := "Video generation error (status " # response.status.toText() # "): " # bodyText;
            }
          } catch (e) {
            lastErr := "Video generation error: HTTP call failed (attempt " # attempt.toText() # ") — check that the Theta API key is valid and the canister has HTTP outcall permissions.";
          };
        };
        #err(lastErr)
      };
    }
  };

};
