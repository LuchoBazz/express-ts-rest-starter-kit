import { PrismaClient } from "@prisma/client";

import { ConfigurationEntity } from "../../../entities/organizations/configuration.entity";
import { onSession } from "../../../utils/prisma";

export const createConfigurationInteractor = async (config: ConfigurationEntity): Promise<ConfigurationEntity> => {
  const [configurationCreated] = await onSession((client: PrismaClient) => {
    const createConfigTransaction = client.configuration.create({
      data: {
        configuration_id: config.getId(),
        configuration_key: config.getKey(),
        configuration_value: config.getValue(),
        configuration_type: config.getType(),
        configuration_organization_client_id: config.getClientId(),
      },
    });

    return client.$transaction([createConfigTransaction]);
  });

  return ConfigurationEntity.fromPrisma(configurationCreated);
};
