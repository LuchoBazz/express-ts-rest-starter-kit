import { PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../../entities/organizations/feature_flag.entity";
import { onSession } from "../../../utils/prisma";

export const createFeatureFlagInteractor = async (featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity> => {
  const [featureFlagCreated] = await onSession((client: PrismaClient) => {
    const createFeatureFlagTransaction = client.featureFlag.create({
      data: {
        feature_flag_id: featureFlag.getId(),
        feature_flag_key: featureFlag.getKey(),
        feature_flag_percentage: featureFlag.getPercentage(),
        feature_flag_is_active: featureFlag.getIsActive(),
        feature_flag_organization_client_id: featureFlag.getClientId(),
        feature_flag_is_experimental: featureFlag.getIsExperimental(),
      },
    });

    return client.$transaction([createFeatureFlagTransaction]);
  });

  return FeatureFlagEntity.fromPrisma(featureFlagCreated);
};
