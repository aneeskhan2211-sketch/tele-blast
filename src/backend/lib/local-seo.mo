import AiLib "../lib/ai";

module {
  // Build the system + user prompt for GBP profile generation
  public func buildGbpSystemPrompt() : Text {
    "You are an expert local SEO specialist and Google Business Profile consultant. "
      # "You help small businesses craft compelling, keyword-rich Google Business Profile content. "
      # "Return ONLY valid JSON in this exact format (no markdown, no explanation, no preamble): "
      # "{"
      # "\"businessDescription\":\"...\","
      # "\"tagline\":\"...\","
      # "\"categories\":[\"...\",\"...\"],"
      # "\"attributes\":[\"...\",\"...\",\"...\",\"...\"],"
      # "\"posts\":["
      # "{\"type\":\"Offer\",\"title\":\"...\",\"content\":\"...\"},"
      # "{\"type\":\"Event\",\"title\":\"...\",\"content\":\"...\"},"
      # "{\"type\":\"Whats New\",\"title\":\"...\",\"content\":\"...\"},"
      # "{\"type\":\"Update\",\"title\":\"...\",\"content\":\"...\"}"
      # "]"
      # "} "
      # "businessDescription must be 300-400 words, professionally written, SEO-optimized for Google Business Profile. "
      # "tagline must be a short, punchy 1-line descriptor under 80 characters. "
      # "categories must contain 2-4 relevant Google Business Profile category names. "
      # "attributes must contain 4-6 key business highlights or amenities (e.g. 'Free Consultations', 'Licensed & Insured'). "
      # "posts must contain exactly 4 entries: one Offer, one Event, one Whats New, one Update — each with a compelling title and 2-3 sentence content."
  };

  public func buildGbpUserMessage(
    businessName : Text,
    services : Text,
    location : Text,
    hours : Text,
    uniqueValue : Text,
  ) : Text {
    "Generate Google Business Profile content for:\n"
      # "Business name: " # AiLib.jsonEscape(businessName) # "\n"
      # "Services offered: " # AiLib.jsonEscape(services) # "\n"
      # "Location: " # AiLib.jsonEscape(location) # "\n"
      # "Hours: " # AiLib.jsonEscape(hours) # "\n"
      # "What makes this business unique: " # AiLib.jsonEscape(uniqueValue)
  };

  // Build the system + user prompt for on-page SEO generation
  public func buildOnPageSeoSystemPrompt() : Text {
    "You are an expert on-page SEO copywriter specializing in local business landing pages. "
      # "You write SEO-optimized copy that ranks in local search and converts visitors into leads. "
      # "Return ONLY valid JSON in this exact format (no markdown, no explanation, no preamble): "
      # "{"
      # "\"pageTitle\":\"...\","
      # "\"metaDescription\":\"...\","
      # "\"h1\":\"...\","
      # "\"h2s\":[\"...\",\"...\",\"...\"],"
      # "\"introParagraph\":\"...\","
      # "\"ctaText\":\"...\","
      # "\"keywords\":[\"...\",\"...\",\"...\",\"...\",\"...\"]"
      # "} "
      # "pageTitle must be approximately 60 characters, keyword-rich, and include location. "
      # "metaDescription must be approximately 155 characters, compelling, and include a call to action. "
      # "h1 must be the single primary heading for the page. "
      # "h2s must contain 3-4 supporting section headings that target secondary keywords. "
      # "introParagraph must be 2-3 sentences introducing the business and its value for the landing page body. "
      # "ctaText must be short, action-oriented button text (e.g. 'Get a Free Quote', 'Contact Us Today'). "
      # "keywords must contain 5-8 target SEO keywords relevant to the business and location."
  };

  public func buildOnPageSeoUserMessage(
    businessName : Text,
    services : Text,
    location : Text,
    targetAudience : Text,
    formSlug : Text,
  ) : Text {
    "Generate on-page SEO copy for a landing page:\n"
      # "Business name: " # AiLib.jsonEscape(businessName) # "\n"
      # "Services offered: " # AiLib.jsonEscape(services) # "\n"
      # "Location: " # AiLib.jsonEscape(location) # "\n"
      # "Target audience: " # AiLib.jsonEscape(targetAudience) # "\n"
      # "Landing page URL slug: " # AiLib.jsonEscape(formSlug)
  };
};
