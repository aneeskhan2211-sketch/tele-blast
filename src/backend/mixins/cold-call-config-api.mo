import Map "mo:core/Map";
import Common "../types/common";
import ColdCallConfigLib "../lib/cold-call-config";

mixin (
  coldCallConfigs : Map.Map<Principal, Common.ColdCallScriptConfig>,
) {
  public shared ({ caller }) func saveColdCallConfig(
    input : Common.ColdCallScriptConfigInput,
  ) : async { #ok : Common.ColdCallScriptConfig; #err : Text } {
    let config = ColdCallConfigLib.saveConfig(coldCallConfigs, caller, input);
    #ok(config)
  };

  public shared query ({ caller }) func getColdCallConfig() : async { #ok : Common.ColdCallScriptConfig; #err : Text } {
    switch (ColdCallConfigLib.getConfig(coldCallConfigs, caller)) {
      case (?c) { #ok(c) };
      case null { #err("Cold call config not found") };
    }
  };
};
