import { FeatureFlagRepository } from "./feature_flags_repository.interface";
import { PrismaFeatureFlagRepository } from "./prisma";

export const getFeatureFlagRepository = (): FeatureFlagRepository => PrismaFeatureFlagRepository;
