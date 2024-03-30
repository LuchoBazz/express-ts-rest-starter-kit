import { Prisma, PrismaClient } from "@prisma/client";

import { FeatureFlagEntity } from "../../entities/organizations/feature_flag.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { ServerError } from "../../errors/server.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";
import { FeatureFlagSearchCriteriaInput } from "../../interactors/organizations/feature_flag/feature_flag.types";

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
