import { PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../../controllers/entities/organizations/feature_flag.entity";
import { onSession } from "../../../utils/prisma";

export const createFeatureFlagInteractor = async (featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity> => {
  const [featureFlagCreated] = await onSession((manager: PrismaClient) => {
    const createFeatureFlagTransaction = manager.featureFlag.create({
      data: {
        feature_flag_key: featureFlag.getKey(),
        feature_flag_percentage: featureFlag.getPercentage(),
        feature_flag_is_active: featureFlag.getIsActive(),
        feature_flag_organization_client_id: featureFlag.getClientId(),
        feature_flag_is_experimental: featureFlag.getIsExperimental(),
      },
    });

    return manager.$transaction([createFeatureFlagTransaction]);
  });

  return FeatureFlagEntity.fromPrisma(featureFlagCreated);
};
