import { Prisma, PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../entities/organizations/feature_flag.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { ServerError } from "../../errors/server.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import {
  FeatureFlagSearchCriteriaInput,
  UpdateFeatureFlagInput,
} from "../../interactors/organizations/feature_flag/feature_flag.types";

export const findFeatureFlagService = async (
  client: PrismaClient,
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity | null> => {
  try {
    const { id, clientId } = searchCriteria;
    const featureFlag = await client.featureFlag.findUnique({
      where: {
        feature_flag_id: id,
        feature_flag_organization_client_id: clientId,
      },
    });

    return featureFlag ? FeatureFlagEntity.fromPrisma(featureFlag) : null;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new UnauthorizedError(ErrorMessage.NOT_HAVE_PERMISSION_TO_PERFORM_THIS_OPERATION);
      }
    }
    throw new ServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createFeatureFlagService = async (
  client: PrismaClient,
  featureFlag: FeatureFlagEntity,
): Promise<FeatureFlagEntity> => {
  try {
    const createFeatureFlagTransaction = client.featureFlag.create({
      data: {
        feature_flag_id: featureFlag.getId(),
        feature_flag_key: featureFlag.getKey(),
        feature_flag_percentage: featureFlag.getPercentage(),
        feature_flag_is_active: featureFlag.getIsActive(),
        feature_flag_organization_client_id: featureFlag.getClientId(),
        feature_flag_is_experimental: featureFlag.getIsExperimental(),
      },
    });

    const [featureFlagCreated] = await client.$transaction([createFeatureFlagTransaction]);
    return FeatureFlagEntity.fromPrisma(featureFlagCreated);
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

export const updateFeatureFlagService = async (
  client: PrismaClient,
  featureFlag: UpdateFeatureFlagInput,
): Promise<FeatureFlagEntity> => {
  try {
    const updateFeatureFlagTransaction = client.featureFlag.update({
      where: {
        feature_flag_id: featureFlag.id,
        feature_flag_organization_client_id: featureFlag.clientId,
      },
      data: {
        feature_flag_key: featureFlag.key,
        feature_flag_percentage: featureFlag.percentage,
        feature_flag_is_active: featureFlag.isActive,
        feature_flag_is_experimental: featureFlag.isExperimental,
      },
    });

    const [featureFlagUpdated] = await client.$transaction([updateFeatureFlagTransaction]);
    return FeatureFlagEntity.fromPrisma(featureFlagUpdated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
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

export const deleteFeatureFlagService = async (
  client: PrismaClient,
  searchCriteria: FeatureFlagSearchCriteriaInput,
): Promise<FeatureFlagEntity> => {
  try {
    const { id, clientId } = searchCriteria;
    const deleteFeatureFlagTransaction = client.featureFlag.delete({
      where: {
        feature_flag_id: id,
        feature_flag_organization_client_id: clientId,
      },
    });

    const [featureFlagDeleted] = await client.$transaction([deleteFeatureFlagTransaction]);
    return FeatureFlagEntity.fromPrisma(featureFlagDeleted);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
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
