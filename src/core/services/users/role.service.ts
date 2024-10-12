import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { RoleEntity } from "../../entities/users/role.enum";

export const findRoleService = async (client: PrismaClient, name: string): Promise<RoleEntity | null> => {
  try {
    const record = await client.role.findUnique({ where: { role_name: name } });

    return record ? RoleEntity.fromPrisma(record) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createRoleService = async (client: PrismaClient, role: RoleEntity): Promise<RoleEntity> => {
  try {
    const record = client.role.create({
      data: {
        role_id: role.getId(),
        role_name: role.getName(),
      },
    });

    const [recordCreated] = await client.$transaction([record]);
    return RoleEntity.fromPrisma(recordCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteRoleService = async (client: PrismaClient, name: string): Promise<RoleEntity> => {
  try {
    const record = client.role.delete({ where: { role_name: name } });

    const [recordDeleted] = await client.$transaction([record]);
    return RoleEntity.fromPrisma(recordDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
