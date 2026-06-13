import Common "common";

module {
  public type AdminUser = {
    principal : Principal;
    grantedBy : Principal;
    grantedAt : Int;
  };

  public type AffiliateProfile = {
    id : Principal;
    name : Text;
    email : Text;
    paypalEmail : Text;
    referralCode : Text;
    createdAt : Int;
    approved : Bool;
  };

  public type ReferralClick = {
    affiliateId : Principal;
    clickedAt : Int;
    ip : ?Text;
  };

  public type ReferralConversion = {
    affiliateId : Principal;
    newUserPrincipal : Principal;
    planAmount : Nat;
    convertedAt : Int;
  };

  public type CommissionStatus = {
    #pending;
    #ready;
    #paid;
  };

  public type CommissionEntry = {
    id : Text;
    affiliateId : Principal;
    newUserPrincipal : Principal;
    planAmount : Nat;
    commissionAmount : Nat;
    saleDate : Int;
    payoutEligibleDate : Int;
    status : CommissionStatus;
    paidAt : ?Int;
    paypalEmail : Text;
  };

  public type FeatureAccessRecord = {
    principal : Principal;
    revokedAt : Int;
    revokedBy : Principal;
  };

  public type UserAdminView = {
    principal : Principal;
    profile : ?Common.UserProfile;
    subscribedAt : ?Int;
    subscriptionTier : Text; // "none" | "pro" | "pro_landing" | "pro_ads" | "pro_seo"
    featureAccess : Bool;
    isAdmin : Bool;
    agreementAcceptedAt : ?Int;
    ipAddress : ?Text;
  };

  public type PreRegisteredUser = {
    name : Text;
    email : Text;
    phone : Text;
    createdAt : Int;
  };

  public type AffiliateStats = {
    totalClicks : Nat;
    totalConversions : Nat;
    pendingAmount : Nat;
    readyAmount : Nat;
    paidAmount : Nat;
    commissions : [CommissionEntry];
  };

  /// A CommissionEntry enriched with the referred user's profile details.
  /// Empty-string sentinels are used for optional profile fields (no ?Text at the API boundary).
  public type EnrichedCommissionEntry = {
    affiliateId : Text;
    newUserPrincipal : Text;
    commissionAmount : Nat;
    status : Text;        // "pending" | "ready" | "paid"
    referredName : Text;
    referredEmail : Text;
    referredPhone : Text;
    referredBizName : Text;
    hasPurchased : Bool;
  };

  public type PayoutFilter = {
    #all;
    #pending;
    #ready;
    #paid;
  };
};
