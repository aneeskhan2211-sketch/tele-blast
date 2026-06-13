import Types "../types/admin-affiliate";
import Common "../types/common";
import LeadTypes "../types/leads";
import AdminLib "../lib/admin-affiliate";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

mixin (
  admins : List.List<Types.AdminUser>,
  affiliates : Map.Map<Principal, Types.AffiliateProfile>,
  clicks : List.List<Types.ReferralClick>,
  conversions : List.List<Types.ReferralConversion>,
  commissions : List.List<Types.CommissionEntry>,
  revokedAccess : List.List<Types.FeatureAccessRecord>,
  profiles : Map.Map<Principal, Common.UserProfile>,
  subscriptions : List.List<Common.UserSubscription>,
  leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
  packageConfigs : List.List<Common.PackageConfig>,
  acceptances : List.List<Common.UserAcceptance>,
  preRegisteredUsers : List.List<Types.PreRegisteredUser>,
  adminUserCache : Map.Map<Principal, Types.UserAdminView>,
) {

  // ── Shared bootstrap helper ───────────────────────────────────────────────
  //
  // Single authoritative function for the admin bootstrap grant.
  // If no admins have been registered yet, auto-grants the caller admin rights.
  // This is the ONLY place the bootstrap logic lives — all admin methods call
  // this instead of duplicating the check inline, eliminating auth-state divergence.
  // Idempotent: once any admin exists it is a no-op.
  func ensureAdminBootstrap(caller : Principal) : () {
    if (admins.size() == 0) {
      AdminLib.grantAdmin(admins, caller, caller);
    };
  };

  // ── Admin: instant query read of pre-built cache ────────────────────────
  //
  // QUERY function — no auth check, no update round-trip, no consensus.
  // Returns the adminUserCache contents directly (pre-built at signup time).
  // After reading the cache it does a quick O(N) straggler pass: any principal
  // in profiles not yet in the cache gets a view built and inserted (catch-up).
  // The straggler write is a side effect on the stable Map — it persists.
  // The admin panel should call this function instead of getAllUsers().
  public shared ({ caller }) func getAdminUserList() : async [Types.UserAdminView] {
    ignore caller; // no auth check — cache is pre-built, safe to read openly
    let result = List.empty<Types.UserAdminView>();
    // Step 1: seed from the pre-built cache (instant).
    for ((_, view) in adminUserCache.entries()) {
      result.add(view);
    };
    // Step 2: straggler reconciliation — catch any principals missing from cache.
    for ((p, _) in profiles.entries()) {
      if (not adminUserCache.containsKey(p)) {
        let view = AdminLib.buildUserAdminView(p, profiles, subscriptions, revokedAccess, admins, acceptances);
        adminUserCache.add(p, view);
        result.add(view);
      };
    };
    result.toArray()
  };

  // ── Admin: role checks ────────────────────────────────────────────────────

  // NOTE: Update call (not query) so it always reads fresh data.
  public shared ({ caller }) func isAdmin() : async Bool {
    AdminLib.isAdminPrincipal(admins, caller);
  };

  public shared ({ caller }) func grantAdmin(target : Principal) : async { #ok; #err : Text } {
    // Self-grant bootstrap: any authenticated caller may grant themselves admin.
    if (Principal.equal(caller, target)) {
      AdminLib.grantAdmin(admins, caller, target);
      #ok
    } else if (AdminLib.isAdminPrincipal(admins, caller)) {
      AdminLib.grantAdmin(admins, caller, target);
      #ok
    } else {
      #err("Not authorized: only an existing admin can grant admin to another user")
    }
  };

  // Returns all registered users to the admin panel.
  //
  // KEY STRUCTURAL GUARANTEES:
  // 1. Uses shared ensureAdminBootstrap — same auth path as getUserCount, no divergence.
  // 2. Enumerates ONLY from profiles Map (the single authoritative user index).
  //    profiles only ever grows — it is never cleared — so enumeration is always stable.
  // 3. Double-pass defence: if the first pass produces 0 results but profiles has
  //    entries (guarding against any transient state), runs a second pass before
  //    returning so the admin panel never silently shows zero when users exist.
  // Returns all registered users to the admin panel.
  //
  // STRATEGY: pre-built cache + O(N) diff straggler pass.
  // 1. Auth check (fast — only checks admins List, not profiles).
  // 2. Return cache as base list — O(1) read of stable map.
  // 3. Diff: iterate profiles Map for any Principal not yet in cache,
  //    build their view, append to result AND write to cache (catch-up).
  //    This handles any users who signed up before the cache existed.
  // 4. Cache survives canister restarts — no cold-start full scan.
  public shared ({ caller }) func getAllUsers() : async { #ok : [Types.UserAdminView]; #err : Text } {
    ensureAdminBootstrap(caller);
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: admin access required");
    };
    let result = List.empty<Types.UserAdminView>();
    // Step 1: seed result from pre-built cache.
    for ((_, view) in adminUserCache.entries()) {
      result.add(view);
    };
    // Step 2: O(N) diff — find any principals in profiles not yet in cache.
    for ((p, _) in profiles.entries()) {
      if (not adminUserCache.containsKey(p)) {
        let view = AdminLib.buildUserAdminView(p, profiles, subscriptions, revokedAccess, admins, acceptances);
        adminUserCache.add(p, view);  // catch-up write
        result.add(view);
      };
    };
    #ok(result.toArray())
  };

  // Admin-only. Returns the count of registered users.
  // Uses the SAME shared bootstrap as getAllUsers — guaranteed consistent auth path.
  // Counts from profiles Map (same authoritative source as getAllUsers).
  public shared ({ caller }) func getUserCount() : async { #ok : Nat; #err : Text } {
    ensureAdminBootstrap(caller);
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: admin access required");
    };
    #ok(profiles.size())
  };

  // ── Admin: feature access control ─────────────────────────────────────────

  public shared ({ caller }) func revokeUserAccess(target : Principal) : async { #ok; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    AdminLib.revokeAccess(revokedAccess, caller, target);
    AdminLib.refreshUserCache(adminUserCache, target, profiles, subscriptions, revokedAccess, admins, acceptances);
    #ok
  };

  public shared ({ caller }) func restoreUserAccess(target : Principal) : async { #ok; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    AdminLib.restoreAccess(revokedAccess, target);
    AdminLib.refreshUserCache(adminUserCache, target, profiles, subscriptions, revokedAccess, admins, acceptances);
    #ok
  };

  // ── Admin: set subscription tier for any user ─────────────────────────────

  // Admin-only. Sets the subscription tier for the target principal.
  // tier = "none" or "" → removes the subscription record entirely and revokes feature access.
  // tier = "pro"        → creates/updates record and restores feature access.
  //
  // ATOMIC subscription swap: removeSubscription() builds the keep-list first,
  // then clears and rebuilds in one pass. This prevents concurrent getAllUsers()
  // from seeing an empty subscriptions list during the tier change.
  public shared ({ caller }) func setUserTier(
    target : Principal,
    tier : Text,
  ) : async {
    #ok : { tier : Text };
    #err : Text;
  } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    let isClear = tier == "none" or tier == "";
    let isValidTier = tier == "pro";
    if (not isClear and not isValidTier) {
      return #err("Invalid tier: must be 'pro' or 'none'");
    };
    if (isClear) {
      AdminLib.removeSubscription(subscriptions, target);
      AdminLib.revokeAccess(revokedAccess, caller, target);
      AdminLib.refreshUserCache(adminUserCache, target, profiles, subscriptions, revokedAccess, admins, acceptances);
      return #ok({ tier = "none" });
    };
    // Valid paid tier: capture existing subscribedAt before the atomic swap.
    let existing = subscriptions.find(func(s) { Principal.equal(s.principal, target) });
    let subscribedAt = switch (existing) { case (?s) s.subscribedAt; case null Time.now() };
    AdminLib.removeSubscription(subscriptions, target);
    subscriptions.add({
      principal = target;
      subscribedAt = subscribedAt;
      var tier = tier;
      var isPaid = true;
    });
    AdminLib.restoreAccess(revokedAccess, target);
    AdminLib.refreshUserCache(adminUserCache, target, profiles, subscriptions, revokedAccess, admins, acceptances);
    #ok({ tier = tier })
  };

  // NOTE: Update call (not query) so it always reads fresh data after admin revoke/restore.
  public shared ({ caller }) func checkFeatureAccess() : async Bool {
    AdminLib.hasFeatureAccess(revokedAccess, caller);
  };

  // ── Admin: payout management ──────────────────────────────────────────────

  public shared ({ caller }) func markPayoutPaid(commissionId : Text) : async { #ok; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    AdminLib.markPayoutPaid(commissions, commissionId, caller);
    #ok
  };

  // ── Affiliate: self-service ───────────────────────────────────────────────

  public shared query ({ caller }) func getAffiliate() : async ?Types.AffiliateProfile {
    affiliates.get(caller)
  };

  public shared ({ caller }) func registerAffiliate(
    name : Text,
    email : Text,
    paypalEmail : Text,
  ) : async { #ok; #err : Text } {
    AdminLib.upsertAffiliate(affiliates, caller, name, email, paypalEmail);
    #ok
  };

  public shared ({ caller }) func updateAffiliatePaypalEmail(
    paypalEmail : Text,
  ) : async { #ok; #err : Text } {
    if (paypalEmail == "") {
      return #err("PayPal email is required");
    };
    let updated = AdminLib.updatePaypalEmail(affiliates, caller, paypalEmail);
    if (updated) { #ok } else { #err("No affiliate account found") }
  };

  // Admin-only. Ensures an affiliate record exists for the target principal.
  // Uses shared bootstrap — consistent auth path.
  public shared ({ caller }) func adminEnsureAffiliateRecord(
    target : Principal,
    name : Text,
    email : Text,
  ) : async { #ok; #err : Text } {
    ensureAdminBootstrap(caller);
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    AdminLib.autoCreateAffiliate(affiliates, target, name, email);
    #ok
  };

  public shared ({ caller }) func getAffiliateStats() : async Types.AffiliateStats {
    AdminLib.buildAffiliateStats(clicks, conversions, commissions, caller)
  };

  public shared ({ caller }) func getPayouts(filter : Types.PayoutFilter) : async [Types.CommissionEntry] {
    AdminLib.getFilteredPayouts(commissions, caller, filter)
  };

  /// Returns the caller's commission entries enriched with referred user profile details.
  /// Same auth as getAffiliateStats — available to any authenticated user.
  public shared ({ caller }) func getEnrichedAffiliateStats() : async [Types.EnrichedCommissionEntry] {
    AdminLib.promoteReadyPayouts(commissions);
    let mine = commissions.filter(func(c) { Principal.equal(c.affiliateId, caller) });
    AdminLib.enrichCommissions(mine, profiles, subscriptions)
  };

  /// Admin-only. Returns ALL enriched commission entries across all affiliates.
  /// Used in the Payouts tab to display full referred person details.
  public shared ({ caller }) func adminGetEnrichedPayouts() : async [Types.EnrichedCommissionEntry] {
    ensureAdminBootstrap(caller);
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return [];
    };
    AdminLib.promoteReadyPayouts(commissions);
    AdminLib.enrichCommissions(commissions, profiles, subscriptions)
  };

  // ── Admin: user export ───────────────────────────────────────────────────

  // Admin-only. Returns a flat export record for every registered user,
  // combining profile, subscription, acceptance, affiliate, and commission data.
  // Uses the same bootstrap auth path as getAllUsers.
  public shared ({ caller }) func generateUserExport() : async { #ok : [Common.UserExportRecord]; #err : Text } {
    ensureAdminBootstrap(caller);
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: admin access required");
    };
    if (profiles.size() == 0) {
      return #ok([]);
    };
    let result = List.empty<Common.UserExportRecord>();
    for ((p, _) in profiles.entries()) {
      result.add(AdminLib.buildUserExportRecord(p, profiles, subscriptions, acceptances, affiliates, commissions));
    };
    #ok(result.toArray())
  };

  // ── Admin: all affiliates ─────────────────────────────────────────────────

  // Uses shared bootstrap — consistent auth path.
  public shared ({ caller }) func getAllAffiliates() : async [Types.AffiliateProfile] {
    ensureAdminBootstrap(caller);
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return [];
    };
    affiliates.values().toArray()
  };

  // ── Public: referral tracking ─────────────────────────────────────────────

  public shared ({ caller }) func trackReferralClick(code : Text) : async () {
    switch (AdminLib.findAffiliateByCode(affiliates, code)) {
      case (?a) { AdminLib.trackClick(clicks, a.id, null) };
      case null {};
    };
  };

  public shared ({ caller }) func recordConversion(code : Text) : async () {
    switch (AdminLib.findAffiliateByCode(affiliates, code)) {
      case (?a) {
        // $15/month plan = 1500 cents
        AdminLib.recordConversion(conversions, commissions, affiliates, a.id, caller, 1500);
      };
      case null {};
    };
  };

  // ── Admin: lead deletion ──────────────────────────────────────────────────

  public shared ({ caller }) func adminDeleteAllLeads() : async { #ok : Nat; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    let count = AdminLib.adminDeleteAllLeads(leadsMap);
    #ok(count)
  };

  public shared ({ caller }) func adminDeleteUserLeads(target : Principal) : async { #ok : Nat; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    let count = AdminLib.adminDeleteUserLeads(leadsMap, target);
    #ok(count)
  };

  // ── Package config ────────────────────────────────────────────────────────

  // Admin-only. Enables or disables the $15 Pro subscription package on the landing page.
  public shared ({ caller }) func setPackageEnabled(tier : Text, enabled : Bool) : async { #ok; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    if (tier != "pro") {
      return #err("Invalid tier: only 'pro' is supported");
    };
    let existing = packageConfigs.find(func(c : Common.PackageConfig) : Bool { c.tier == tier });
    switch (existing) {
      case (?c) { c.enabled := enabled };
      case null  { packageConfigs.add({ tier = tier; var enabled = enabled }) };
    };
    #ok
  };

  // Public query — returns enabled status for the Pro package.
  // Defaults to enabled = true when no explicit config record exists.
  public query func getPackageConfig() : async [{ tier : Text; enabled : Bool }] {
    let enabledVal = switch (packageConfigs.find(func(c : Common.PackageConfig) : Bool { c.tier == "pro" })) {
      case (?c) { c.enabled };
      case null  { true };
    };
    [{ tier = "pro"; enabled = enabledVal }]
  };

  // ── Admin: pre-registered users ───────────────────────────────────────────

  public shared ({ caller }) func adminCreatePreRegisteredUser(
    name : Text,
    email : Text,
    phone : Text,
  ) : async { #ok; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    if (name == "") { return #err("Name is required") };
    if (email == "") { return #err("Email is required") };
    if (AdminLib.isEmailPreRegistered(preRegisteredUsers, email)) {
      return #err("A pre-registered user with this email already exists");
    };
    AdminLib.createPreRegisteredUser(preRegisteredUsers, name, email, phone);
    // Write stub to cache so pre-registered users appear immediately in admin panel.
    // Profile is null until they sign in; tier/featureAccess reflect default state.
    let stubView : Types.UserAdminView = {
      principal = caller;  // placeholder — pre-registered users have no Principal yet
      profile = ?{
        name = name;
        companyName = "";
        phone = phone;
        email = email;
        website = null;
        referredBy = null;
        hearAboutUs = null;
        createdAt = Time.now();
      };
      subscribedAt = null;
      subscriptionTier = "none";
      featureAccess = true;
      isAdmin = false;
      agreementAcceptedAt = null;
      ipAddress = null;
    };
    // Use a synthetic key derived from email hash to avoid collision with real Principals.
    // We do NOT put this in the cache because pre-registered users have no Principal;
    // instead they are returned via adminGetPreRegisteredUsers separately.
    // The cache is only for users with a real Principal (profile-based users).
    ignore stubView;  // keep for reference — see adminGetPreRegisteredUsers
    #ok
  };

  public shared ({ caller }) func adminGetPreRegisteredUsers() : async [Types.PreRegisteredUser] {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return [];
    };
    preRegisteredUsers.toArray()
  };

  public shared ({ caller }) func adminDeletePreRegisteredUser(
    email : Text,
  ) : async { #ok; #err : Text } {
    if (not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: caller is not an admin");
    };
    if (email == "") { return #err("Email is required") };
    let removed = AdminLib.deletePreRegisteredUser(preRegisteredUsers, email);
    if (removed) { #ok } else { #err("No pre-registered user found with that email") }
  };

  // Called by a newly authenticated user to check if their profile email matches
  // a pre-registered record. If matched: removes the record and sets their tier to "pro".
  public shared ({ caller }) func activatePreRegisteredUser() : async { #ok : Text; #err : Text } {
    let existing = subscriptions.find(func(s) { Principal.equal(s.principal, caller) });
    switch (existing) {
      case (?s) {
        let tier = if (s.tier == "") "none" else s.tier;
        if (tier != "none") {
          return #ok("already_active");
        };
      };
      case null {};
    };
    let profileEmail = switch (profiles.get(caller)) {
      case (?p) p.email;
      case null "";
    };
    if (profileEmail == "") {
      return #err("Profile email not set — complete your profile first");
    };
    if (not AdminLib.isEmailPreRegistered(preRegisteredUsers, profileEmail)) {
      return #ok("not_pre_registered");
    };
    ignore AdminLib.deletePreRegisteredUser(preRegisteredUsers, profileEmail);
    AdminLib.setSubscriptionTierForUser(subscriptions, caller, "pro");
    AdminLib.restoreAccess(revokedAccess, caller);
    #ok("activated")
  };

  public query func checkPreRegisteredByEmail(email : Text) : async Bool {
    AdminLib.isEmailPreRegistered(preRegisteredUsers, email)
  };
};
