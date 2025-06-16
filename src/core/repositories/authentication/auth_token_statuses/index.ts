import { AuthTokenStatusesRepository } from "./auth_token_statuses_repository.interface";
import { PrismaAuthTokenStatusesRepository } from "./prisma";

export const getAuthTokenStatusesRepository = (): AuthTokenStatusesRepository => PrismaAuthTokenStatusesRepository;
