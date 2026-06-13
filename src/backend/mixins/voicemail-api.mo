import VoicemailTypes "../types/voicemail";
import LeadTypes      "../types/leads";
import VoicemailLib   "../lib/voicemail";
import List "mo:core/List";
import Map  "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  voicemailMap : Map.Map<Principal, VoicemailTypes.VoicemailPreference>,
  leadsMap     : Map.Map<Principal, List.List<LeadTypes.Lead>>,
) {
  /// Save (or replace) the caller's voicemail recording reference.
  /// The actual audio file must be uploaded via object-storage from the frontend;
  /// only the resulting URL and a display name are stored here.
  public shared ({ caller }) func saveVoicemailPreference(
    recordingUrl  : Text,
    recordingName : Text,
  ) : async () {
    VoicemailLib.saveVoicemailPreference(voicemailMap, caller, recordingUrl, recordingName);
  };

  /// Return the caller's saved voicemail preference, or null if none is saved.
  public shared query ({ caller }) func getVoicemailPreference() : async ?VoicemailTypes.VoicemailPreference {
    VoicemailLib.getVoicemailPreference(voicemailMap, caller)
  };

  /// Remove the caller's saved voicemail preference.
  public shared ({ caller }) func deleteVoicemailPreference() : async () {
    VoicemailLib.deleteVoicemailPreference(voicemailMap, caller);
  };

  /// Append a voicemail-drop record to a lead's call history.
  /// `leadId` is the string representation of the lead's Nat ID.
  /// `note`   is an optional human-readable note (pass "" to omit).
  public shared ({ caller }) func logVoicemailDrop(
    leadId : Text,
    note   : Text,
  ) : async { #ok; #err : Text } {
    VoicemailLib.logVoicemailDrop(leadsMap, caller, leadId, note)
  };
};
