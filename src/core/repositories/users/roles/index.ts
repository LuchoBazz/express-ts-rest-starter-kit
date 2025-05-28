import { PrismaRoleRepository } from "./prisma";
import { RoleRepository } from "./roles_repository.interface";

export const getRoleRepository = (): RoleRepository => PrismaRoleRepository;
