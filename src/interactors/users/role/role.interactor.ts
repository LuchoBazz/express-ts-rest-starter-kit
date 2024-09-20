import { PrismaClient } from "@prisma/client";

import { RoleEntity } from "../../../entities/users/role.enum";
import { ErrorMessage } from "../../../errors/errors.enum";
import { NotFoundError } from "../../../errors/not_found.error";
import { createRoleService, deleteRoleService, findRoleService } from "../../../services/users/role.service";
import { onSession } from "../../../utils/prisma";

export const findRoleInteractor = async (name: string): Promise<RoleEntity> => {
  const roleFound = await onSession(async (client: PrismaClient) => {
    return findRoleService(client, name);
  });

  if (!roleFound) {
    throw new NotFoundError(ErrorMessage.ROLE_NOT_FOUND);
  }

  return roleFound;
};

export const createRoleInteractor = async (role: RoleEntity): Promise<RoleEntity> => {
  const roleCreated = await onSession((client: PrismaClient) => {
    return createRoleService(client, role);
  });

  return roleCreated;
};

export const deleteRoleInteractor = async (name: string): Promise<RoleEntity> => {
  const roleDeleted = await onSession((client: PrismaClient) => {
    return deleteRoleService(client, name);
  });

  return roleDeleted;
};
