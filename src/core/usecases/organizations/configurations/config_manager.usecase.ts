import { PrismaClient } from "@prisma/client";
import { onSession } from "../../../../infrastructure/database/prisma";
import { getConfigurationRepository } from "../../../repositories/organizations/configurations";
import { ConfigManagerSignature } from "./config_manager.interface";
import { ConfigurationKey } from "../../../entities/organizations/configuration.enum";
import { AuthProvider } from "../../../entities/users/common_user.entity";

export const ConfigManager: ConfigManagerSignature = {
  async findAuthProvider(clientId: string): Promise<AuthProvider> {
    const configurationRepository = getConfigurationRepository();

    const config = await onSession(async (client: PrismaClient) => {
      return configurationRepository.findOne(client, {
        clientId,
        key: ConfigurationKey.AUTH_PROVIDER,
      });
    });

    const DEFAULT_VALUE = AuthProvider.FIREBASE;
    if (!config) {
      return DEFAULT_VALUE;
    }

    const value = config.getValue();
    if (!Object.values<string>(AuthProvider).includes(value)) {
      return DEFAULT_VALUE;
    }
    return value as AuthProvider;
  },
};
