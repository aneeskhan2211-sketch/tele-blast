import Templates "templates";

module {
  public type PipelineStage = {
    #Prospect;
    #Contacted;
    #Qualified;
    #ClosedWon;
    #ClosedLost;
  };

  public type CallOutcome = {
    #reached;
    #noAnswer;
    #leftVoicemail;
  };

  public type CallRecord = {
    timestamp : Int;
    outcome : CallOutcome;
    disposition : ?Text;
  };

  public type TextRecord = {
    timestamp : Int;
    messageBody : Text;
    disposition : ?Text;
  };

  public type Pipeline = {
    id : Nat;
    name : Text;
    createdAt : Int;
  };

  public type Lead = {
    id : Nat;
    firstName : ?Text;
    lastName : ?Text;
    name : Text;
    industry : Text;
    phone : Text;
    email : Text;
    address : Text;
    city : Text;
    state : Text;
    revenueRange : Text;
    yearsInBusiness : Nat;
    pipelineStage : PipelineStage;
    pipelineId : ?Nat;
    notes : Text;
    followUpDate : ?Text;
    birthday : ?Text;
    qualificationTags : [Text];
    isImported : Bool;
    isDnc : Bool;
    createdAt : Int;
    callHistory : [CallRecord];
    textHistory : [TextRecord];
    emailHistory : [Templates.EmailRecord];
    aiResearch : ?Text;
    isNewLeadQueued : Bool; // true when lead arrived via a sign-up form and hasn't been reviewed yet
  };

  public type LeadInput = {
    firstName : ?Text;
    lastName : ?Text;
    name : Text;
    industry : Text;
    phone : Text;
    email : Text;
    address : Text;
    city : Text;
    state : Text;
    revenueRange : Text;
    yearsInBusiness : Nat;
    pipelineStage : PipelineStage;
    pipelineId : ?Nat;
    notes : Text;
    followUpDate : ?Text;
    birthday : ?Text;
    qualificationTags : [Text];
    isDnc : ?Bool;
  };

  public type LeadUpdate = {
    firstName : ?Text;
    lastName : ?Text;
    name : ?Text;
    industry : ?Text;
    phone : ?Text;
    email : ?Text;
    address : ?Text;
    city : ?Text;
    state : ?Text;
    revenueRange : ?Text;
    yearsInBusiness : ?Nat;
    pipelineStage : ?PipelineStage;
    pipelineId : ?Nat;
    notes : ?Text;
    followUpDate : ?Text;
    birthday : ?Text;
    qualificationTags : ?[Text];
    isDnc : ?Bool;
  };

  public type SampleBusiness = {
    id : Nat;
    name : Text;
    industry : Text;
    phone : Text;
    email : Text;
    address : Text;
    city : Text;
    state : Text;
    revenueRange : Text;
    yearsInBusiness : Nat;
  };

  public type CsvLeadInput = {
    name : Text;
    contactName : Text;
    address : Text;
    phone : Text;
    email : Text;
    notes : Text;
    birthday : ?Text;
    industry : ?Text;
    city : ?Text;
    state : ?Text;
  };

  public type DashboardStats = {
    prospects : Nat;
    contacted : Nat;
    qualified : Nat;
    closedWon : Nat;
    closedLost : Nat;
    recentLeads : [Lead];
  };
};
