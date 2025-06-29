import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { CommonUserEntity, UserPrisma } from "../../../../entities/users/common_user.entity";
import { UpdateUserInput, UserSearchCriteriaInput } from "../../../../types/users/user.types";
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
  async create(client: unknown, user: CommonUserEntity): Promise<CommonUserEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.user.create({
        data: {
          user_id: user.getId(),
          user_username: user.getUsername(),
          user_first_name: user.getFirstName(),
          user_last_name: user.getLastName(),
          user_email: user.getEmail(),
          user_identification_number: user.getIdentificationNumber(),
          user_phone_number: user.getPhoneNumber(),
          user_terms: user.getTerms(),
          user_notifications: user.getNotifications(),
          user_is_active: user.getIsActive(),
          user_uid: user.getUid(),
          user_role: user.getRole(),
          user_auth_provider: user.getAuthProvider(),
          user_auth_type: user.getAuthType(),
          user_organization_client_id: user.getClientId(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return CommonUserEntity.fromPrisma(recordCreated);
    } catch (error) {
      console.log(error);
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(client: unknown, user: UpdateUserInput): Promise<CommonUserEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const record = prismaClient.user.update({
        where: {
          user_email_user_organization_client_id: {
            user_email: user.email,
            user_organization_client_id: user.clientId,
          },
        },
        data: {
          user_username: user.username,
          user_first_name: user.firstName,
          user_last_name: user.lastName,
          user_identification_number: user.identificationNumber,
          user_phone_number: user.phoneNumber,
          user_terms: user.terms,
          user_notifications: user.notifications,
          user_is_active: user.isActive,
          user_uid: user.uid,
          user_role: user.role,
          user_auth_provider: user.authProvider,
          user_auth_type: user.authType,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return CommonUserEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, searchCriteria: UserSearchCriteriaInput): Promise<CommonUserEntity> {
    try {
      const prismaClient = client as PrismaClient;
      const { email, clientId } = searchCriteria;
      const record = prismaClient.user.delete({
        where: {
          user_email_user_organization_client_id: {
            user_email: email,
            user_organization_client_id: clientId,
          },
        },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return CommonUserEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
