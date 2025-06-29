import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { AuthTokenStatusEntity } from "../../../../entities/users/auth_token_statuses.entity";
import {
  AuthTokenStatusesSearchCriteriaInput,
  RevokeSearchCriteriaInput,
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
      const { clientId, email, issuedAt } = searchCriteria;
      const record = await prismaClient.authTokenStatus.findFirst({
        where: {
          auth_token_email: email,
          auth_token_organization_client_id: clientId,
          auth_token_issued_at: {
            not: issuedAt,
          },
        },
      });
      // TODO: Add validation taking into account expiration date
      return record && !record.auth_token_revoked ? AuthTokenStatusEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async find(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity[]> {
    try {
      const prismaClient = client as PrismaClient;
      const { clientId, email } = searchCriteria;
      const records = await prismaClient.authTokenStatus.findMany({
        where: { auth_token_email: email, auth_token_organization_client_id: clientId },
      });
      // TODO: Add validation taking into account expiration date
      return records.map(AuthTokenStatusEntity.fromPrisma).filter((record) => !record.isRevoked());
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
          auth_token_email: authTokenStatus.getEmail(),
          auth_token_organization_client_id: authTokenStatus.getOrganizationClientId(),
          auth_token_issued_at: authTokenStatus.getIssuedAt(),
          auth_token_expiration_time: authTokenStatus.getExpirationTime(),
          auth_token_ip_address: authTokenStatus.getIpAddress(),
          auth_token_user_agent: authTokenStatus.getUserAgent(),
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
      const { clientId, email, issuedAt, expirationTime, ipAddress, userAgent } = authTokenStatus;
      const record = prismaClient.authTokenStatus.update({
        where: {
          auth_token_email_auth_token_organization_client_id_auth_token_issued_at: {
            auth_token_email: email,
            auth_token_organization_client_id: clientId,
            auth_token_issued_at: issuedAt,
          },
        },
        data: {
          auth_token_issued_at: issuedAt,
          auth_token_expiration_time: expirationTime,
          auth_token_ip_address: ipAddress,
          auth_token_user_agent: userAgent,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return AuthTokenStatusEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async revokeBySession(client: unknown, searchCriteria: RevokeSearchCriteriaInput): Promise<AuthTokenStatusEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const { clientId, email, issuedAt } = searchCriteria;
      const record = prismaClient.authTokenStatus.update({
        where: {
          auth_token_email_auth_token_organization_client_id_auth_token_issued_at: {
            auth_token_email: email,
            auth_token_organization_client_id: clientId,
            auth_token_issued_at: issuedAt,
          },
          auth_token_revoked: false,
        },
        data: { auth_token_revoked: true },
      });

      const [recordRevoked] = await prismaClient.$transaction([record]);
      return AuthTokenStatusEntity.fromPrisma(recordRevoked);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async revokeAllByUserId(client: unknown, clientId: string, email: string): Promise<number> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.authTokenStatus.updateMany({
        where: {
          auth_token_email: email,
          auth_token_organization_client_id: clientId,
          auth_token_revoked: false,
        },
        data: { auth_token_revoked: true },
      });

      const [recordsRevoked] = await prismaClient.$transaction([record]);
      return recordsRevoked.count;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async revokeAllExcept(client: unknown, searchCriteria: RevokeSearchCriteriaInput): Promise<number> {
    try {
      const prismaClient = client as PrismaClient;
      const { clientId, email, issuedAt } = searchCriteria;
      const record = prismaClient.authTokenStatus.updateMany({
        where: {
          auth_token_email: email,
          auth_token_organization_client_id: clientId,
          auth_token_revoked: false,
          auth_token_issued_at: { not: issuedAt },
        },
        data: { auth_token_revoked: true },
      });

      const [recordsRevoked] = await prismaClient.$transaction([record]);
      return recordsRevoked.count;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
