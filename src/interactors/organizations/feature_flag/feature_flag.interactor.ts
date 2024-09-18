import { PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../../entities/organizations/feature_flag.entity";
import { ErrorMessage } from "../../../errors/errors.enum";
import { NotFoundError } from "../../../errors/not_found.error";
import {
  createFeatureFlagService,
  deleteFeatureFlagService,
  findFeatureFlagService,
  updateFeatureFlagService,
} from "../../../services/organizations/feature_flag.service";
import { onSession } from "../../../utils/prisma";
import { FeatureFlagSearchCriteriaInput, UpdateFeatureFlagInput } from "./feature_flag.types";

export const findFeatureFlagInteractor = async (
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  const featureFlagFound = await onSession(async (client: PrismaClient) => {
    return findFeatureFlagService(client, searchCriteria);
  });

  if (!featureFlagFound) {
    throw new NotFoundError(ErrorMessage.FEATURE_FLAG_NOT_FOUND);
  }

  return featureFlagFound;
};

export const createFeatureFlagInteractor = async (featureFlag: FeatureFlagEntity): Promise<FeatureFlagEntity> => {
  const featureFlagCreated = await onSession((client: PrismaClient) => {
    return createFeatureFlagService(client, featureFlag);
  });

  return featureFlagCreated;
};

export const updateFeatureFlagInteractor = async (featureFlag: UpdateFeatureFlagInput): Promise<FeatureFlagEntity> => {
  const featureFlagUpdated = await onSession((client: PrismaClient) => {
    return updateFeatureFlagService(client, featureFlag);
  });

  return featureFlagUpdated;
};

export const deleteFeatureFlagInteractor = async (
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  const featureFlagDeleted = await onSession((client: PrismaClient) => {
    return deleteFeatureFlagService(client, searchCriteria);
  });

  return featureFlagDeleted;
};
