import Map "mo:core/Map";
import Common "../types/common";

module {
  public type ColdCallScriptConfig = Common.ColdCallScriptConfig;
  public type ColdCallScriptConfigInput = Common.ColdCallScriptConfigInput;

  public func saveConfig(
    configs : Map.Map<Principal, ColdCallScriptConfig>,
    caller : Principal,
    input : ColdCallScriptConfigInput,
  ) : ColdCallScriptConfig {
    let config : ColdCallScriptConfig = {
      whatYouAreSelling = input.whatYouAreSelling;
      preQualifyingNeeds = input.preQualifyingNeeds;
      packagesOrServices = input.packagesOrServices;
      goalType = input.goalType;
    };
    configs.add(caller, config);
    config
  };

  public func getConfig(
    configs : Map.Map<Principal, ColdCallScriptConfig>,
    caller : Principal,
  ) : ?ColdCallScriptConfig {
    configs.get(caller)
  };
};
