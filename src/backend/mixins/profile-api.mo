import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import AdminAffiliateTypes "../types/admin-affiliate";
import ProfileLib "../lib/profile";
import AdminLib "../lib/admin-affiliate";
import EmailClient "mo:caffeineai-email/emailClient";
import Int "mo:core/Int";
import List "mo:core/List";

mixin (
  profiles : Map.Map<Principal, Common.UserProfile>,
  adminUserCache : Map.Map<Principal, AdminAffiliateTypes.UserAdminView>,
  subscriptions : List.List<Common.UserSubscription>,
  admins : List.List<AdminAffiliateTypes.AdminUser>,
  revokedAccess : List.List<AdminAffiliateTypes.FeatureAccessRecord>,
  acceptances : List.List<Common.UserAcceptance>,
) {
  public shared ({ caller }) func saveUserProfile(
    input : Common.ProfileInput,
  ) : async { #ok : Common.UserProfile; #err : Text } {
    let profile = ProfileLib.saveProfile(profiles, caller, input, Time.now());
    // DIRECT signup write: immediately write this user into the admin cache
    // using only their profile data (no subscription scan). This guarantees
    // the user appears in the admin panel the instant they sign up, before
    // any subscription record exists. No auth check needed — just write.
    AdminLib.writeSignupToCache(adminUserCache, caller, profile);
    // Fire-and-forget: notify admin of new account creation
    ignore async {
      let ts = Time.now().toText();
      let subject = "New Tele-Blast Account Created";
      let htmlBody = "<h2>New Account Created</h2>"
        # "<p><strong>Full Name:</strong> " # profile.name # "</p>"
        # "<p><strong>Email:</strong> " # profile.email # "</p>"
        # "<p><strong>Phone:</strong> " # profile.phone # "</p>"
        # "<p><strong>Company:</strong> " # profile.companyName # "</p>"
        # "<p><strong>Signup Time (ns):</strong> " # ts # "</p>";
      ignore await EmailClient.sendServiceEmail("support", ["mikebendett@gmail.com"], subject, htmlBody);
    };
    #ok(profile)
  };

  public shared query ({ caller }) func getUserProfile() : async { #ok : Common.UserProfile; #err : Text } {
    switch (ProfileLib.getProfile(profiles, caller)) {
      case (?p) { #ok(p) };
      case null { #err("Profile not found") };
    }
  };
};
