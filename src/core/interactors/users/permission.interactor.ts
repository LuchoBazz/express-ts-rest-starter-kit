import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { PermissionEntity } from "../../entities/users/permission.entity";
import { getPermissionRepository } from "../../repositories/users/permissions";

export const findPermissionInteractor = async (name: string): Promise<PermissionEntity> => {
  const permissionRepository = getPermissionRepository();
  const permissionFound = await onSession(async (client: PrismaClient) => {
    return permissionRepository.findOne(client, name);
  });

  if (!permissionFound) {
    throw new NotFoundError(ErrorMessage.PERMISSION_NOT_FOUND);
  }

  return permissionFound;
};

export const createPermissionInteractor = async (permission: PermissionEntity): Promise<PermissionEntity> => {
  const permissionRepository = getPermissionRepository();
  const permissionCreated = await onSession((client: PrismaClient) => {
    return permissionRepository.create(client, permission);
  });

  return permissionCreated;
};

export const deletePermissionInteractor = async (name: string): Promise<PermissionEntity> => {
  const permissionRepository = getPermissionRepository();
  const permissionDeleted = await onSession((client: PrismaClient) => {
    return permissionRepository.delete(client, name);
  });

  return permissionDeleted;
};
