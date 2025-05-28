import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { PermissionEntity } from "../../../../entities/users/permission.entity";
import { PermissionOnRoleEntity, PermissionOnRolePrisma } from "../../../../entities/users/permission_on_role.entity";
import { PermissionOnRoleRepository } from "../permissions_on_roles_repository.interface";

export const PrismaPermissionOnRoleRepository: PermissionOnRoleRepository = {
  async findByRole(client: unknown, role: string): Promise<PermissionEntity[]> {
    try {
      const prismaClient = client as PrismaClient;
      const records = await prismaClient.permissionsOnRoles.findMany({
        where: { permissions_on_roles_role_name: role },
      });

      const permissionsOnRoleEntity = records.map((permissionOnRole: PermissionOnRolePrisma) => {
        return PermissionOnRoleEntity.fromPrisma(permissionOnRole);
      });

      return permissionsOnRoleEntity.map((permissionOnRole: PermissionOnRoleEntity) => {
        return new PermissionEntity(permissionOnRole.getPermissionName());
      });
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async addPermissionToRole(client: unknown, role: string, permissions: string[]): Promise<PermissionEntity[]> {
    try {
      const prismaClient = client as PrismaClient;
      const record = permissions.map((permission) => {
        return prismaClient.permissionsOnRoles.create({
          data: {
            permissions_on_roles_permission_name: permission,
            permissions_on_roles_role_name: role,
          },
        });
      });

      const recordsCreated = await prismaClient.$transaction(record);

      const permissionsOnRole = recordsCreated.map((permissionCreated) => {
        return PermissionOnRoleEntity.fromPrisma(permissionCreated);
      });

      return permissionsOnRole.map((permissionOnRole) => {
        return new PermissionEntity(permissionOnRole.getPermissionName());
      });
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
