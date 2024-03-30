import { FeatureFlagEntity, FeatureFlagResponse } from "../../entities/organizations/feature_flag.entity";

export const presentFeatureFlag = (featureFlag: FeatureFlagEntity): FeatureFlagResponse => {
  return {
    id: featureFlag.getId(),
    key: featureFlag.getId(),
    percentage: featureFlag.getPercentage(),
    is_experimental: featureFlag.getIsExperimental(),
    is_active: featureFlag.getIsActive(),
    organization_client_id: featureFlag.getClientId(),
  };
};
