import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { SubscriptionEntity } from "../../../../entities/subscriptions/subscription.entity";
import {
  SubscriptionSearchCriteriaInput,
  UpdateSubscriptionInput,
} from "../../../../types/subscriptions/subscripition.types";
import { SubscriptionRepository } from "../subscriptions_repository.interface";

export const PrismaSubscriptionRepository: SubscriptionRepository = {
  async find(client: unknown, clientId: string): Promise<SubscriptionEntity[]> {
    try {
      const prismaClient = client as PrismaClient;
      const records = await prismaClient.subscription.findMany({
        where: {
          subscriptions_organization_client_id: clientId,
        },
      });

      return records.map((record) => SubscriptionEntity.fromPrisma(record));
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async findOne(client: unknown, searchCriteria: SubscriptionSearchCriteriaInput): Promise<SubscriptionEntity | null> {
    try {
      const prismaClient = client as PrismaClient;

      const { id } = searchCriteria;
      const record = await prismaClient.subscription.findUnique({
        where: {
          subscriptions_id: id,
        },
      });

      return record ? SubscriptionEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, subscription: SubscriptionEntity): Promise<SubscriptionEntity> {
    try {
      const prismaClient = client as PrismaClient;

      const record = prismaClient.subscription.create({
        data: {
          subscriptions_user_id: subscription.getUserId(),
          subscriptions_subscription_plan_id: subscription.getSubscriptionPlanId(),
          subscriptions_external_subscription_id: subscription.getExternalSubscriptionId(),
          subscriptions_billing_cycle: subscription.getBillingCycle(),
          subscriptions_status: subscription.getStatus(),
          subscriptions_is_active: subscription.getIsActive(),
          subscriptions_renews_at: subscription.getRenewsAt(),
          subscriptions_starts_at: subscription.getStartsAt(),
          subscriptions_ends_at: subscription.getEndsAt(),
          subscriptions_organization_client_id: subscription.getOrganizationClientId(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return SubscriptionEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(
    client: unknown,
    searchCriteria: SubscriptionSearchCriteriaInput,
    subscription: UpdateSubscriptionInput,
  ): Promise<SubscriptionEntity> {
    try {
      const prismaClient = client as PrismaClient;

      const record = prismaClient.subscription.update({
        where: {
          subscriptions_id: searchCriteria.id,
        },
        data: {
          subscriptions_user_id: subscription.userId,
          subscriptions_subscription_plan_id: subscription.subscriptionPlanId,
          subscriptions_external_subscription_id: subscription.externalSubscriptionId,
          subscriptions_billing_cycle: subscription.billingCycle,
          subscriptions_status: subscription.status,
          subscriptions_is_active: subscription.isActive,
          subscriptions_renews_at: subscription.renewsAt,
          subscriptions_starts_at: subscription.startsAt,
          subscriptions_ends_at: subscription.endsAt,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return SubscriptionEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, searchCriteria: SubscriptionSearchCriteriaInput): Promise<SubscriptionEntity> {
    try {
      const prismaClient = client as PrismaClient;

      const { id } = searchCriteria;
      const record = prismaClient.subscription.delete({
        where: {
          subscriptions_id: id,
        },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return SubscriptionEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
