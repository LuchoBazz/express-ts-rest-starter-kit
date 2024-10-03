import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { RoleEntity } from "../../entities/users/role.enum";

export const findRoleService = async (client: PrismaClient, name: string): Promise<RoleEntity | null> => {
  try {
    const role = await client.role.findUnique({ where: { role_name: name } });

    return role ? RoleEntity.fromPrisma(role) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createRoleService = async (client: PrismaClient, role: RoleEntity): Promise<RoleEntity> => {
  try {
    const createRoleTransaction = client.role.create({
      data: {
        role_id: role.getId(),
        role_name: role.getName(),
      },
    });

    const [roleCreated] = await client.$transaction([createRoleTransaction]);
    return RoleEntity.fromPrisma(roleCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteRoleService = async (client: PrismaClient, name: string): Promise<RoleEntity> => {
  try {
    const deleteRoleTransaction = client.role.delete({ where: { role_name: name } });

    const [roleDeleted] = await client.$transaction([deleteRoleTransaction]);
    return RoleEntity.fromPrisma(roleDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
