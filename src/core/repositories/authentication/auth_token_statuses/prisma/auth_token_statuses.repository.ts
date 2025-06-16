import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { AuthTokenStatusEntity } from "../../../../entities/users/auth_token_statuses.entity";
import {
  AuthTokenStatusesSearchCriteriaInput,
  UpdateAuthTokenStatusesInput,
} from "../../../../types/users/auth_token_statuses.types";
import { AuthTokenStatusesRepository } from "../auth_token_statuses_repository.interface";

export const PrismaAuthTokenStatusesRepository: AuthTokenStatusesRepository = {
  async findOne(
    client: unknown,
    searchCriteria: AuthTokenStatusesSearchCriteriaInput,
  ): Promise<AuthTokenStatusEntity | null> {
    try {
      const prismaClient = client as PrismaClient;
      const { userId, issuedAt } = searchCriteria;
      const record = await prismaClient.authTokenStatus.findFirst({
        where: {
          // TODO: Add unique constrain userId and issuedAt
          auth_token_user: userId,
          auth_token_issued_at: issuedAt,
        },
      });
      // TODO: Add validation taking into account expiration date
      return record ? AuthTokenStatusEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async find(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity[]> {
    try {
      const prismaClient = client as PrismaClient;
      const { userId } = searchCriteria;
      const records = await prismaClient.authTokenStatus.findMany({ where: { auth_token_user: userId } });
      // TODO: Add validation taking into account expiration date
      return records.map(AuthTokenStatusEntity.fromPrisma);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, authTokenStatus: AuthTokenStatusEntity): Promise<AuthTokenStatusEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.authTokenStatus.create({
        data: {
          auth_token_id: authTokenStatus.getId(),
          auth_token_user: authTokenStatus.getUserId(),
          auth_token_issued_at: authTokenStatus.getIssuedAt(),
          auth_token_expiration_time: authTokenStatus.getExpirationTime(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return AuthTokenStatusEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(client: unknown, authTokenStatus: UpdateAuthTokenStatusesInput): Promise<AuthTokenStatusEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const { authTokenStatusId, issuedAt, expirationTime } = authTokenStatus;
      const record = prismaClient.authTokenStatus.update({
        where: { auth_token_id: authTokenStatusId },
        data: {
          auth_token_issued_at: issuedAt,
          auth_token_expiration_time: expirationTime,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return AuthTokenStatusEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async logOut(client: unknown, authTokenStatusId: string): Promise<AuthTokenStatusEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.authTokenStatus.update({
        where: { auth_token_id: authTokenStatusId },
        data: { auth_token_expiration_time: 0 },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return AuthTokenStatusEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
