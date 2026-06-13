module {
  // Input type for Google Business Profile generation
  public type GbpProfileInput = {
    businessName : Text;
    services : Text;
    location : Text;
    hours : Text;
    uniqueValue : Text;
  };

  // Input type for on-page SEO generation
  public type OnPageSeoInput = {
    businessName : Text;
    services : Text;
    location : Text;
    targetAudience : Text;
    formSlug : Text;
  };
};
