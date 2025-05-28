import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { PermissionEntity } from "../../entities/users/permission.entity";
import { getPermissionOnRoleRepository } from "../../repositories/users/permissions_on_roles";

export const findPermissionsByRoleInteractor = async (role: string): Promise<PermissionEntity[]> => {
  const permissionOnRoleRepository = getPermissionOnRoleRepository();
  const permissionsFound = await onSession(async (client: PrismaClient) => {
    return permissionOnRoleRepository.findByRole(client, role);
  });

  if (!permissionsFound) {
    throw new NotFoundError(ErrorMessage.PERMISSION_NOT_FOUND);
  }

  return permissionsFound;
};

export const addPermissionsToRoleInteractor = async (
  role: string,
  permissions: string[],
): Promise<PermissionEntity[]> => {
  const permissionOnRoleRepository = getPermissionOnRoleRepository();
  const permissionsCreated = await onSession((client: PrismaClient) => {
    return permissionOnRoleRepository.addPermissionToRole(client, role, permissions);
  });

  return permissionsCreated;
};
