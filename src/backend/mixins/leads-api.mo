import Types "../types/leads";
import LeadsLib "../lib/leads";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  leadsMap : Map.Map<Principal, List.List<Types.Lead>>,
  pipelinesMap : Map.Map<Principal, List.List<Types.Pipeline>>,
  sampleBusinesses : [Types.SampleBusiness],
  counter : { var value : Nat },
) {
  public shared query ({ caller }) func getLeads() : async [Types.Lead] {
    LeadsLib.getLeads(leadsMap, caller)
  };

  public shared query ({ caller }) func getLead(id : Nat) : async ?Types.Lead {
    LeadsLib.getLead(leadsMap, caller, id)
  };

  public shared ({ caller }) func addLead(lead : Types.LeadInput) : async Nat {
    LeadsLib.addLead(leadsMap, caller, counter, lead, false)
  };

  public shared ({ caller }) func updateLead(id : Nat, updates : Types.LeadUpdate) : async Bool {
    LeadsLib.updateLead(leadsMap, caller, id, updates)
  };

  public shared ({ caller }) func deleteLead(id : Nat) : async Bool {
    LeadsLib.deleteLead(leadsMap, caller, id)
  };

  public shared ({ caller }) func importSampleBusiness(id : Nat) : async ?Nat {
    LeadsLib.importSampleBusiness(leadsMap, caller, sampleBusinesses, id, counter)
  };

  public query func getSampleBusinesses() : async [Types.SampleBusiness] {
    sampleBusinesses
  };

  public shared ({ caller }) func bulkImportLeads(csvLeads : [Types.CsvLeadInput], stage : Types.PipelineStage, pipelineId : ?Nat) : async [Nat] {
    LeadsLib.bulkImportLeads(leadsMap, caller, counter, csvLeads, stage, pipelineId)
  };

  public shared query ({ caller }) func getDashboardStats(pipelineId : ?Nat) : async Types.DashboardStats {
    LeadsLib.getDashboardStats(leadsMap, caller, pipelineId)
  };

  public shared ({ caller }) func addCallRecord(leadId : Nat, outcome : Types.CallOutcome) : async { #ok; #err : Text } {
    LeadsLib.addCallRecord(leadsMap, caller, leadId, outcome)
  };

  public shared ({ caller }) func addTextRecord(leadId : Nat, messageBody : Text) : async { #ok; #err : Text } {
    LeadsLib.addTextRecord(leadsMap, caller, leadId, messageBody)
  };

  public shared ({ caller }) func updateLeadDnc(leadId : Nat, isDnc : Bool) : async { #ok : Types.Lead; #err : Text } {
    LeadsLib.updateLeadDnc(leadsMap, caller, leadId, isDnc)
  };

  public shared ({ caller }) func bulkDeleteLeads(ids : [Nat]) : async { #ok : Nat; #err : Text } {
    let count = LeadsLib.bulkDeleteLeads(leadsMap, caller, ids);
    #ok(count)
  };

  public shared query ({ caller }) func getBirthdayLeads() : async [Types.Lead] {
    LeadsLib.getBirthdayLeads(leadsMap, caller)
  };

  public shared query ({ caller }) func getNewLeadQueue() : async [Types.Lead] {
    LeadsLib.getNewLeadQueue(leadsMap, caller)
  };

  public shared ({ caller }) func clearNewLeadQueued(leadId : Nat) : async { #ok; #err : Text } {
    if (LeadsLib.clearNewLeadQueued(leadsMap, caller, leadId)) #ok
    else #err("Lead not found")
  };

  // ── Pipeline API ─────────────────────────────────────────────────

  public shared query ({ caller }) func getPipelines() : async [Types.Pipeline] {
    LeadsLib.getPipelines(pipelinesMap, caller)
  };

  public shared ({ caller }) func createPipeline(name : Text) : async { #ok : Types.Pipeline; #err : Text } {
    if (name == "") return #err("Pipeline name cannot be empty");
    let pipeline = LeadsLib.createPipeline(pipelinesMap, caller, counter, name);
    #ok(pipeline)
  };

  public shared ({ caller }) func updatePipeline(id : Nat, name : Text) : async { #ok; #err : Text } {
    if (name == "") return #err("Pipeline name cannot be empty");
    if (LeadsLib.updatePipeline(pipelinesMap, caller, id, name)) #ok
    else #err("Pipeline not found")
  };

  public shared ({ caller }) func deletePipeline(id : Nat) : async { #ok; #err : Text } {
    if (LeadsLib.deletePipeline(pipelinesMap, leadsMap, caller, id)) #ok
    else #err("Pipeline not found")
  };
  public query func getCallDispositions() : async [Text] {
    [
      "Interested - Follow Up",
      "Not Interested",
      "Left Voicemail",
      "No Answer",
      "Wrong Number",
      "Callback Requested",
      "Do Not Call",
      "Closed Deal",
    ]
  };
};
