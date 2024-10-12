import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { ConfigurationEntity } from "../../entities/organizations/configuration.entity";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../types/organizations/configuration.types";

export const findConfigurationService = async (
  client: PrismaClient,
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity | null> => {
  try {
    const { key, clientId } = searchCriteria;
    const record = await client.configuration.findUnique({
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
};

export const createConfigurationService = async (
  client: PrismaClient,
  config: ConfigurationEntity,
): Promise<ConfigurationEntity> => {
  try {
    const record = client.configuration.create({
      data: {
        configuration_id: config.getId(),
        configuration_key: config.getKey(),
        configuration_value: config.getValue(),
        configuration_type: config.getType(),
        configuration_organization_client_id: config.getClientId(),
      },
    });

    const [recordCreated] = await client.$transaction([record]);
    return ConfigurationEntity.fromPrisma(recordCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updateConfigurationService = async (
  client: PrismaClient,
  configuration: UpdateConfigurationInput,
): Promise<ConfigurationEntity> => {
  try {
    const record = client.configuration.update({
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

    const [recordUpdated] = await client.$transaction([record]);
    return ConfigurationEntity.fromPrisma(recordUpdated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteConfigurationService = async (
  client: PrismaClient,
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity> => {
  try {
    const { key, clientId } = searchCriteria;
    const record = client.configuration.delete({
      where: {
        unique_configuration_key_and_configuration_organization_client_id: {
          configuration_key: key,
          configuration_organization_client_id: clientId,
        },
      },
    });

    const [recordDeleted] = await client.$transaction([record]);
    return ConfigurationEntity.fromPrisma(recordDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
