import Map "mo:core/Map";
import Common "../types/common";

module {
  public type UserProfile = Common.UserProfile;
  public type ProfileInput = Common.ProfileInput;

  public func saveProfile(
    profiles : Map.Map<Principal, UserProfile>,
    caller : Principal,
    input : ProfileInput,
    now : Int,
  ) : UserProfile {
    let profile : UserProfile = {
      name = input.name;
      companyName = input.companyName;
      phone = input.phone;
      email = input.email;
      website = input.website;
      referredBy = input.referredBy;
      hearAboutUs = input.hearAboutUs;
      createdAt = now;
    };
    profiles.add(caller, profile);
    profile
  };

  public func getProfile(
    profiles : Map.Map<Principal, UserProfile>,
    caller : Principal,
  ) : ?UserProfile {
    profiles.get(caller)
  };
};
