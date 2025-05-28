import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { RoleEntity } from "../../entities/users/role.enum";
import { getRoleRepository } from "../../repositories/users/roles";

export const findRoleInteractor = async (name: string): Promise<RoleEntity> => {
  const roleRepository = getRoleRepository();

  const roleFound = await onSession(async (client: PrismaClient) => {
    return roleRepository.findOne(client, name);
  });

  if (!roleFound) {
    throw new NotFoundError(ErrorMessage.ROLE_NOT_FOUND);
  }

  return roleFound;
};

export const createRoleInteractor = async (role: RoleEntity): Promise<RoleEntity> => {
  const roleRepository = getRoleRepository();

  const roleCreated = await onSession((client: PrismaClient) => {
    return roleRepository.create(client, role);
  });

  return roleCreated;
};

export const deleteRoleInteractor = async (name: string): Promise<RoleEntity> => {
  const roleRepository = getRoleRepository();

  const roleDeleted = await onSession((client: PrismaClient) => {
    return roleRepository.delete(client, name);
  });

  return roleDeleted;
};
