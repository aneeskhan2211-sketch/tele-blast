module {
  public type Timestamp = Int;

  public type UserAcceptance = {
    principal : Principal;
    acceptedAt : Int;
    ipAddress : ?Text;
  };

  public type UserSubscription = {
    principal : Principal;
    subscribedAt : Int;
    var tier : Text; // only "pro" is a valid paid tier
    var isPaid : Bool;
  };

  public type UserProfile = {
    name : Text;
    companyName : Text;
    phone : Text;
    email : Text;
    website : ?Text;
    referredBy : ?Text;
    hearAboutUs : ?Text;
    createdAt : Int;
  };

  public type ProfileInput = {
    name : Text;
    companyName : Text;
    phone : Text;
    email : Text;
    website : ?Text;
    referredBy : ?Text;
    hearAboutUs : ?Text;
  };

  public type ColdCallScriptConfig = {
    whatYouAreSelling : Text;
    preQualifyingNeeds : Text;
    packagesOrServices : Text;
    goalType : Text;
  };

  public type ColdCallScriptConfigInput = {
    whatYouAreSelling : Text;
    preQualifyingNeeds : Text;
    packagesOrServices : Text;
    goalType : Text;
  };

  // Represents whether the $30 Pro subscription package is enabled for display on the landing page.
  public type PackageConfig = {
    tier : Text;   // only "pro"
    var enabled : Bool;
  };

  /// Flat export record combining all user data for CSV/admin export.
  public type UserExportRecord = {
    principal : Text;
    name : Text;
    companyName : Text;
    email : Text;
    phone : Text;
    website : Text;
    referredBy : Text;
    createdAt : Int;
    ipAddress : Text;
    agreementAcceptedAt : ?Int;
    subscriptionTier : Text;
    isPaid : Bool;
    subscribedAt : ?Int;
    isAffiliate : Bool;
    referralCode : Text;
    affiliateApproved : Bool;
    totalCommissions : Nat;
    totalPayouts : Nat;
    pendingPayouts : Nat;
    hearAboutUs : Text;
  };

  /// Voicemail recording preference saved by a user for use in the Power Dialer.
  /// Raw audio is stored in object-storage; only the URL reference and metadata live here.
  public type VoicemailPreference = {
    recordingUrl  : Text;
    recordingName : Text;
    savedAt       : Int;
  };
};
