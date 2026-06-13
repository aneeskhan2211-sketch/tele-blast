import Types "../types/drip";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {

  // ─── Birthday Drip ────────────────────────────────────────────────

  /// Convert internal mutable BirthdayDripConfig to the shared immutable view.
  public func birthdayConfigToView(c : Types.BirthdayDripConfig) : Types.BirthdayDripConfigView {
    { id = c.id; templateBody = c.templateBody; isActive = c.isActive; createdAt = c.createdAt }
  };

  /// Create or replace the caller's birthday drip config.
  /// Always replaces the existing config if one exists (one config per user).
  public func setBirthdayConfig(
    store        : Map.Map<Principal, Types.BirthdayDripConfig>,
    caller       : Principal,
    templateBody : Text,
    isActive     : Bool,
  ) : Types.BirthdayDripConfigView {
    let now = Time.now();
    // Use a stable ID derived from the principal so it's idempotent.
    let id = caller.toText() # "-birthday-drip";
    switch (store.get(caller)) {
      case (?existing) {
        // Update the existing record in place.
        existing.isActive := isActive;
        // templateBody is immutable in the record; replace the whole entry.
        let updated : Types.BirthdayDripConfig = {
          id;
          templateBody;
          var isActive;
          createdAt = existing.createdAt;
        };
        store.add(caller, updated);
        birthdayConfigToView(updated)
      };
      case null {
        let cfg : Types.BirthdayDripConfig = {
          id;
          templateBody;
          var isActive;
          createdAt = now;
        };
        store.add(caller, cfg);
        birthdayConfigToView(cfg)
      };
    }
  };

  /// Get the caller's birthday drip config.  Returns #err if none is set.
  public func getBirthdayConfig(
    store  : Map.Map<Principal, Types.BirthdayDripConfig>,
    caller : Principal,
  ) : { #ok : Types.BirthdayDripConfigView; #err : Text } {
    switch (store.get(caller)) {
      case (?cfg) { #ok(birthdayConfigToView(cfg)) };
      case null   { #err("No birthday drip config found") };
    }
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────

  /// Convert internal mutable record to the shared immutable view.
  public func toView(c : Types.DripCampaign) : Types.DripCampaignView {
    {
      id           = c.id;
      name         = c.name;
      status       = c.statusMut;
      templateId   = c.templateId;
      templateBody = c.templateBody;
      leadIds      = c.leadIds;
      sentLeadIds  = c.sentLeadIds;
      failedLeadIds = c.failedLeadIds;
      createdAt    = c.createdAt;
      startedAt    = c.startedAt;
      completedAt  = c.completedAt;
      pausedAt     = c.pausedAt;
    }
  };

  /// Retrieve or create the per-user campaign list.
  func getUserCampaigns(
    store : Map.Map<Principal, List.List<Types.DripCampaign>>,
    user  : Principal,
  ) : List.List<Types.DripCampaign> {
    switch (store.get(user)) {
      case (?list) list;
      case null {
        let list = List.empty<Types.DripCampaign>();
        store.add(user, list);
        list;
      };
    }
  };

  // ─── CRUD ─────────────────────────────────────────────────────────────────

  public func createCampaign(
    store        : Map.Map<Principal, List.List<Types.DripCampaign>>,
    counter      : { var value : Nat },
    caller       : Principal,
    name         : Text,
    templateId   : Text,
    templateBody : Text,
    leadIds      : [Nat],
  ) : Types.DripCampaignView {
    let id = counter.value;
    counter.value += 1;
    let now = Time.now();
    let campaign : Types.DripCampaign = {
      id;
      name;
      status       = "running";
      templateId;
      templateBody;
      var leadIds      = leadIds;
      var sentLeadIds  = [];
      var failedLeadIds = [];
      createdAt    = now;
      var startedAt   = ?now;
      var completedAt = null;
      var pausedAt    = null;
      var statusMut   = "running";
    };
    let list = getUserCampaigns(store, caller);
    list.add(campaign);
    toView(campaign)
  };

  public func getCampaigns(
    store  : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller : Principal,
  ) : [Types.DripCampaignView] {
    let list = getUserCampaigns(store, caller);
    list.map<Types.DripCampaign, Types.DripCampaignView>(toView).toArray()
  };

  public func getCampaign(
    store  : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller : Principal,
    id     : Nat,
  ) : { #ok : Types.DripCampaignView; #err : Text } {
    let list = getUserCampaigns(store, caller);
    switch (list.find(func(c) { c.id == id })) {
      case (?c) #ok(toView(c));
      case null  #err("Campaign not found");
    }
  };

  public func pauseCampaign(
    store  : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller : Principal,
    id     : Nat,
  ) : { #ok : Types.DripCampaignView; #err : Text } {
    let list = getUserCampaigns(store, caller);
    switch (list.find(func(c) { c.id == id })) {
      case null  #err("Campaign not found");
      case (?c) {
        c.statusMut  := "paused";
        c.pausedAt   := ?Time.now();
        #ok(toView(c))
      };
    }
  };

  public func resumeCampaign(
    store  : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller : Principal,
    id     : Nat,
  ) : { #ok : Types.DripCampaignView; #err : Text } {
    let list = getUserCampaigns(store, caller);
    switch (list.find(func(c) { c.id == id })) {
      case null  #err("Campaign not found");
      case (?c) {
        c.statusMut := "running";
        c.pausedAt  := null;
        #ok(toView(c))
      };
    }
  };

  public func stopCampaign(
    store  : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller : Principal,
    id     : Nat,
  ) : { #ok : Types.DripCampaignView; #err : Text } {
    let list = getUserCampaigns(store, caller);
    switch (list.find(func(c) { c.id == id })) {
      case null  #err("Campaign not found");
      case (?c) {
        c.statusMut  := "stopped";
        c.completedAt := ?Time.now();
        #ok(toView(c))
      };
    }
  };

  public func markLeadSent(
    store      : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller     : Principal,
    campaignId : Nat,
    leadId     : Nat,
  ) : { #ok : Types.DripCampaignView; #err : Text } {
    let list = getUserCampaigns(store, caller);
    switch (list.find(func(c) { c.id == campaignId })) {
      case null  #err("Campaign not found");
      case (?c) {
        // Move leadId from leadIds → sentLeadIds
        c.leadIds     := c.leadIds.filter(func(lid) { lid != leadId });
        c.sentLeadIds := c.sentLeadIds.concat([leadId]);
        // Auto-complete when all leads are done (sent + failed covers all original)
        if (c.leadIds.size() == 0) {
          c.statusMut   := "completed";
          c.completedAt := ?Time.now();
        };
        #ok(toView(c))
      };
    }
  };

  public func markLeadFailed(
    store      : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller     : Principal,
    campaignId : Nat,
    leadId     : Nat,
  ) : { #ok : Types.DripCampaignView; #err : Text } {
    let list = getUserCampaigns(store, caller);
    switch (list.find(func(c) { c.id == campaignId })) {
      case null  #err("Campaign not found");
      case (?c) {
        // Move leadId from leadIds → failedLeadIds
        c.leadIds      := c.leadIds.filter(func(lid) { lid != leadId });
        c.failedLeadIds := c.failedLeadIds.concat([leadId]);
        // Auto-complete when no remaining leads
        if (c.leadIds.size() == 0) {
          c.statusMut   := "completed";
          c.completedAt := ?Time.now();
        };
        #ok(toView(c))
      };
    }
  };

  public func deleteCampaign(
    store  : Map.Map<Principal, List.List<Types.DripCampaign>>,
    caller : Principal,
    id     : Nat,
  ) : { #ok : Bool; #err : Text } {
    let list = getUserCampaigns(store, caller);
    let before = list.size();
    list.mapInPlace(func(c) { c }); // no-op ensures list is initialised
    // Filter out the target campaign by rebuilding the list in-place via a size check trick.
    // We use a mutable found flag and remove via index instead.
    switch (list.findIndex(func(c) { c.id == id })) {
      case null  #err("Campaign not found");
      case (?_idx) {
        // Rebuild list without the target element
        let arr = list.toArray();
        list.clear();
        arr.forEach(func(c) {
          if (c.id != id) { list.add(c) };
        });
        ignore before; // suppress unused warning
        #ok(true)
      };
    }
  };
};
