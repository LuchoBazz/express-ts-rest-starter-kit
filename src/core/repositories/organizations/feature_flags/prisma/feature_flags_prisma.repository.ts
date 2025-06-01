import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { FeatureFlagEntity } from "../../../../entities/organizations/feature_flag.entity";
import {
  FeatureFlagSearchCriteriaInput,
  UpdateFeatureFlagInput,
} from "../../../../types/organizations/feature_flag.types";
import { FeatureFlagRepository } from "../feature_flags_repository.interface";

export const PrismaFeatureFlagRepository: FeatureFlagRepository = {
  async findOne(client: unknown, searchCriteria: FeatureFlagSearchCriteriaInput): Promise<FeatureFlagEntity | null> {
    try {
      const prismaClient = client as PrismaClient;
      const { key, clientId } = searchCriteria;
      const record = await prismaClient.featureFlag.findUnique({
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
  },
  async create(client: unknown, featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.featureFlag.create({
        data: {
          feature_flag_id: featureFlag.getId(),
          feature_flag_key: featureFlag.getKey(),
          feature_flag_is_active: featureFlag.getIsActive(),
          feature_flag_organization_client_id: featureFlag.getClientId(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return FeatureFlagEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(client: unknown, featureFlag: UpdateFeatureFlagInput): Promise<FeatureFlagEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.featureFlag.update({
        where: {
          unique_feature_flag_key_and_feature_flag_organization_client_id: {
            feature_flag_key: featureFlag.key,
            feature_flag_organization_client_id: featureFlag.clientId,
          },
        },
        data: {
          feature_flag_key: featureFlag.key,
          feature_flag_is_active: featureFlag.isActive,
          feature_flag_value: featureFlag.isExperimental,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return FeatureFlagEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, searchCriteria: FeatureFlagSearchCriteriaInput): Promise<FeatureFlagEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const { key, clientId } = searchCriteria;
      const record = prismaClient.featureFlag.delete({
        where: {
          unique_feature_flag_key_and_feature_flag_organization_client_id: {
            feature_flag_key: key,
            feature_flag_organization_client_id: clientId,
          },
        },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return FeatureFlagEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
