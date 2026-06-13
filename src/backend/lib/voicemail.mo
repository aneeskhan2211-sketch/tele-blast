import VoicemailTypes "../types/voicemail";
import LeadTypes      "../types/leads";
import List "mo:core/List";
import Map  "mo:core/Map";
import Nat  "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {

  // ── Voicemail preference CRUD ─────────────────────────────────────

  public func saveVoicemailPreference(
    voicemailMap  : Map.Map<Principal, VoicemailTypes.VoicemailPreference>,
    caller        : Principal,
    recordingUrl  : Text,
    recordingName : Text,
  ) {
    voicemailMap.add(caller, {
      recordingUrl;
      recordingName;
      savedAt = Time.now();
    });
  };

  public func getVoicemailPreference(
    voicemailMap : Map.Map<Principal, VoicemailTypes.VoicemailPreference>,
    caller       : Principal,
  ) : ?VoicemailTypes.VoicemailPreference {
    voicemailMap.get(caller)
  };

  public func deleteVoicemailPreference(
    voicemailMap : Map.Map<Principal, VoicemailTypes.VoicemailPreference>,
    caller       : Principal,
  ) {
    voicemailMap.remove(caller);
  };

  // ── Voicemail drop logging ────────────────────────────────────────

  /// Appends a system note to the lead's callHistory indicating a voicemail
  /// was dropped.  The note is stored as a CallRecord with outcome = #leftVoicemail
  /// and a disposition string describing the drop.
  public func logVoicemailDrop(
    leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
    caller   : Principal,
    leadId   : Text,
    note     : Text,
  ) : { #ok; #err : Text } {
    let maybeLeads = leadsMap.get(caller);
    let userLeads = switch (maybeLeads) {
      case (?list) list;
      case null    { return #err("Lead not found") };
    };

    let parsedId : Nat = switch (Nat.fromText(leadId)) {
      case (?n) n;
      case null { return #err("Invalid lead ID") };
    };

    let idx = userLeads.findIndex(func(l) { l.id == parsedId });
    switch (idx) {
      case null { #err("Lead not found") };
      case (?i) {
        let existing = userLeads.at(i);
        let disposition : ?Text = if (note == "") null else ?note;
        let record : LeadTypes.CallRecord = {
          timestamp   = Time.now();
          outcome     = #leftVoicemail;
          disposition;
        };
        let updated : LeadTypes.Lead = {
          existing with
          callHistory = existing.callHistory.concat([record]);
        };
        userLeads.put(i, updated);
        #ok
      };
    }
  };
};
