import { Prisma, PrismaClient } from "@prisma/client";

import { ConfigurationEntity } from "../../entities/organizations/configuration.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { ServerError } from "../../errors/server.error";
import { UnauthorizedError } from "../../errors/unauthorized.error";

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
