module {
  // DripCampaign status variants as text to keep the API surface shared-type safe.
  // Valid values: "running" | "paused" | "completed" | "stopped"
  public type DripCampaignStatus = Text;

  // Birthday drip configuration — one per user.
  // When isActive = true and Twilio is configured, the platform sends templateBody
  // to leads on their birthday at a random time during the day.
  public type BirthdayDripConfig = {
    id        : Text;
    templateBody : Text;
    var isActive : Bool;
    createdAt : Int;
  };

  // Immutable view returned over the wire.
  public type BirthdayDripConfigView = {
    id           : Text;
    templateBody : Text;
    isActive     : Bool;
    createdAt    : Int;
  };

  public type DripCampaign = {
    id          : Nat;
    name        : Text;
    status      : DripCampaignStatus;
    templateId  : Text;
    templateBody : Text;
    // Remaining leads to send (not yet sent or failed)
    var leadIds      : [Nat];
    var sentLeadIds  : [Nat];
    var failedLeadIds : [Nat];
    createdAt   : Int;
    var startedAt   : ?Int;
    var completedAt : ?Int;
    var pausedAt    : ?Int;
    var statusMut   : DripCampaignStatus; // mutable mirror of status for in-place updates
  };

  // Immutable view returned over the wire (no var fields).
  public type DripCampaignView = {
    id           : Nat;
    name         : Text;
    status       : DripCampaignStatus;
    templateId   : Text;
    templateBody : Text;
    leadIds      : [Nat];
    sentLeadIds  : [Nat];
    failedLeadIds : [Nat];
    createdAt    : Int;
    startedAt    : ?Int;
    completedAt  : ?Int;
    pausedAt     : ?Int;
  };
};
