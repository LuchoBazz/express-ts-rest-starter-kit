import { Prisma, PrismaClient } from "@prisma/client";

import { ConfigurationEntity } from "../../entities/organizations/configuration.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { ServerError } from "../../errors/server.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION);
      }
    }
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new ServerError(ErrorMessage.COULD_NOT_BE_CREATED_BECAUSE_ID_ALREADY_EXISTS);
      } else if (error.code === "P2025") {
        throw new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION);
      } else if (error.code === "P2003") {
        throw new ServerError(ErrorMessage.FOREIGN_KEY_CONSTRAINT_FAILED);
      } else if (error.code === "P2000") {
        throw new ServerError(ErrorMessage.DATA_VALIDATION_FAILED);
      }
    }
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION);
      } else if (error.code === "P2000") {
        throw new ServerError(ErrorMessage.DATA_VALIDATION_FAILED);
      }
    }
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION);
      } else if (error.code === "P2000") {
        throw new ServerError(ErrorMessage.DATA_VALIDATION_FAILED);
      }
    }
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
