import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { PermissionEntity } from "../../entities/users/permission.entity";
import { PermissionOnRoleEntity, PermissionOnRolePrisma } from "../../entities/users/permission_on_role.entity";

export const findPermissionsByRoleService = async (client: PrismaClient, role: string): Promise<PermissionEntity[]> => {
  try {
    const permissionsOnRole = await client.permissionsOnRoles.findMany({
      where: { permissions_on_roles_role_name: role },
    });

    const permissionsOnRoleEntity = permissionsOnRole.map((permissionOnRole: PermissionOnRolePrisma) => {
      return PermissionOnRoleEntity.fromPrisma(permissionOnRole);
    });

    return permissionsOnRoleEntity.map((permissionOnRole: PermissionOnRoleEntity) => {
      return new PermissionEntity(permissionOnRole.getPermissionName());
    });
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const addPermissionsToRoleService = async (
  client: PrismaClient,
  role: string,
  permissions: string[],
): Promise<PermissionEntity[]> => {
  try {
    const createPermissionsTransactions = permissions.map((permission) => {
      return client.permissionsOnRoles.create({
        data: {
          permissions_on_roles_permission_name: permission,
          permissions_on_roles_role_name: role,
        },
      });
    });

    const permissionsCreated = await client.$transaction(createPermissionsTransactions);

    const permissionsOnRole = permissionsCreated.map((permissionCreated) => {
      return PermissionOnRoleEntity.fromPrisma(permissionCreated);
    });

    return permissionsOnRole.map((permissionOnRole) => {
      return new PermissionEntity(permissionOnRole.getPermissionName());
    });
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
