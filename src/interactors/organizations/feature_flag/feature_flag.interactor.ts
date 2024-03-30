import { PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../../entities/organizations/feature_flag.entity";
import { onSession } from "../../../utils/prisma";
import { FeatureFlagSearchCriteriaInput, UpdateFeatureFlagInput } from "./feature_flag.types";

export const findFeatureFlagInteractor = async (
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity | null> => {
  const { id, clientId } = searchCriteria;
  const featureFlagFound = await onSession(async (client: PrismaClient) => {
    const featureFlag = await client.featureFlag.findUnique({
      where: {
        feature_flag_id: id,
        feature_flag_organization_client_id: clientId,
      },
    });

    return featureFlag;
  });

  return featureFlagFound ? FeatureFlagEntity.fromPrisma(featureFlagFound) : null;
};

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

export const updateFeatureFlagInteractor = async (featureFlag: UpdateFeatureFlagInput): Promise<FeatureFlagEntity> => {
  const [featureFlagUpdated] = await onSession((client: PrismaClient) => {
    const updateFeatureFlagTransaction = client.featureFlag.update({
      where: {
        feature_flag_id: featureFlag.id,
        feature_flag_organization_client_id: featureFlag.clientId,
      },
      data: {
        feature_flag_key: featureFlag.key,
        feature_flag_percentage: featureFlag.percentage,
        feature_flag_is_active: featureFlag.isActive,
        feature_flag_is_experimental: featureFlag.isExperimental,
      },
    });

    return client.$transaction([updateFeatureFlagTransaction]);
  });

  return FeatureFlagEntity.fromPrisma(featureFlagUpdated);
};

export const deleteFeatureFlagInteractor = async (
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  const { id, clientId } = searchCriteria;
  const [featureFlagDeleted] = await onSession((client: PrismaClient) => {
    const deleteFeatureFlagTransaction = client.featureFlag.delete({
      where: {
        feature_flag_id: id,
        feature_flag_organization_client_id: clientId,
      },
    });

    return client.$transaction([deleteFeatureFlagTransaction]);
  });

  return FeatureFlagEntity.fromPrisma(featureFlagDeleted);
};
