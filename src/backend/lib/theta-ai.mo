import AiLib "ai";

module {

  // ── Theta EdgeCloud On-Demand API endpoints (all via single unified API) ──
  // Image generation (FLUX.1-schnell via on-demand inference)
  public let THETA_API_URL = "https://ondemand.thetaedgecloud.com/infer_request/flux";
  // Video generation (step_video via on-demand inference)
  public let THETA_VIDEO_API_URL = "https://ondemand.thetaedgecloud.com/infer_request/step_video";

  public let MAX_RESPONSE_BYTES : Nat64 = 32768;
  public let THETA_VIDEO_MAX_RESPONSE_BYTES : Nat64 = 65536;

  // Build an image generation request body for the FLUX on-demand endpoint.
  // New format: {"input":{...fields...},"wait":5}
  // wait:5 tells the API to block up to 5 seconds before returning (synchronous style).
  // style and negativePrompt are combined into the prompt for FLUX.
  public func buildImageRequestBody(prompt : Text, style : Text, negativePrompt : Text) : Blob {
    ignore negativePrompt; // FLUX on-demand does not have a separate negative_prompt field
    let fullPrompt = if (style == "") prompt else prompt # " " # style;
    let body = "{\"input\":{"
      # "\"guidance\":3.5"
      # ",\"height\":512"
      # ",\"width\":512"
      # ",\"num_steps\":4"
      # ",\"prompt\":\"" # AiLib.jsonEscape(fullPrompt) # "\""
      # ",\"seed\":\"4775002255836\""
      # ",\"image2image_strength\":0.8"
      # "},\"wait\":5}";
    body.encodeUtf8()
  };

  // Build a video generation request body for the step_video on-demand endpoint.
  // New format: {"input":{...fields...},"wait":5}
  // imageUrls and logoUrl accepted for API compat but ignored — text-only generation.
  public func buildVideoRequestBody(
    promoText : Text,
    imageUrls : [Text],
    logoUrl : ?Text,
  ) : Blob {
    ignore imageUrls;
    ignore logoUrl;
    let body = "{\"input\":{"
      # "\"prompt\":\"" # AiLib.jsonEscape(promoText) # "\""
      # ",\"negative_prompt\":\"low contrast, muddy colors, blurry\""
      # ",\"fps\":25"
      # ",\"frames\":50"
      # ",\"seed\":100"
      # "},\"wait\":5}";
    body.encodeUtf8()
  };

  // Keep legacy name for callers that still reference it — delegates to buildVideoRequestBody.
  public func buildVideoAPIRequest(promoText : Text) : Blob {
    buildVideoRequestBody(promoText, [], null)
  };

  // Extract the output URL from a Theta EdgeCloud inference response.
  // Theta may return several JSON shapes:
  //   {"output":{"url":"https://..."}}
  //   {"output":["https://..."]}
  //   {"data":{"url":"https://..."}}
  //   {"result":"https://..."}
  // Returns the first URL found, or "ERROR: <body>" on failure.
  public func extractOutputUrl(bodyBlob : Blob) : Text {
    switch (bodyBlob.decodeUtf8()) {
      case null { "ERROR: Could not decode Theta API response" };
      case (?bodyText) {
        // Try "url":"..." pattern (covers output.url and data.url)
        let urlMarker = "\"url\":\"";
        if (bodyText.contains(#text urlMarker)) {
          var afterMarker = "";
          var skipped = false;
          for (seg in bodyText.split(#text urlMarker)) {
            if (not skipped) {
              skipped := true;
            } else if (afterMarker == "") {
              afterMarker := seg;
            };
          };
          if (afterMarker != "") {
            // Extract until closing quote
            var url = "";
            var done = false;
            for (part in afterMarker.split(#text "\"")) {
              if (not done) { url := part; done := true };
            };
            return url;
          };
        };
        // Try array format: ["https://..."]
        let arrayMarker = "[\"";
        if (bodyText.contains(#text arrayMarker)) {
          var afterMarker = "";
          var skipped = false;
          for (seg in bodyText.split(#text arrayMarker)) {
            if (not skipped) {
              skipped := true;
            } else if (afterMarker == "") {
              afterMarker := seg;
            };
          };
          if (afterMarker != "") {
            var url = "";
            var done = false;
            for (part in afterMarker.split(#text "\"")) {
              if (not done) { url := part; done := true };
            };
            return url;
          };
        };
        "ERROR: " # bodyText
      };
    }
  };

};
