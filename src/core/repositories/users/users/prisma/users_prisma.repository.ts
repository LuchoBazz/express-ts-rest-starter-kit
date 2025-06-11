import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { CommonUserEntity, UserPrisma } from "../../../../entities/users/common_user.entity";
import { UserRepository } from "../users_repository.interface";

export const PrismaUserRepository: UserRepository = {
  async findOne(client: unknown, clientId: string, email: string): Promise<CommonUserEntity | null> {
    try {
      const prismaClient = client as PrismaClient;

      const record = await prismaClient.user.findUnique({
        where: {
          user_email_user_organization_client_id: {
            user_email: email,
            user_organization_client_id: clientId,
          },
        },
      });

      return record ? CommonUserEntity.fromPrisma(record as UserPrisma) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
