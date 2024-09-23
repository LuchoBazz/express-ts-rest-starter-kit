import { PrismaClient } from "@prisma/client";

import { PermissionEntity } from "../../entities/users/permission.entity";
import { PermissionOnRoleEntity, PermissionOnRolePrisma } from "../../entities/users/permission_on_role.entity";
import { ErrorMessage } from "../../errors/errors.enum";
import { InternalServerError } from "../../errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../errors/prisma_global_exception_filter";

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
