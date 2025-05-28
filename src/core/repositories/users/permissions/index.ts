import { PermissionRepository } from "./permissions_repository.interface";
import { PrismaPermissionRepository } from "./prisma";

export const getPermissionRepository = (): PermissionRepository => PrismaPermissionRepository;
