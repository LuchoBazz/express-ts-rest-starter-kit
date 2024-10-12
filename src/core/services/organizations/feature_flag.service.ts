import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { FeatureFlagEntity } from "../../entities/organizations/feature_flag.entity";
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
    const record = await client.featureFlag.findUnique({
      where: {
        unique_feature_flag_key_and_feature_flag_organization_client_id: {
          feature_flag_key: key,
          feature_flag_organization_client_id: clientId,
        },
      },
    });

    return record ? FeatureFlagEntity.fromPrisma(record) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createFeatureFlagService = async (
  client: PrismaClient,
  featureFlag: FeatureFlagEntity,
): Promise<FeatureFlagEntity> => {
  try {
    const record = client.featureFlag.create({
      data: {
        feature_flag_id: featureFlag.getId(),
        feature_flag_key: featureFlag.getKey(),
        feature_flag_percentage: featureFlag.getPercentage(),
        feature_flag_is_active: featureFlag.getIsActive(),
        feature_flag_organization_client_id: featureFlag.getClientId(),
        feature_flag_is_experimental: featureFlag.getIsExperimental(),
      },
    });

    const [recordCreated] = await client.$transaction([record]);
    return FeatureFlagEntity.fromPrisma(recordCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updateFeatureFlagService = async (
  client: PrismaClient,
  featureFlag: UpdateFeatureFlagInput,
): Promise<FeatureFlagEntity> => {
  try {
    const record = client.featureFlag.update({
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

    const [recordUpdated] = await client.$transaction([record]);
    return FeatureFlagEntity.fromPrisma(recordUpdated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteFeatureFlagService = async (
  client: PrismaClient,
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  try {
    const { key, clientId } = searchCriteria;
    const record = client.featureFlag.delete({
      where: {
        unique_feature_flag_key_and_feature_flag_organization_client_id: {
          feature_flag_key: key,
          feature_flag_organization_client_id: clientId,
        },
      },
    });

    const [recordDeleted] = await client.$transaction([record]);
    return FeatureFlagEntity.fromPrisma(recordDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
