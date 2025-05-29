import { ConfigurationRepository } from "./configurations_repository.interface";
import { PrismaConfigurationRepository } from "./prisma";

export const getConfigurationRepository = (): ConfigurationRepository => PrismaConfigurationRepository;
