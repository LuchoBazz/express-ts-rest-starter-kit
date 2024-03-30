import { PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../entities/organizations/feature_flag.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { prismaGlobalExceptionFilter } from "../../errors/prismaGlobalExceptionFilter";
import { ServerError } from "../../errors/server.error";
import {
  FeatureFlagSearchCriteriaInput,
  UpdateFeatureFlagInput,
} from "../../interactors/organizations/feature_flag/feature_flag.types";

export const findFeatureFlagService = async (
  client: PrismaClient,
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity | null> => {
  try {
    const { key, clientId } = searchCriteria;
    const featureFlag = await client.featureFlag.findUnique({
      where: {
        unique_feature_flag_key_and_feature_flag_organization_client_id: {
          feature_flag_key: key,
          feature_flag_organization_client_id: clientId,
        },
      },
    });

    return featureFlag ? FeatureFlagEntity.fromPrisma(featureFlag) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createFeatureFlagService = async (
  client: PrismaClient,
  featureFlag: FeatureFlagEntity,
): Promise<FeatureFlagEntity> => {
  try {
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

    const [featureFlagCreated] = await client.$transaction([createFeatureFlagTransaction]);
    return FeatureFlagEntity.fromPrisma(featureFlagCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updateFeatureFlagService = async (
  client: PrismaClient,
  featureFlag: UpdateFeatureFlagInput,
): Promise<FeatureFlagEntity> => {
  try {
    const updateFeatureFlagTransaction = client.featureFlag.update({
      where: {
        unique_feature_flag_key_and_feature_flag_organization_client_id: {
          feature_flag_key: featureFlag.key,
          feature_flag_organization_client_id: featureFlag.clientId,
        },
      },
      data: {
        feature_flag_key: featureFlag.key,
        feature_flag_percentage: featureFlag.percentage,
        feature_flag_is_active: featureFlag.isActive,
        feature_flag_is_experimental: featureFlag.isExperimental,
      },
    });

    const [featureFlagUpdated] = await client.$transaction([updateFeatureFlagTransaction]);
    return FeatureFlagEntity.fromPrisma(featureFlagUpdated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteFeatureFlagService = async (
  client: PrismaClient,
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  try {
    const { key, clientId } = searchCriteria;
    const deleteFeatureFlagTransaction = client.featureFlag.delete({
      where: {
        unique_feature_flag_key_and_feature_flag_organization_client_id: {
          feature_flag_key: key,
          feature_flag_organization_client_id: clientId,
        },
      },
    });

    const [featureFlagDeleted] = await client.$transaction([deleteFeatureFlagTransaction]);
    return FeatureFlagEntity.fromPrisma(featureFlagDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
