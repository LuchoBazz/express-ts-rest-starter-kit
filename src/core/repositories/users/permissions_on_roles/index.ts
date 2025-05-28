import { PermissionOnRoleRepository } from "./permissions_on_roles_repository.interface";
import { PrismaPermissionOnRoleRepository } from "./prisma";

export const getPermissionOnRoleRepository = (): PermissionOnRoleRepository => PrismaPermissionOnRoleRepository;
