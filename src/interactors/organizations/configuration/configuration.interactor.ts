import { PrismaClient } from "@prisma/client";

import { ConfigurationEntity } from "../../../entities/organizations/configuration.entity";
import { createConfigurationService } from "../../../services/organizations/configuration.service";
import { onSession } from "../../../utils/prisma";

export const createConfigurationInteractor = async (config: ConfigurationEntity): Promise<ConfigurationEntity> => {
  const configurationCreated = await onSession((client: PrismaClient) => {
    return createConfigurationService(client, config);
  });

  return configurationCreated;
};
