import { PrismaClient } from "@prisma/client";

import { ConfigurationEntity } from "../../entities/organizations/configuration.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { prismaGlobalExceptionFilter } from "../../errors/prismaGlobalExceptionFilter";
import { ServerError } from "../../errors/server.error";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../interactors/organizations/configuration/configuration.types";

export const findConfigurationService = async (
  client: PrismaClient,
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity | null> => {
  try {
    const { key, clientId } = searchCriteria;
    const configuration = await client.configuration.findUnique({
      where: {
        unique_configuration_key_and_configuration_organization_client_id: {
          configuration_key: key,
          configuration_organization_client_id: clientId,
        },
      },
    });

    return configuration ? ConfigurationEntity.fromPrisma(configuration) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createConfigurationService = async (
  client: PrismaClient,
  config: ConfigurationEntity,
): Promise<ConfigurationEntity> => {
  try {
    const createConfigTransaction = client.configuration.create({
      data: {
        configuration_id: config.getId(),
        configuration_key: config.getKey(),
        configuration_value: config.getValue(),
        configuration_type: config.getType(),
        configuration_organization_client_id: config.getClientId(),
      },
    });

    const [configCreated] = await client.$transaction([createConfigTransaction]);
    return ConfigurationEntity.fromPrisma(configCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updateConfigurationService = async (
  client: PrismaClient,
  configuration: UpdateConfigurationInput,
): Promise<ConfigurationEntity> => {
  try {
    const updateConfigurationTransaction = client.configuration.update({
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

    const [configurationUpdated] = await client.$transaction([updateConfigurationTransaction]);
    return ConfigurationEntity.fromPrisma(configurationUpdated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteConfigurationService = async (
  client: PrismaClient,
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity> => {
  try {
    const { key, clientId } = searchCriteria;
    const deleteConfigurationTransaction = client.configuration.delete({
      where: {
        unique_configuration_key_and_configuration_organization_client_id: {
          configuration_key: key,
          configuration_organization_client_id: clientId,
        },
      },
    });

    const [configurationDeleted] = await client.$transaction([deleteConfigurationTransaction]);
    return ConfigurationEntity.fromPrisma(configurationDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
