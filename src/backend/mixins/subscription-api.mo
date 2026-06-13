import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import AdminAffiliateTypes "../types/admin-affiliate";
import AdminLib "../lib/admin-affiliate";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import EmailClient "mo:caffeineai-email/emailClient";
import Int "mo:core/Int";

mixin (
  subscriptions : List.List<Common.UserSubscription>,
  affiliates : Map.Map<Principal, AdminAffiliateTypes.AffiliateProfile>,
  profiles : Map.Map<Principal, Common.UserProfile>,
  adminUserCache : Map.Map<Principal, AdminAffiliateTypes.UserAdminView>,
  admins : List.List<AdminAffiliateTypes.AdminUser>,
  revokedAccess : List.List<AdminAffiliateTypes.FeatureAccessRecord>,
  acceptances : List.List<Common.UserAcceptance>,
) {
  // Returns true if the caller has any active subscription.
  public shared ({ caller }) func checkSubscription() : async Bool {
    subscriptions.any(func(s) { Principal.equal(s.principal, caller) });
  };

  // Returns {isSubscribed; tier} for the caller.
  // tier is "none" when not subscribed.
  // NOTE: tier=="" is treated as invalid/corrupt state and returns "none".
  // NOTE: Update call (not query) so it always reads fresh data after admin tier changes.
  public shared ({ caller }) func checkSubscriptionStatus() : async { isSubscribed : Bool; tier : Text } {
    switch (subscriptions.find(func(s) { Principal.equal(s.principal, caller) })) {
      case (?s) {
        let resolvedTier = if (s.tier == "") "none" else s.tier;
        { isSubscribed = resolvedTier != "none"; tier = resolvedTier }
      };
      case null { { isSubscribed = false; tier = "none" } };
    };
  };

  // Returns just the tier text for the caller ("none" when not subscribed).
  // NOTE: Update call (not query) so it always reads fresh data after admin tier changes.
  public shared ({ caller }) func getSubscriptionTier() : async Text {
    switch (subscriptions.find(func(s) { Principal.equal(s.principal, caller) })) {
      case (?s) { if (s.tier == "") "none" else s.tier };
      case null { "none" };
    };
  };

  // Mark the caller as subscribed at the "pro" tier (used after Stripe $30 checkout).
  // If the caller already has a valid tier, this is a no-op (does not downgrade).
  // Auto-creates a pending affiliate record if one does not exist yet.
  public shared ({ caller }) func markSubscribed() : async () {
    let existing = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    var wasAlreadyApplied = false;
    switch (existing) {
      case (?s) {
        // If the stored tier is empty (corrupt/legacy) repair it to "pro".
        if (s.tier == "") {
          s.tier := "pro";
          s.isPaid := true;
        } else {
          // Valid tier already present — subscription already existed, no change needed.
          wasAlreadyApplied := true;
        };
      };
      case null {
        subscriptions.add({
          principal = caller;
          subscribedAt = Time.now();
          var tier = "pro";
          var isPaid = true;
        });
      };
    };
    // Verify the subscription was properly applied.
    let applied = switch (subscriptions.find(func(s) { Principal.equal(s.principal, caller) })) {
      case (?s) { s.tier == "pro" and s.isPaid };
      case null { false };
    };
    // Fire-and-forget alert if payment was not properly applied.
    if (not applied) {
      ignore async {
        let principalText = caller.toText();
        let profileEmail = switch (profiles.get(caller)) {
          case (?p) p.email;
          case null "(no profile found)";
        };
        let ts = Time.now().toText();
        let subject = "Tele-Blast Payment Not Applied";
        let htmlBody = "<h2>Payment Not Applied Alert</h2>"
          # "<p><strong>User Principal:</strong> " # principalText # "</p>"
          # "<p><strong>User Email:</strong> " # profileEmail # "</p>"
          # "<p><strong>Attempted Plan:</strong> pro</p>"
          # "<p><strong>Timestamp (ns):</strong> " # ts # "</p>"
          # "<p><em>Please manually verify and apply this user account.</em></p>";
        ignore await EmailClient.sendServiceEmail("support", ["mikebendett@gmail.com"], subject, htmlBody);
      };
    };
    // Auto-create a pending affiliate record for this user.
    let profileName = switch (profiles.get(caller)) {
      case (?p) p.name;
      case null "";
    };
    let profileEmail = switch (profiles.get(caller)) {
      case (?p) p.email;
      case null "";
    };
    AdminLib.autoCreateAffiliate(affiliates, caller, profileName, profileEmail);
    // Write-on-subscribe: refresh admin cache so subscription state is immediately visible.
    AdminLib.refreshUserCache(adminUserCache, caller, profiles, subscriptions, revokedAccess, admins, acceptances);
  };

  // Set the subscription tier for the caller.
  // Only "pro" is accepted — the $15/month plan.
  public shared ({ caller }) func setSubscriptionTier(tier : Text) : async () {
    if (tier != "pro") {
      Runtime.trap("Invalid tier: only 'pro' is supported");
    };
    let existing = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    switch (existing) {
      case (?s) {
        s.tier := tier;
        s.isPaid := true;
      };
      case null {
        subscriptions.add({
          principal = caller;
          subscribedAt = Time.now();
          var tier = tier;
          var isPaid = true;
        });
      };
    };
    // Refresh cache after tier change.
    AdminLib.refreshUserCache(adminUserCache, caller, profiles, subscriptions, revokedAccess, admins, acceptances);
  };
};
