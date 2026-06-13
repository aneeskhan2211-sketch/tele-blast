import Types "../types/admin-affiliate";
import Common "../types/common";
import LeadTypes "../types/leads";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  // ── Admin helpers ──────────────────────────────────────────────

  public func isAdminPrincipal(
    admins : List.List<Types.AdminUser>,
    caller : Principal,
  ) : Bool {
    admins.any(func(a) { Principal.equal(a.principal, caller) });
  };

  public func grantAdmin(
    admins : List.List<Types.AdminUser>,
    caller : Principal,
    target : Principal,
  ) : () {
    let alreadyAdmin = admins.any(func(a) { Principal.equal(a.principal, target) });
    if (not alreadyAdmin) {
      admins.add({
        principal = target;
        grantedBy = caller;
        grantedAt = Time.now();
      });
    };
  };
  // ── Direct signup cache write ──────────────────────────────────
  //
  // Called IMMEDIATELY at signup before any subscription exists.
  // Writes a minimal UserAdminView with only profile data (tier="none", isPaid=false).
  // This guarantees the user appears in the admin list the instant they sign up.
  // A later refreshUserCache call will fill in subscription data after payment.
  public func writeSignupToCache(
    cache : Map.Map<Principal, Types.UserAdminView>,
    principal : Principal,
    profile : Common.UserProfile,
  ) : () {
    let view : Types.UserAdminView = {
      principal = principal;
      profile = ?profile;
      subscribedAt = null;
      subscriptionTier = "none";
      featureAccess = true;
      isAdmin = false;
      agreementAcceptedAt = null;
      ipAddress = null;
    };
    cache.add(principal, view);
  };


  // ── Admin user cache helpers ──────────────────────────────────

  /// Builds and upserts a UserAdminView for `principal` into `cache`.
  /// Called at every write point: signup, subscription change, pre-registration.
  public func refreshUserCache(
    cache : Map.Map<Principal, Types.UserAdminView>,
    principal : Principal,
    profiles : Map.Map<Principal, Common.UserProfile>,
    subscriptions : List.List<Common.UserSubscription>,
    revokedAccess : List.List<Types.FeatureAccessRecord>,
    admins : List.List<Types.AdminUser>,
    acceptances : List.List<Common.UserAcceptance>,
  ) : () {
    let view = buildUserAdminView(principal, profiles, subscriptions, revokedAccess, admins, acceptances);
    cache.add(principal, view);
  };

  // ── User admin view ────────────────────────────────────────────

  public func buildUserAdminView(
    principal : Principal,
    profiles : Map.Map<Principal, Common.UserProfile>,
    subscriptions : List.List<Common.UserSubscription>,
    revokedAccess : List.List<Types.FeatureAccessRecord>,
    admins : List.List<Types.AdminUser>,
    acceptances : List.List<Common.UserAcceptance>,
  ) : Types.UserAdminView {
    let profile = profiles.get(principal);
    let sub = subscriptions.find(func(s) { Principal.equal(s.principal, principal) });
    let isRevoked = revokedAccess.any(func(r) { Principal.equal(r.principal, principal) });
    let isAdm = admins.any(func(a) { Principal.equal(a.principal, principal) });
    let acceptance = acceptances.find(func(a) { Principal.equal(a.principal, principal) });
    {
      principal = principal;
      profile = profile;
      subscribedAt = switch (sub) { case (?s) ?s.subscribedAt; case null null };
      subscriptionTier = switch (sub) {
        case (?s) if (s.tier == "") "none" else s.tier;
        case null "none";
      };
      featureAccess = not isRevoked;
      isAdmin = isAdm;
      agreementAcceptedAt = switch (acceptance) { case (?a) ?a.acceptedAt; case null null };
      ipAddress = switch (acceptance) { case (?a) a.ipAddress; case null null };
    };
  };

  // ── Feature access ─────────────────────────────────────────────

  // Returns true if user HAS access (i.e., NOT revoked)
  public func hasFeatureAccess(
    revokedAccess : List.List<Types.FeatureAccessRecord>,
    principal : Principal,
  ) : Bool {
    not revokedAccess.any(func(r) { Principal.equal(r.principal, principal) });
  };

  public func revokeAccess(
    revokedAccess : List.List<Types.FeatureAccessRecord>,
    caller : Principal,
    target : Principal,
  ) : () {
    let alreadyRevoked = revokedAccess.any(func(r) { Principal.equal(r.principal, target) });
    if (not alreadyRevoked) {
      revokedAccess.add({
        principal = target;
        revokedAt = Time.now();
        revokedBy = caller;
      });
    };
  };

  public func restoreAccess(
    revokedAccess : List.List<Types.FeatureAccessRecord>,
    target : Principal,
  ) : () {
    let toRemove = revokedAccess.findIndex(func(r) { Principal.equal(r.principal, target) });
    switch (toRemove) {
      case (?idx) {
        let before = revokedAccess.sliceToArray(0, idx);
        let afterIdx : Int = idx + 1;
        let sz : Int = revokedAccess.size();
        let after = revokedAccess.sliceToArray(afterIdx, sz);
        revokedAccess.clear();
        for (r in before.values()) { revokedAccess.add(r) };
        for (r in after.values()) { revokedAccess.add(r) };
      };
      case null {};
    };
  };

  // ── Subscription helpers for admin tier management ─────────────

  // Removes ALL subscription records matching the target principal.
  // Collects every non-matching record, clears the list, then rebuilds it.
  // This handles duplicate subscription records in one pass rather than only
  // removing the first occurrence.
  // Removes ALL subscription records matching the target principal.
  // ATOMIC swap pattern: builds the new list fully BEFORE clearing the old one,
  // so any concurrent getAllUsers() sees either the full old list or the full new list
  // — never an empty intermediate state.
  public func removeSubscription(
    subscriptions : List.List<Common.UserSubscription>,
    target : Principal,
  ) : () {
    // ATOMIC swap: collect kept entries first into an array,
    // then clear, then repopulate — no intermediate empty state.
    let kept = subscriptions.filter(func(s) { not Principal.equal(s.principal, target) }).toArray();
    subscriptions.clear();
    for (s in kept.values()) { subscriptions.add(s) };
  };

  // Creates or updates the subscription tier for the given principal.
  public func setSubscriptionTierForUser(
    subscriptions : List.List<Common.UserSubscription>,
    target : Principal,
    tier : Text,
  ) : () {
    let existing = subscriptions.find(func(s) { Principal.equal(s.principal, target) });
    switch (existing) {
      case (?s) {
        s.tier := tier;
        s.isPaid := tier == "pro";
      };
      case null {
        subscriptions.add({
          principal = target;
          subscribedAt = Time.now();
          var tier = tier;
          var isPaid = tier == "pro";
        });
      };
    };
  };

  // ── Affiliate ──────────────────────────────────────────────────

  public func generateReferralCode(principal : Principal) : Text {
    let txt = principal.toText();
    let chars = txt.toArray();
    var code = "";
    var i = 0;
    for (c in chars.values()) {
      if (i < 8) {
        code := code # Text.fromChar(c);
        i += 1;
      };
    };
    code
  };

  // Upsert: create or update an affiliate record.
  // If a record already exists, updates name/email/paypalEmail while preserving
  // the original referralCode and createdAt. Never errors on duplicate calls.
  public func upsertAffiliate(
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    principal : Principal,
    name : Text,
    email : Text,
    paypalEmail : Text,
  ) : () {
    switch (affiliates.get(principal)) {
      case (?existing) {
        affiliates.add(principal, {
          existing with
          name = if (name == "") existing.name else name;
          email = if (email == "") existing.email else email;
          paypalEmail = if (paypalEmail == "") existing.paypalEmail else paypalEmail;
        });
      };
      case null {
        let code = generateReferralCode(principal);
        affiliates.add(principal, {
          id = principal;
          name = name;
          email = email;
          paypalEmail = paypalEmail;
          referralCode = code;
          createdAt = Time.now();
          approved = true;
        });
      };
    };
  };

  // Idempotent auto-create: only creates a new record if none exists.
  // Used when a user subscribes — auto-registers them as a pending affiliate
  // (empty paypalEmail) so the affiliate map always has an entry for each subscriber.
  public func autoCreateAffiliate(
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    principal : Principal,
    name : Text,
    email : Text,
  ) : () {
    if (not affiliates.containsKey(principal)) {
      let code = generateReferralCode(principal);
      affiliates.add(principal, {
        id = principal;
        name = name;
        email = email;
        paypalEmail = "";
        referralCode = code;
        createdAt = Time.now();
        approved = true;
      });
    };
  };

  // Update only the PayPal email on an existing affiliate record.
  // Returns false if no record exists for the principal.
  public func updatePaypalEmail(
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    principal : Principal,
    paypalEmail : Text,
  ) : Bool {
    switch (affiliates.get(principal)) {
      case (?existing) {
        affiliates.add(principal, { existing with paypalEmail = paypalEmail });
        true
      };
      case null { false };
    };
  };

  // Legacy alias kept for backward compatibility — delegates to upsertAffiliate.
  public func registerAffiliate(
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    principal : Principal,
    name : Text,
    email : Text,
    paypalEmail : Text,
  ) : () {
    upsertAffiliate(affiliates, principal, name, email, paypalEmail);
  };

  public func findAffiliateByCode(
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    code : Text,
  ) : ?Types.AffiliateProfile {
    var result : ?Types.AffiliateProfile = null;
    for ((_, a) in affiliates.entries()) {
      if (a.referralCode == code) {
        result := ?a;
      };
    };
    result
  };

  // ── Referral tracking ──────────────────────────────────────────

  public func trackClick(
    clicks : List.List<Types.ReferralClick>,
    affiliateId : Principal,
    ip : ?Text,
  ) : () {
    clicks.add({
      affiliateId = affiliateId;
      clickedAt = Time.now();
      ip = ip;
    });
  };

  public func recordConversion(
    conversions : List.List<Types.ReferralConversion>,
    commissions : List.List<Types.CommissionEntry>,
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    affiliateId : Principal,
    newUserPrincipal : Principal,
    planAmount : Nat,
  ) : () {
    let now = Time.now();
    // 30 days in nanoseconds
    let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let payoutEligibleDate = now + thirtyDaysNs;

    conversions.add({
      affiliateId = affiliateId;
      newUserPrincipal = newUserPrincipal;
      planAmount = planAmount;
      convertedAt = now;
    });

    // 25% commission
    let commissionAmount = planAmount / 4;

    let paypalEmail = switch (affiliates.get(affiliateId)) {
      case (?a) a.paypalEmail;
      case null "";
    };

    let commissionId = affiliateId.toText() # "-" # now.toText();

    commissions.add({
      id = commissionId;
      affiliateId = affiliateId;
      newUserPrincipal = newUserPrincipal;
      planAmount = planAmount;
      commissionAmount = commissionAmount;
      saleDate = now;
      payoutEligibleDate = payoutEligibleDate;
      status = #pending;
      paidAt = null;
      paypalEmail = paypalEmail;
    });
  };

  // ── Commission / payout ────────────────────────────────────────

  public func promoteReadyPayouts(
    commissions : List.List<Types.CommissionEntry>,
  ) : () {
    let now = Time.now();
    commissions.mapInPlace(func(c) {
      if (c.status == #pending and now >= c.payoutEligibleDate) {
        { c with status = #ready }
      } else {
        c
      }
    });
  };

  public func buildAffiliateStats(
    clicks : List.List<Types.ReferralClick>,
    conversions : List.List<Types.ReferralConversion>,
    commissions : List.List<Types.CommissionEntry>,
    affiliateId : Principal,
  ) : Types.AffiliateStats {
    promoteReadyPayouts(commissions);

    let totalClicks = clicks.filter(func(c) { Principal.equal(c.affiliateId, affiliateId) }).size();
    let totalConversions = conversions.filter(func(c) { Principal.equal(c.affiliateId, affiliateId) }).size();

    let myCommissions = commissions.filter(func(c) { Principal.equal(c.affiliateId, affiliateId) });

    let pendingAmount = myCommissions
      .filter(func(c) { c.status == #pending })
      .foldLeft(0, func(acc, c) { acc + c.commissionAmount });

    let readyAmount = myCommissions
      .filter(func(c) { c.status == #ready })
      .foldLeft(0, func(acc, c) { acc + c.commissionAmount });

    let paidAmount = myCommissions
      .filter(func(c) { c.status == #paid })
      .foldLeft(0, func(acc, c) { acc + c.commissionAmount });

    {
      totalClicks = totalClicks;
      totalConversions = totalConversions;
      pendingAmount = pendingAmount;
      readyAmount = readyAmount;
      paidAmount = paidAmount;
      commissions = myCommissions.toArray();
    };
  };

  public func getFilteredPayouts(
    commissions : List.List<Types.CommissionEntry>,
    affiliateId : Principal,
    filter : Types.PayoutFilter,
  ) : [Types.CommissionEntry] {
    promoteReadyPayouts(commissions);
    let forAffiliate = commissions.filter(func(c) { Principal.equal(c.affiliateId, affiliateId) });
    switch (filter) {
      case (#all) forAffiliate.toArray();
      case (#pending) forAffiliate.filter(func(c) { c.status == #pending }).toArray();
      case (#ready) forAffiliate.filter(func(c) { c.status == #ready }).toArray();
      case (#paid) forAffiliate.filter(func(c) { c.status == #paid }).toArray();
    };
  };

  public func markPayoutPaid(
    commissions : List.List<Types.CommissionEntry>,
    commissionId : Text,
    _caller : Principal,
  ) : () {
    let now = Time.now();
    commissions.mapInPlace(func(c) {
      if (c.id == commissionId) {
        { c with status = #paid; paidAt = ?now }
      } else {
        c
      }
    });
  };

  // ── Pre-registration helpers ───────────────────────────────────

  // Checks whether an email is already pre-registered.
  public func isEmailPreRegistered(
    preRegisteredUsers : List.List<Types.PreRegisteredUser>,
    email : Text,
  ) : Bool {
    preRegisteredUsers.any(func(u) { u.email == email });
  };

  // Creates a new pre-registered user record.
  public func createPreRegisteredUser(
    preRegisteredUsers : List.List<Types.PreRegisteredUser>,
    name : Text,
    email : Text,
    phone : Text,
  ) : () {
    preRegisteredUsers.add({
      name = name;
      email = email;
      phone = phone;
      createdAt = Time.now();
    });
  };

  // Removes a pre-registered user record by email.
  // Returns true if a record was found and removed, false if no match.
  public func deletePreRegisteredUser(
    preRegisteredUsers : List.List<Types.PreRegisteredUser>,
    email : Text,
  ) : Bool {
    let idx = preRegisteredUsers.findIndex(func(u) { u.email == email });
    switch (idx) {
      case (?i) {
        let before = preRegisteredUsers.sliceToArray(0, i);
        let afterIdx : Int = i + 1;
        let sz : Int = preRegisteredUsers.size();
        let after = preRegisteredUsers.sliceToArray(afterIdx, sz);
        preRegisteredUsers.clear();
        for (u in before.values()) { preRegisteredUsers.add(u) };
        for (u in after.values()) { preRegisteredUsers.add(u) };
        true
      };
      case null { false };
    };
  };

  // ── User export ────────────────────────────────────────────

  /// Builds a flat UserExportRecord for a single principal by combining
  /// profile, subscription, acceptance, and affiliate data.
  public func buildUserExportRecord(
    principal : Principal,
    profiles : Map.Map<Principal, Common.UserProfile>,
    subscriptions : List.List<Common.UserSubscription>,
    acceptances : List.List<Common.UserAcceptance>,
    affiliates : Map.Map<Principal, Types.AffiliateProfile>,
    commissions : List.List<Types.CommissionEntry>,
  ) : Common.UserExportRecord {
    let profile = profiles.get(principal);
    let sub = subscriptions.find(func(s) { Principal.equal(s.principal, principal) });
    let acceptance = acceptances.find(func(a) { Principal.equal(a.principal, principal) });
    let affiliate = affiliates.get(principal);

    let myCommissions = commissions.filter(func(c) { Principal.equal(c.affiliateId, principal) });
    let totalCommissions = myCommissions
      .foldLeft(0, func(acc : Nat, c : Types.CommissionEntry) : Nat { acc + c.commissionAmount });
    let totalPayouts = myCommissions
      .filter(func(c) { c.status == #paid })
      .foldLeft(0, func(acc : Nat, c : Types.CommissionEntry) : Nat { acc + c.commissionAmount });
    let pendingPayouts = myCommissions
      .filter(func(c) { c.status == #pending or c.status == #ready })
      .foldLeft(0, func(acc : Nat, c : Types.CommissionEntry) : Nat { acc + c.commissionAmount });

    {
      principal = principal.toText();
      name = switch (profile) { case (?p) p.name; case null "" };
      companyName = switch (profile) { case (?p) p.companyName; case null "" };
      email = switch (profile) { case (?p) p.email; case null "" };
      phone = switch (profile) { case (?p) p.phone; case null "" };
      website = switch (profile) { case (?p) switch (p.website) { case (?w) w; case null "" }; case null "" };
      referredBy = switch (profile) { case (?p) switch (p.referredBy) { case (?r) r; case null "" }; case null "" };
      hearAboutUs = switch (profile) { case (?p) switch (p.hearAboutUs) { case (?h) h; case null "" }; case null "" };
      createdAt = switch (profile) { case (?p) p.createdAt; case null 0 };
      ipAddress = switch (acceptance) { case (?a) switch (a.ipAddress) { case (?ip) ip; case null "" }; case null "" };
      agreementAcceptedAt = switch (acceptance) { case (?a) ?a.acceptedAt; case null null };
      subscriptionTier = switch (sub) { case (?s) if (s.tier == "") "none" else s.tier; case null "none" };
      isPaid = switch (sub) { case (?s) s.isPaid; case null false };
      subscribedAt = switch (sub) { case (?s) ?s.subscribedAt; case null null };
      isAffiliate = switch (affiliate) { case (?_) true; case null false };
      referralCode = switch (affiliate) { case (?a) a.referralCode; case null "" };
      affiliateApproved = switch (affiliate) { case (?a) a.approved; case null false };
      totalCommissions = totalCommissions;
      totalPayouts = totalPayouts;
      pendingPayouts = pendingPayouts;
    }
  };

  // ── Admin: lead deletion ───────────────────────────────────────

  // Admin-only. Deletes all leads for every user. Returns total count deleted.
  public func adminDeleteAllLeads(
    leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
  ) : Nat {
    var total = 0;
    for ((_, userLeads) in leadsMap.entries()) {
      total += userLeads.size();
      userLeads.clear();
    };
    total
  };

  // Admin-only. Deletes all leads for a specific user principal. Returns count deleted.
  public func adminDeleteUserLeads(
    leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
    target : Principal,
  ) : Nat {
    switch (leadsMap.get(target)) {
      case null { 0 };
      case (?userLeads) {
        let count = userLeads.size();
        userLeads.clear();
        count
      };
    }
  };
  /// Enriches a list of CommissionEntry records with referred user profile details.
  /// Joins against the profiles map to get name/email/phone/biz.
  /// hasPurchased = true when the referred user has an active (isPaid) subscription.
  /// Falls back to empty string "" for any missing field.
  public func enrichCommissions(
    commissions : List.List<Types.CommissionEntry>,
    profiles : Map.Map<Principal, Common.UserProfile>,
    subscriptions : List.List<Common.UserSubscription>,
  ) : [Types.EnrichedCommissionEntry] {
    commissions.map<Types.CommissionEntry, Types.EnrichedCommissionEntry>(func(c) {
      let profile = profiles.get(c.newUserPrincipal);
      let sub = subscriptions.find(func(s) { Principal.equal(s.principal, c.newUserPrincipal) });
      let hasPurchased = switch (sub) { case (?s) s.isPaid; case null false };
      let statusText = switch (c.status) {
        case (#pending) "pending";
        case (#ready) "ready";
        case (#paid) "paid";
      };
      {
        affiliateId = c.affiliateId.toText();
        newUserPrincipal = c.newUserPrincipal.toText();
        commissionAmount = c.commissionAmount;
        status = statusText;
        referredName = switch (profile) { case (?p) p.name; case null "" };
        referredEmail = switch (profile) { case (?p) p.email; case null "" };
        referredPhone = switch (profile) { case (?p) p.phone; case null "" };
        referredBizName = switch (profile) { case (?p) p.companyName; case null "" };
        hasPurchased = hasPurchased;
      }
    }).toArray()
  };
};
