import Common "common";

module {
  public type EmailTemplate = {
    id : Text;
    name : Text;
    subject : Text;
    body : Text;
    createdAt : Common.Timestamp;
  };

  public type SmsTemplate = {
    id : Text;
    name : Text;
    body : Text;
    createdAt : Common.Timestamp;
  };

  public type EmailRecord = {
    id : Text;
    timestamp : Common.Timestamp;
  };
};
