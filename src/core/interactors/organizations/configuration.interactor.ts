import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { ConfigurationEntity } from "../../entities/organizations/configuration.entity";
import { getConfigurationRepository } from "../../repositories/organizations/configurations";
import {
  ConfigurationSearchCriteriaInput,
  UpdateConfigurationInput,
} from "../../types/organizations/configuration.types";

export const findConfigurationInteractor = async (
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity> => {
  const configurationRepository = getConfigurationRepository();
  const configurationFound = await onSession(async (client: PrismaClient) => {
    return configurationRepository.findOne(client, searchCriteria);
  });

  if (!configurationFound) {
    throw new NotFoundError(ErrorMessage.CONFIGURATION_NOT_FOUND);
  }

  return configurationFound;
};

export const createConfigurationInteractor = async (
  configuration: ConfigurationEntity,
): Promise<ConfigurationEntity> => {
  const configurationRepository = getConfigurationRepository();
  const configurationCreated = await onSession(async (client: PrismaClient) => {
    return configurationRepository.create(client, configuration);
  });

  return configurationCreated;
};

export const updateConfigurationInteractor = async (
  configuration: UpdateConfigurationInput,
): Promise<ConfigurationEntity> => {
  const configurationRepository = getConfigurationRepository();
  const configurationUpdated = await onSession(async (client: PrismaClient) => {
    return configurationRepository.update(client, configuration);
  });

  return configurationUpdated;
};

export const deleteConfigurationInteractor = async (
  searchCriteria: ConfigurationSearchCriteriaInput,
): Promise<ConfigurationEntity> => {
  const configurationRepository = getConfigurationRepository();
  const configurationDeleted = await onSession(async (client: PrismaClient) => {
    return configurationRepository.delete(client, searchCriteria);
  });

  return configurationDeleted;
};
