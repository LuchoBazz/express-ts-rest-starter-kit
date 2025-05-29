import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { ConfigurationEntity } from "../../../../entities/organizations/configuration.entity";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../../../types/organizations/configuration.types";
import { ConfigurationRepository } from "../configurations_repository.interface";

export const PrismaConfigurationRepository: ConfigurationRepository = {
  async findOne(
    client: unknown,
    searchCriteria: ConfigurationSearchCriteriaInput,
  ): Promise<ConfigurationEntity | null> {
    try {
      const prismaClient = client as PrismaClient;
      const { key, clientId } = searchCriteria;
      const record = await prismaClient.configuration.findUnique({
        where: {
          unique_configuration_key_and_configuration_organization_client_id: {
            configuration_key: key,
            configuration_organization_client_id: clientId,
          },
        },
      });

      return record ? ConfigurationEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, config: ConfigurationEntity): Promise<ConfigurationEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.configuration.create({
        data: {
          configuration_id: config.getId(),
          configuration_key: config.getKey(),
          configuration_value: config.getValue(),
          configuration_type: config.getType(),
          configuration_organization_client_id: config.getClientId(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return ConfigurationEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(client: unknown, configuration: UpdateConfigurationInput): Promise<ConfigurationEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.configuration.update({
        where: {
          unique_configuration_key_and_configuration_organization_client_id: {
            configuration_key: configuration.key,
            configuration_organization_client_id: configuration.clientId,
          },
        },
        data: {
          configuration_key: configuration.key,
          configuration_value: configuration.value,
          configuration_type: configuration.type,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return ConfigurationEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, searchCriteria: ConfigurationSearchCriteriaInput): Promise<ConfigurationEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const { key, clientId } = searchCriteria;
      const record = prismaClient.configuration.delete({
        where: {
          unique_configuration_key_and_configuration_organization_client_id: {
            configuration_key: key,
            configuration_organization_client_id: clientId,
          },
        },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return ConfigurationEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
