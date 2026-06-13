import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";

mixin (acceptances : List.List<Common.UserAcceptance>) {
  public shared ({ caller }) func acceptLiability(ipAddress : ?Text) : async { #ok; #err : Text } {
    let alreadyAccepted = acceptances.find(func(a : Common.UserAcceptance) : Bool { a.principal == caller });
    switch (alreadyAccepted) {
      case (?_) { #ok };
      case null {
        acceptances.add({ principal = caller; acceptedAt = Time.now(); ipAddress = ipAddress });
        #ok
      };
    }
  };

  public shared query ({ caller }) func getLiabilityStatus() : async Bool {
    switch (acceptances.find(func(a : Common.UserAcceptance) : Bool { a.principal == caller })) {
      case (?_) true;
      case null false;
    }
  };
};
