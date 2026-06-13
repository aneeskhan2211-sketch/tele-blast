import Types "types/leads";
import TemplateTypes "types/templates";
import Common "types/common";
import AdminAffiliateTypes "types/admin-affiliate";
import LeadsMixin "mixins/leads-api";
import TemplatesMixin "mixins/templates-api";
import LiabilityMixin "mixins/liability-api";
import SubscriptionMixin "mixins/subscription-api";
import ProfileMixin "mixins/profile-api";
import ColdCallConfigMixin "mixins/cold-call-config-api";
import AdminAffiliateMixin "mixins/admin-affiliate-api";
import DripMixin "mixins/drip-api";
import DripTypes "types/drip";
import AdminLib "lib/admin-affiliate";


import List "mo:core/List";
import Map  "mo:core/Map";
import Principal "mo:core/Principal";
import EmailClient "mo:caffeineai-email/emailClient";






actor {

  // ── Per-user data (Principal-keyed) ─────────────────────────────
  let leadsMap = Map.empty<Principal, List.List<Types.Lead>>();
  let pipelinesMap = Map.empty<Principal, List.List<Types.Pipeline>>();
  let emailMap = Map.empty<Principal, List.List<TemplateTypes.EmailTemplate>>();
  let smsMap = Map.empty<Principal, List.List<TemplateTypes.SmsTemplate>>();

  // ── Global counter (lead IDs are globally unique) ───────────────────
  let counter = { var value : Nat = 1 };

  // ── Shared / global state ─────────────────────────────────────
  let acceptances = List.empty<Common.UserAcceptance>();
  let subscriptions = List.empty<Common.UserSubscription>();
  let profiles = Map.empty<Principal, Common.UserProfile>();
  let coldCallConfigs = Map.empty<Principal, Common.ColdCallScriptConfig>();

  let admins = List.empty<AdminAffiliateTypes.AdminUser>();
  let affiliates = Map.empty<Principal, AdminAffiliateTypes.AffiliateProfile>();
  let referralClicks = List.empty<AdminAffiliateTypes.ReferralClick>();
  let referralConversions = List.empty<AdminAffiliateTypes.ReferralConversion>();
  let commissions = List.empty<AdminAffiliateTypes.CommissionEntry>();
  let revokedAccess = List.empty<AdminAffiliateTypes.FeatureAccessRecord>();

  let sampleBusinesses : [Types.SampleBusiness] = [];

  // ── Drip campaign state ──────────────────────────────────────
  let dripStore   = Map.empty<Principal, List.List<DripTypes.DripCampaign>>();
  let dripCounter = { var value : Nat = 1 };
  // Birthday drip: one config per user
  let birthdayDripStore = Map.empty<Principal, DripTypes.BirthdayDripConfig>();

  // ── Package visibility config ──────────────────────────────────
  // Stores enabled/disabled flag for the $30 Pro plan on the landing page.
  let packageConfigs = List.empty<Common.PackageConfig>();

  // ── Pre-registered users ──────────────────────────────────────
  // Admin can pre-register users by name/email/phone before they sign in.
  let preRegisteredUsers = List.empty<AdminAffiliateTypes.PreRegisteredUser>();

  // ── Admin user cache (pre-built, write-on-change) ──────────────
  // Written at signup/subscription/preRegistration; read directly by getAllUsers.
  // Survives upgrades via enhanced orthogonal persistence.
  let adminUserCache = Map.empty<Principal, AdminAffiliateTypes.UserAdminView>();

  // ── Coming-Soon teaser flag ──────────────────────────────────
  let showComingSoonTeaserRef = { var value : Bool = false };

  // Admin-only: set whether a teaser section is shown on the landing page.
  public shared ({ caller }) func setShowComingSoonTeaser(show : Bool) : async { #ok : Text; #err : Text } {
    let noAdmins = admins.size() == 0;
    if (not noAdmins and not AdminLib.isAdminPrincipal(admins, caller)) {
      return #err("Not authorized: admin access required");
    };
    showComingSoonTeaserRef.value := show;
    #ok("Coming soon teaser setting saved")
  };

  // Public query: returns whether the teaser section is enabled.
  public query func getShowComingSoonTeaser() : async Bool {
    showComingSoonTeaserRef.value
  };

  // ── Support contact form ────────────────────────────────────
  // Public: anyone can submit a support request — no auth required.
  public func sendSupportContactEmail(name : Text, email : Text, issue : Text) : async { #ok; #err : Text } {
    let subject = "Support Request from Tele-Blast";
    let htmlBody = "<h2>Support Request</h2>"
      # "<p><strong>Name:</strong> " # name # "</p>"
      # "<p><strong>Email on Account:</strong> " # email # "</p>"
      # "<p><strong>Issue:</strong></p>"
      # "<p>" # issue # "</p>";
    switch (await EmailClient.sendServiceEmail("support", ["ppc.livecontactleads@gmail.com"], subject, htmlBody)) {
      case (#ok) { #ok };
      case (#err(msg)) { #err(msg) };
    };
  };

  include LeadsMixin(leadsMap, pipelinesMap, sampleBusinesses, counter);
  include TemplatesMixin(emailMap, smsMap, leadsMap);
  include LiabilityMixin(acceptances);
  include SubscriptionMixin(subscriptions, affiliates, profiles, adminUserCache, admins, revokedAccess, acceptances);
  include ProfileMixin(profiles, adminUserCache, subscriptions, admins, revokedAccess, acceptances);
  include ColdCallConfigMixin(coldCallConfigs);
  include AdminAffiliateMixin(admins, affiliates, referralClicks, referralConversions, commissions, revokedAccess, profiles, subscriptions, leadsMap, packageConfigs, acceptances, preRegisteredUsers, adminUserCache);
  include DripMixin(dripStore, dripCounter, birthdayDripStore, subscriptions);
};
