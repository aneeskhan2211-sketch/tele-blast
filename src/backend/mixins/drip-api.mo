import DripTypes "../types/drip";
import Common "../types/common";
import DripLib "../lib/drip";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  dripStore          : Map.Map<Principal, List.List<DripTypes.DripCampaign>>,
  dripCounter        : { var value : Nat },
  birthdayDripStore  : Map.Map<Principal, DripTypes.BirthdayDripConfig>,
  subscriptions      : List.List<Common.UserSubscription>,
) {

  // ─── Drip Campaigns ──────────────────────────────────────────────

  /// Create a new drip campaign for the calling user.
  /// Status starts as "running" and startedAt is set to now.
  public shared ({ caller }) func createDripCampaign(
    name         : Text,
    templateId   : Text,
    templateBody : Text,
    leadIds      : [Nat],
  ) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    let view = DripLib.createCampaign(
      dripStore, dripCounter, caller, name, templateId, templateBody, leadIds
    );
    #ok(view)
  };

  /// Return all drip campaigns belonging to the calling user.
  public shared query ({ caller }) func getDripCampaigns() : async [DripTypes.DripCampaignView] {
    DripLib.getCampaigns(dripStore, caller)
  };

  /// Return a single campaign by id for the calling user.
  public shared query ({ caller }) func getDripCampaign(id : Nat) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    DripLib.getCampaign(dripStore, caller, id)
  };

  /// Pause a running campaign.  Sets status → "paused" and records pausedAt.
  public shared ({ caller }) func pauseDripCampaign(id : Nat) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    DripLib.pauseCampaign(dripStore, caller, id)
  };

  /// Resume a paused campaign.  Sets status → "running" and clears pausedAt.
  public shared ({ caller }) func resumeDripCampaign(id : Nat) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    DripLib.resumeCampaign(dripStore, caller, id)
  };

  /// Permanently stop a campaign.  Sets status → "stopped" and records completedAt.
  public shared ({ caller }) func stopDripCampaign(id : Nat) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    DripLib.stopCampaign(dripStore, caller, id)
  };

  /// Mark a lead as successfully sent.
  /// Moves leadId from leadIds → sentLeadIds.
  /// If no leads remain in leadIds, the campaign auto-transitions to "completed".
  public shared ({ caller }) func markLeadSent(
    campaignId : Nat,
    leadId     : Nat,
  ) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    DripLib.markLeadSent(dripStore, caller, campaignId, leadId)
  };

  /// Mark a lead as failed.
  /// Moves leadId from leadIds → failedLeadIds.
  /// If no leads remain in leadIds, the campaign auto-transitions to "completed".
  public shared ({ caller }) func markLeadFailed(
    campaignId : Nat,
    leadId     : Nat,
  ) : async { #ok : DripTypes.DripCampaignView; #err : Text } {
    DripLib.markLeadFailed(dripStore, caller, campaignId, leadId)
  };

  /// Delete a campaign permanently.  Returns #ok(true) on success.
  public shared ({ caller }) func deleteDripCampaign(id : Nat) : async { #ok : Bool; #err : Text } {
    DripLib.deleteCampaign(dripStore, caller, id)
  };

  // ─── Birthday Drip ────────────────────────────────────────────────

  /// Create or update the calling user's birthday drip configuration.
  /// Only one config per user — calling again overwrites the previous one.
  public shared ({ caller }) func setBirthdayDripConfig(
    templateBody : Text,
    isActive     : Bool,
  ) : async { #ok : Text; #err : Text } {
    ignore DripLib.setBirthdayConfig(birthdayDripStore, caller, templateBody, isActive);
    #ok("Birthday drip config saved")
  };

  /// Return the calling user's birthday drip configuration.
  /// Returns #err if no config has been set yet.
  public shared query ({ caller }) func getBirthdayDripConfig()
    : async { #ok : DripTypes.BirthdayDripConfigView; #err : Text } {
    DripLib.getBirthdayConfig(birthdayDripStore, caller)
  };

  // ─── SMS Spin ─────────────────────────────────────────────────────

  /// SMS spin is an AI feature not available in the $30 Pro plan.
  /// Returns an error explaining the feature is unavailable.
  public shared ({ caller }) func spinSms(
    _originalMessage : Text,
    _numVersions     : Nat,
  ) : async { #ok : [Text]; #err : Text } {
    #err("SMS spin is not available in the $30 Pro plan.")
  };
};
