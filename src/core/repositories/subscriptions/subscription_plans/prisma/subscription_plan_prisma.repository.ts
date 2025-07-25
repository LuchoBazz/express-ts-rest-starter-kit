import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../../../adapters/api/errors/prisma_global_exception_filter";
import { SubscriptionPlanEntity } from "../../../../entities/subscriptions/subscription_plan.entity";
import {
  SubscriptionPlanSearchCriteriaInput,
  UpdateSubscriptionPlanInput,
} from "../../../../types/subscriptions/subscription_plan.types";
import { SubscriptionPlanRepository } from "../subscription_plan_repository.interface";

export const PrismaSubscriptionPlanRepository: SubscriptionPlanRepository = {
  async find(client: unknown, clientId: string): Promise<SubscriptionPlanEntity[]> {
    try {
      const prismaClient = client as PrismaClient;
      const records = await prismaClient.subscriptionPlan.findMany({
        where: {
          subscription_plan_organization_client_id: clientId,
        },
      });

      return records.map(SubscriptionPlanEntity.fromPrisma);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async findOne(
    client: unknown,
    searchCriteria: SubscriptionPlanSearchCriteriaInput,
  ): Promise<SubscriptionPlanEntity | null> {
    try {
      const prismaClient = client as PrismaClient;

      const { id, clientId } = searchCriteria;
      const record = await prismaClient.subscriptionPlan.findUnique({
        where: {
          unique_subscription_plan_id_and_subscription_organization_client_id: {
            subscription_plan_id: id,
            subscription_plan_organization_client_id: clientId,
          },
        },
      });

      return record ? SubscriptionPlanEntity.fromPrisma(record) : null;
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async create(client: unknown, subscriptionPlan: SubscriptionPlanEntity): Promise<SubscriptionPlanEntity> {
    try {
      const prismaClient = client as PrismaClient;

      const record = prismaClient.subscriptionPlan.create({
        data: {
          subscription_plan_id: subscriptionPlan.getId(),
          subscription_plan_name: subscriptionPlan.getName(),
          subscription_plan_product_id: subscriptionPlan.getProductId(),
          subscription_plan_variants: subscriptionPlan.getVariants(),
          subscription_plan_slug: subscriptionPlan.getSlug(),
          subscription_plan_price: subscriptionPlan.getPrice(),
          subscription_plan_currency: subscriptionPlan.getCurrency(),
          subscription_plan_currency_symbol: subscriptionPlan.getCurrencySymbol(),
          subscription_plan_href: subscriptionPlan.getHref(),
          subscription_plan_billing_cycle: subscriptionPlan.getBillingCycle(),
          subscription_plan_description: subscriptionPlan.getDescription(),
          subscription_plan_node_quota: subscriptionPlan.getNodeQuota(),
          subscription_plan_features: subscriptionPlan.getFeatures(),
          subscription_plan_most_popular: subscriptionPlan.getMostPopular(),
          subscription_plan_tier: subscriptionPlan.getTier(),
          subscription_plan_is_active: subscriptionPlan.getIsActive(),
          subscription_plan_organization_client_id: subscriptionPlan.getOrganizationClientId(),
        },
      });

      const [recordCreated] = await prismaClient.$transaction([record]);
      return SubscriptionPlanEntity.fromPrisma(recordCreated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async update(
    client: unknown,
    searchCriteria: SubscriptionPlanSearchCriteriaInput,
    subscriptionPlan: UpdateSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity> {
    try {
      const prismaClient = client as PrismaClient;

      const record = prismaClient.subscriptionPlan.update({
        where: {
          unique_subscription_plan_id_and_subscription_organization_client_id: {
            subscription_plan_id: searchCriteria.id,
            subscription_plan_organization_client_id: searchCriteria.clientId,
          },
        },
        data: {
          subscription_plan_name: subscriptionPlan.name,
          subscription_plan_product_id: subscriptionPlan.productId,
          subscription_plan_variants: subscriptionPlan.variants,
          subscription_plan_slug: subscriptionPlan.slug,
          subscription_plan_price: subscriptionPlan.price,
          subscription_plan_href: subscriptionPlan.href,
          subscription_plan_billing_cycle: subscriptionPlan.billingCycle,
          subscription_plan_description: subscriptionPlan.description,
          subscription_plan_node_quota: subscriptionPlan.nodeQuota,
          subscription_plan_features: subscriptionPlan.features,
          subscription_plan_most_popular: subscriptionPlan.mostPopular,
          subscription_plan_tier: subscriptionPlan.tier,
          subscription_plan_is_active: subscriptionPlan.isActive,
        },
      });

      const [recordUpdated] = await prismaClient.$transaction([record]);
      return SubscriptionPlanEntity.fromPrisma(recordUpdated);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
  async delete(client: unknown, searchCriteria: SubscriptionPlanSearchCriteriaInput): Promise<SubscriptionPlanEntity> {
    try {
      const prismaClient = client as PrismaClient;

      const { id, clientId } = searchCriteria;
      const record = prismaClient.subscriptionPlan.delete({
        where: {
          unique_subscription_plan_id_and_subscription_organization_client_id: {
            subscription_plan_id: id,
            subscription_plan_organization_client_id: clientId,
          },
        },
      });

      const [recordDeleted] = await prismaClient.$transaction([record]);
      return SubscriptionPlanEntity.fromPrisma(recordDeleted);
    } catch (error) {
      prismaGlobalExceptionFilter(error);
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
    }
  },
};
