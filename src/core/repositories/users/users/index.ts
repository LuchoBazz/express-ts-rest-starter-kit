import { PrismaUserRepository } from "./prisma";
import { UserRepository } from "./users_repository.interface";

export const getUserRepository = (): UserRepository => PrismaUserRepository;
