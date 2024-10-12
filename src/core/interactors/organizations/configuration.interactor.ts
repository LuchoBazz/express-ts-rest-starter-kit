import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { ConfigurationEntity } from "../../entities/organizations/configuration.entity";
import {
  createConfigurationService,
  deleteConfigurationService,
  findConfigurationService,
  updateConfigurationService,
} from "../../services/organizations/configuration.service";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../types/organizations/configuration.types";

export const findConfigurationInteractor = async (
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity> => {
  const configurationFound = await onSession(async (client: PrismaClient) => {
    return findConfigurationService(client, searchCriteria);
  });

  if (!configurationFound) {
    throw new NotFoundError(ErrorMessage.CONFIGURATION_NOT_FOUND);
  }

  return configurationFound;
};

export const createConfigurationInteractor = async (
  configuration: ConfigurationEntity,
): Promise<ConfigurationEntity> => {
  const configurationCreated = await onSession(async (client: PrismaClient) => {
    return createConfigurationService(client, configuration);
  });

  return configurationCreated;
};

export const updateConfigurationInteractor = async (
  configuration: UpdateConfigurationInput,
): Promise<ConfigurationEntity> => {
  const configurationUpdated = await onSession(async (client: PrismaClient) => {
    return updateConfigurationService(client, configuration);
  });

  return configurationUpdated;
};

export const deleteConfigurationInteractor = async (
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity> => {
  const configurationDeleted = await onSession(async (client: PrismaClient) => {
    return deleteConfigurationService(client, searchCriteria);
  });

  return configurationDeleted;
};
