import Types "../types/templates";
import LeadTypes "../types/leads";
import TemplatesLib "../lib/templates";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

mixin (
  emailMap : Map.Map<Principal, List.List<Types.EmailTemplate>>,
  smsMap : Map.Map<Principal, List.List<Types.SmsTemplate>>,
  leadsMap : Map.Map<Principal, List.List<LeadTypes.Lead>>,
) {
  public shared query ({ caller }) func getEmailTemplates() : async [Types.EmailTemplate] {
    TemplatesLib.getEmailTemplates(emailMap, caller)
  };

  public shared ({ caller }) func addEmailTemplate(name : Text, subject : Text, body : Text) : async Text {
    TemplatesLib.addEmailTemplate(emailMap, caller, name, subject, body)
  };

  public shared ({ caller }) func updateEmailTemplate(id : Text, name : ?Text, subject : ?Text, body : ?Text) : async Bool {
    TemplatesLib.updateEmailTemplate(emailMap, caller, id, name, subject, body)
  };

  public shared ({ caller }) func deleteEmailTemplate(id : Text) : async Bool {
    TemplatesLib.deleteEmailTemplate(emailMap, caller, id)
  };

  public shared query ({ caller }) func getSmsTemplates() : async [Types.SmsTemplate] {
    TemplatesLib.getSmsTemplates(smsMap, caller)
  };

  public shared ({ caller }) func addSmsTemplate(name : Text, body : Text) : async Text {
    TemplatesLib.addSmsTemplate(smsMap, caller, name, body)
  };

  public shared ({ caller }) func updateSmsTemplate(id : Text, name : ?Text, body : ?Text) : async Bool {
    TemplatesLib.updateSmsTemplate(smsMap, caller, id, name, body)
  };

  public shared ({ caller }) func deleteSmsTemplate(id : Text) : async Bool {
    TemplatesLib.deleteSmsTemplate(smsMap, caller, id)
  };

  public shared ({ caller }) func addEmailRecord(leadId : Nat, timestamp : Int) : async { #ok; #err : Text } {
    TemplatesLib.addEmailRecord(leadsMap, caller, leadId, timestamp)
  };
};
