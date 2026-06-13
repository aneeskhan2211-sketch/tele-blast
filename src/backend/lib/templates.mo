import Types "../types/templates";
import LeadTypes "../types/leads";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {

  // ── Per-user helpers ─────────────────────────────────────────────

  func getUserEmailTemplates(
    emailMap : Map.Map<Principal, List.List<Types.EmailTemplate>>,
    caller : Principal,
  ) : List.List<Types.EmailTemplate> {
    switch (emailMap.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<Types.EmailTemplate>();
        emailMap.add(caller, list);
        list
      };
    }
  };

  func getUserSmsTemplates(
    smsMap : Map.Map<Principal, List.List<Types.SmsTemplate>>,
    caller : Principal,
  ) : List.List<Types.SmsTemplate> {
    switch (smsMap.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<Types.SmsTemplate>();
        smsMap.add(caller, list);
        list
      };
    }
  };

  // ── Email Templates ──────────────────────────────────────────────

  public func getEmailTemplates(
    emailMap : Map.Map<Principal, List.List<Types.EmailTemplate>>,
    caller : Principal,
  ) : [Types.EmailTemplate] {
    getUserEmailTemplates(emailMap, caller).toArray()
  };

  public func addEmailTemplate(
    emailMap : Map.Map<Principal, List.List<Types.EmailTemplate>>,
    caller : Principal,
    name : Text,
    subject : Text,
    body : Text,
  ) : Text {
    let now = Time.now();
    let id = "et-" # now.toText();
    getUserEmailTemplates(emailMap, caller).add({ id; name; subject; body; createdAt = now });
    id
  };

  public func updateEmailTemplate(
    emailMap : Map.Map<Principal, List.List<Types.EmailTemplate>>,
    caller : Principal,
    id : Text,
    name : ?Text,
    subject : ?Text,
    body : ?Text,
  ) : Bool {
    let userTemplates = getUserEmailTemplates(emailMap, caller);
    let idx = userTemplates.findIndex(func(t : Types.EmailTemplate) : Bool { t.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = userTemplates.at(i);
        userTemplates.put(i, {
          existing with
          name = switch (name) { case (?v) v; case null existing.name };
          subject = switch (subject) { case (?v) v; case null existing.subject };
          body = switch (body) { case (?v) v; case null existing.body };
        });
        true
      };
    }
  };

  public func deleteEmailTemplate(
    emailMap : Map.Map<Principal, List.List<Types.EmailTemplate>>,
    caller : Principal,
    id : Text,
  ) : Bool {
    let userTemplates = getUserEmailTemplates(emailMap, caller);
    let exists = userTemplates.find(func(t : Types.EmailTemplate) : Bool { t.id == id }) != null;
    if (not exists) return false;
    let kept = userTemplates.filter(func(t : Types.EmailTemplate) : Bool { t.id != id });
    userTemplates.clear();
    userTemplates.append(kept);
    true
  };

  // ── SMS Templates ────────────────────────────────────────────────

  public func getSmsTemplates(
    smsMap : Map.Map<Principal, List.List<Types.SmsTemplate>>,
    caller : Principal,
  ) : [Types.SmsTemplate] {
    getUserSmsTemplates(smsMap, caller).toArray()
  };

  public func addSmsTemplate(
    smsMap : Map.Map<Principal, List.List<Types.SmsTemplate>>,
    caller : Principal,
    name : Text,
    body : Text,
  ) : Text {
    let now = Time.now();
    let id = "st-" # now.toText();
    getUserSmsTemplates(smsMap, caller).add({ id; name; body; createdAt = now });
    id
  };

  public func updateSmsTemplate(
    smsMap : Map.Map<Principal, List.List<Types.SmsTemplate>>,
    caller : Principal,
    id : Text,
    name : ?Text,
    body : ?Text,
  ) : Bool {
    let userTemplates = getUserSmsTemplates(smsMap, caller);
    let idx = userTemplates.findIndex(func(t : Types.SmsTemplate) : Bool { t.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = userTemplates.at(i);
        userTemplates.put(i, {
          existing with
          name = switch (name) { case (?v) v; case null existing.name };
          body = switch (body) { case (?v) v; case null existing.body };
        });
        true
      };
    }
  };

  public func deleteSmsTemplate(
    smsMap : Map.Map<Principal, List.List<Types.SmsTemplate>>,
    caller : Principal,
    id : Text,
  ) : Bool {
    let userTemplates = getUserSmsTemplates(smsMap, caller);
    let exists = userTemplates.find(func(t : Types.SmsTemplate) : Bool { t.id == id }) != null;
    if (not exists) return false;
    let kept = userTemplates.filter(func(t : Types.SmsTemplate) : Bool { t.id != id });
    userTemplates.clear();
    userTemplates.append(kept);
    true
  };

  // ── Email History ────────────────────────────────────────────────

  public func addEmailRecord(
    leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
    caller : Principal,
    leadId : Nat,
    timestamp : Int,
  ) : { #ok; #err : Text } {
    let userLeads = switch (leadsMap.get(caller)) {
      case (?list) list;
      case null { return #err("Lead not found") };
    };
    let idx = userLeads.findIndex(func(l : LeadTypes.Lead) : Bool { l.id == leadId });
    switch (idx) {
      case null { #err("Lead not found") };
      case (?i) {
        let existing = userLeads.at(i);
        if (existing.isDnc) return #err("This lead is on the Do Not Call list and cannot be contacted.");
        let record : Types.EmailRecord = { id = "er-" # timestamp.toText(); timestamp };
        let updated : LeadTypes.Lead = { existing with emailHistory = existing.emailHistory.concat([record]) };
        userLeads.put(i, updated);
        #ok
      };
    }
  };
};
