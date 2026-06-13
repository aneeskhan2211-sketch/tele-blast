import Types "../types/leads";
import Templates "../types/templates";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {

  // ── Per-user helpers ─────────────────────────────────────────────

  func getUserLeads(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
  ) : List.List<Types.Lead> {
    switch (leadsMap.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<Types.Lead>();
        leadsMap.add(caller, list);
        list
      };
    }
  };

  func getUserPipelines(
    pipelinesMap : Map.Map<Principal, List.List<Types.Pipeline>>,
    caller : Principal,
  ) : List.List<Types.Pipeline> {
    switch (pipelinesMap.get(caller)) {
      case (?list) list;
      case null {
        let list = List.empty<Types.Pipeline>();
        pipelinesMap.add(caller, list);
        list
      };
    }
  };

  // ── Lead CRUD ────────────────────────────────────────────────────

  public func getLeads(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
  ) : [Types.Lead] {
    getUserLeads(leadsMap, caller).toArray()
  };

  public func getLead(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    id : Nat,
  ) : ?Types.Lead {
    getUserLeads(leadsMap, caller).find(func(l) { l.id == id })
  };

  public func addLead(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    counter : { var value : Nat },
    input : Types.LeadInput,
    isImported : Bool,
  ) : Nat {
    let id = counter.value;
    counter.value += 1;
    let lead : Types.Lead = {
      id;
      firstName = input.firstName;
      lastName = input.lastName;
      name = input.name;
      industry = input.industry;
      phone = input.phone;
      email = input.email;
      address = input.address;
      city = input.city;
      state = input.state;
      revenueRange = input.revenueRange;
      yearsInBusiness = input.yearsInBusiness;
      pipelineStage = input.pipelineStage;
      pipelineId = input.pipelineId;
      notes = input.notes;
      followUpDate = input.followUpDate;
      birthday = input.birthday;
      qualificationTags = input.qualificationTags;
      isImported;
      isDnc = switch (input.isDnc) { case (?v) v; case null false };
      createdAt = Time.now();
      callHistory = [];
      textHistory = [];
      emailHistory = [];
      aiResearch = null;
      isNewLeadQueued = false;
    };
    getUserLeads(leadsMap, caller).add(lead);
    id
  };

  public func updateLead(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    id : Nat,
    updates : Types.LeadUpdate,
  ) : Bool {
    let userLeads = getUserLeads(leadsMap, caller);
    let idx = userLeads.findIndex(func(l) { l.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = userLeads.at(i);
        let updated : Types.Lead = {
          existing with
          firstName = switch (updates.firstName) { case (?v) ?v; case null existing.firstName };
          lastName = switch (updates.lastName) { case (?v) ?v; case null existing.lastName };
          name = switch (updates.name) { case (?v) v; case null existing.name };
          industry = switch (updates.industry) { case (?v) v; case null existing.industry };
          phone = switch (updates.phone) { case (?v) v; case null existing.phone };
          email = switch (updates.email) { case (?v) v; case null existing.email };
          address = switch (updates.address) { case (?v) v; case null existing.address };
          city = switch (updates.city) { case (?v) v; case null existing.city };
          state = switch (updates.state) { case (?v) v; case null existing.state };
          revenueRange = switch (updates.revenueRange) { case (?v) v; case null existing.revenueRange };
          yearsInBusiness = switch (updates.yearsInBusiness) { case (?v) v; case null existing.yearsInBusiness };
          pipelineStage = switch (updates.pipelineStage) { case (?v) v; case null existing.pipelineStage };
          pipelineId = switch (updates.pipelineId) { case (?v) ?v; case null existing.pipelineId };
          notes = switch (updates.notes) { case (?v) v; case null existing.notes };
          followUpDate = switch (updates.followUpDate) { case (?v) ?v; case null existing.followUpDate };
          birthday = switch (updates.birthday) { case (?v) ?v; case null existing.birthday };
          qualificationTags = switch (updates.qualificationTags) { case (?v) v; case null existing.qualificationTags };
          isDnc = switch (updates.isDnc) { case (?v) v; case null existing.isDnc };
        };
        userLeads.put(i, updated);
        true
      };
    }
  };

  public func deleteLead(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    id : Nat,
  ) : Bool {
    let userLeads = getUserLeads(leadsMap, caller);
    let exists = userLeads.find(func(l) { l.id == id }) != null;
    if (not exists) return false;
    let kept = userLeads.filter(func(l) { l.id != id });
    userLeads.clear();
    userLeads.append(kept);
    true
  };

  public func importSampleBusiness(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    sampleBusinesses : [Types.SampleBusiness],
    sampleId : Nat,
    counter : { var value : Nat },
  ) : ?Nat {
    let found = sampleBusinesses.find(func(s : Types.SampleBusiness) : Bool { s.id == sampleId });
    switch (found) {
      case null { null };
      case (?s) {
        let input : Types.LeadInput = {
          firstName = null;
          lastName = null;
          name = s.name;
          industry = s.industry;
          phone = s.phone;
          email = s.email;
          address = s.address;
          city = s.city;
          state = s.state;
          revenueRange = s.revenueRange;
          yearsInBusiness = s.yearsInBusiness;
          pipelineStage = #Prospect;
          pipelineId = null;
          notes = "";
          followUpDate = null;
          birthday = null;
          qualificationTags = [];
          isDnc = null;
        };
        let id = addLead(leadsMap, caller, counter, input, true);
        ?id
      };
    }
  };

  // Split a "First Last" contact name string into (firstName, lastName).
  // Returns (null, null) when the input is blank.
  // Uses Text.split on space, taking first token as firstName and rejoining
  // any remaining tokens as lastName to handle multi-word last names.
  func splitContactName(contactName : Text) : (?Text, ?Text) {
    if (contactName == "") return (null, null);
    let parts = contactName.split(#char ' ');
    var first : ?Text = null;
    let rest = List.empty<Text>();
    var isFirstToken = true;
    for (token in parts) {
      if (isFirstToken) {
        if (token != "") { first := ?(token) };
        isFirstToken := false;
      } else {
        if (token != "") { rest.add(token) };
      }
    };
    let lastName : ?Text = if (rest.size() == 0) null
      else ?(rest.toArray().values().join(" "));
    (first, lastName)
  };

  public func bulkImportLeads(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    counter : { var value : Nat },
    csvLeads : [Types.CsvLeadInput],
    stage : Types.PipelineStage,
    pipelineId : ?Nat,
  ) : [Nat] {
    let ids = List.empty<Nat>();
    // Cap at 500 records — only process the first 500 entries
    let limit = if (csvLeads.size() > 500) 500 else csvLeads.size();
    var i = 0;
    while (i < limit) {
      let row = csvLeads[i];
      i := i + 1;
      if (not (row.name == "" and row.contactName == "")) {
        let (firstName, lastName) = splitContactName(row.contactName);
        let input : Types.LeadInput = {
          firstName;
          lastName;
          name = if (row.name != "") row.name else row.contactName;
          industry = switch (row.industry) { case (?v) if (v != "") v else "Other"; case null "Other" };
          phone = row.phone;
          email = row.email;
          address = row.address;
          city = switch (row.city) { case (?v) v; case null "" };
          state = switch (row.state) { case (?v) v; case null "" };
          revenueRange = "";
          yearsInBusiness = 0;
          pipelineStage = stage;
          pipelineId;
          notes = if (row.contactName == "" or row.name != "") { row.notes } else {
            if (row.notes == "") "" else row.notes
          };
          followUpDate = null;
          birthday = row.birthday;
          qualificationTags = [];
          isDnc = null;
        };
        let id = addLead(leadsMap, caller, counter, input, true);
        ids.add(id);
      };
    };
    ids.toArray()
  };

  public func getDashboardStats(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    pipelineId : ?Nat,
  ) : Types.DashboardStats {
    let userLeads = getUserLeads(leadsMap, caller);
    var prospects = 0;
    var contacted = 0;
    var qualified = 0;
    var closedWon = 0;
    var closedLost = 0;

    userLeads.forEach(func(l) {
      let matchesPipeline = switch (pipelineId) {
        case null { true };
        case (?pid) {
          switch (l.pipelineId) {
            case (?lpid) { lpid == pid };
            case null { false };
          }
        };
      };
      if (matchesPipeline) {
        switch (l.pipelineStage) {
          case (#Prospect) { prospects += 1 };
          case (#Contacted) { contacted += 1 };
          case (#Qualified) { qualified += 1 };
          case (#ClosedWon) { closedWon += 1 };
          case (#ClosedLost) { closedLost += 1 };
        }
      }
    });

    let allLeadsArr = userLeads.toArray();
    let size = allLeadsArr.size();
    let recentLeads = if (size == 0) {
      []
    } else {
      let start = if (size > 5) (size - 5 : Nat) else 0;
      allLeadsArr.sliceToArray(start, size)
    };

    {
      prospects;
      contacted;
      qualified;
      closedWon;
      closedLost;
      recentLeads;
    }
  };

  public func addCallRecord(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    leadId : Nat,
    outcome : Types.CallOutcome,
  ) : { #ok; #err : Text } {
    let userLeads = getUserLeads(leadsMap, caller);
    let idx = userLeads.findIndex(func(l) { l.id == leadId });
    switch (idx) {
      case null { #err("Lead not found") };
      case (?i) {
        let existing = userLeads.at(i);
        if (existing.isDnc) return #err("This lead is on the Do Not Call list and cannot be contacted.");
        let record : Types.CallRecord = { timestamp = Time.now(); outcome; disposition = null };
        let updated : Types.Lead = { existing with callHistory = existing.callHistory.concat([record]) };
        userLeads.put(i, updated);
        #ok
      };
    }
  };

  public func addTextRecord(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    leadId : Nat,
    messageBody : Text,
  ) : { #ok; #err : Text } {
    let userLeads = getUserLeads(leadsMap, caller);
    let idx = userLeads.findIndex(func(l) { l.id == leadId });
    switch (idx) {
      case null { #err("Lead not found") };
      case (?i) {
        let existing = userLeads.at(i);
        if (existing.isDnc) return #err("This lead is on the Do Not Call list and cannot be contacted.");
        let record : Types.TextRecord = { timestamp = Time.now(); messageBody; disposition = null };
        let updated : Types.Lead = { existing with textHistory = existing.textHistory.concat([record]) };
        userLeads.put(i, updated);
        #ok
      };
    }
  };

  public func addEmailRecord(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    leadId : Nat,
    templateId : Text,
  ) : { #ok; #err : Text } {
    let userLeads = getUserLeads(leadsMap, caller);
    let idx = userLeads.findIndex(func(l) { l.id == leadId });
    switch (idx) {
      case null { #err("Lead not found") };
      case (?i) {
        let existing = userLeads.at(i);
        if (existing.isDnc) return #err("This lead is on the Do Not Call list and cannot be contacted.");
        let record : Templates.EmailRecord = { id = templateId; timestamp = Time.now() };
        let updated : Types.Lead = { existing with emailHistory = existing.emailHistory.concat([record]) };
        userLeads.put(i, updated);
        #ok
      };
    }
  };

  public func updateLeadDnc(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    leadId : Nat,
    isDnc : Bool,
  ) : { #ok : Types.Lead; #err : Text } {
    let userLeads = getUserLeads(leadsMap, caller);
    let idx = userLeads.findIndex(func(l) { l.id == leadId });
    switch (idx) {
      case null { #err("Lead not found") };
      case (?i) {
        let existing = userLeads.at(i);
        let updated : Types.Lead = { existing with isDnc };
        userLeads.put(i, updated);
        #ok(updated)
      };
    }
  };

  public func bulkDeleteLeads(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    ids : [Nat],
  ) : Nat {
    let userLeads = getUserLeads(leadsMap, caller);
    let idSet = ids;
    var deleted = 0;
    userLeads.forEach(func(l) {
      if (idSet.find(func(id : Nat) : Bool { id == l.id }) != null) {
        deleted += 1;
      }
    });
    let kept = userLeads.filter(func(l) {
      idSet.find(func(id : Nat) : Bool { id == l.id }) == null
    });
    userLeads.clear();
    userLeads.append(kept);
    deleted
  };

  // Returns all leads that have isNewLeadQueued = true.
  // Used by the New Lead Queue to surface unreviewed form submissions.
  public func getNewLeadQueue(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
  ) : [Types.Lead] {
    getUserLeads(leadsMap, caller).filter(func(l) { l.isNewLeadQueued }).toArray()
  };

  // Mark a lead as reviewed (removes it from the New Lead Queue).
  public func clearNewLeadQueued(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    leadId : Nat,
  ) : Bool {
    let userLeads = getUserLeads(leadsMap, caller);
    let idx = userLeads.findIndex(func(l) { l.id == leadId });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = userLeads.at(i);
        userLeads.put(i, { existing with isNewLeadQueued = false });
        true
      };
    }
  };
  public func getBirthdayLeads(
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
  ) : [Types.Lead] {
    getUserLeads(leadsMap, caller).filter(func(l) {
      switch (l.birthday) {
        case (?b) { b != "" };
        case null { false };
      }
    }).toArray()
  };

  // ── Pipeline CRUD ────────────────────────────────────────────────

  public func getPipelines(
    pipelinesMap : Map.Map<Principal, List.List<Types.Pipeline>>,
    caller : Principal,
  ) : [Types.Pipeline] {
    getUserPipelines(pipelinesMap, caller).toArray()
  };

  public func createPipeline(
    pipelinesMap : Map.Map<Principal, List.List<Types.Pipeline>>,
    caller : Principal,
    counter : { var value : Nat },
    name : Text,
  ) : Types.Pipeline {
    let id = counter.value;
    counter.value += 1;
    let pipeline : Types.Pipeline = { id; name; createdAt = Time.now() };
    getUserPipelines(pipelinesMap, caller).add(pipeline);
    pipeline
  };

  public func updatePipeline(
    pipelinesMap : Map.Map<Principal, List.List<Types.Pipeline>>,
    caller : Principal,
    id : Nat,
    name : Text,
  ) : Bool {
    let userPipelines = getUserPipelines(pipelinesMap, caller);
    let idx = userPipelines.findIndex(func(p) { p.id == id });
    switch (idx) {
      case null { false };
      case (?i) {
        let existing = userPipelines.at(i);
        userPipelines.put(i, { existing with name });
        true
      };
    }
  };

  public func deletePipeline(
    pipelinesMap : Map.Map<Principal, List.List<Types.Pipeline>>,
    leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
    caller : Principal,
    id : Nat,
  ) : Bool {
    let userPipelines = getUserPipelines(pipelinesMap, caller);
    let exists = userPipelines.find(func(p) { p.id == id }) != null;
    if (not exists) return false;

    // Remove the pipeline
    let kept = userPipelines.filter(func(p) { p.id != id });
    userPipelines.clear();
    userPipelines.append(kept);

    // Detach pipelineId from affected leads
    let userLeads = getUserLeads(leadsMap, caller);
    userLeads.mapInPlace(func(l) {
      switch (l.pipelineId) {
        case (?lpid) {
          if (lpid == id) { { l with pipelineId = null } } else { l }
        };
        case null { l };
      }
    });
    true
  };
};
