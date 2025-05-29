import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { FeatureFlagEntity } from "../../entities/organizations/feature_flag.entity";
import { getFeatureFlagRepository } from "../../repositories/organizations/feature_flags";
import { FeatureFlagSearchCriteriaInput, UpdateFeatureFlagInput } from "../../types/organizations/feature_flag.types";

export const findFeatureFlagInteractor = async (
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  const featureFlagRepository = getFeatureFlagRepository();
  const featureFlagFound = await onSession(async (client: PrismaClient) => {
    return featureFlagRepository.findOne(client, searchCriteria);
  });

  if (!featureFlagFound) {
    throw new NotFoundError(ErrorMessage.FEATURE_FLAG_NOT_FOUND);
  }

  return featureFlagFound;
};

export const createFeatureFlagInteractor = async (featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity> => {
  const featureFlagRepository = getFeatureFlagRepository();
  const featureFlagCreated = await onSession((client: PrismaClient) => {
    return featureFlagRepository.create(client, featureFlag);
  });

  return featureFlagCreated;
};

export const updateFeatureFlagInteractor = async (featureFlag: UpdateFeatureFlagInput): Promise<FeatureFlagEntity> => {
  const featureFlagRepository = getFeatureFlagRepository();
  const featureFlagUpdated = await onSession((client: PrismaClient) => {
    return featureFlagRepository.update(client, featureFlag);
  });

  return featureFlagUpdated;
};

export const deleteFeatureFlagInteractor = async (
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  const featureFlagRepository = getFeatureFlagRepository();
  const featureFlagDeleted = await onSession((client: PrismaClient) => {
    return featureFlagRepository.delete(client, searchCriteria);
  });

  return featureFlagDeleted;
};
