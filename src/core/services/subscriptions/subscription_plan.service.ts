import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { SubscriptionPlanEntity } from "../../entities/subscriptions/subscription_plan.entity";
import {
  SubscriptionPlanSearchCriteriaInput,
  UpdateSubscriptionPlanInput,
} from "../../types/subscriptions/subscription_plan.types";

export const findSubscriptionPlanByOrganizationService = async (
  client: PrismaClient,
  clientId: string,
): Promise<SubscriptionPlanEntity[]> => {
  try {
    const records = await client.subscriptionPlan.findMany({
      where: {
        subscription_plan_organization_client_id: clientId,
      },
    });

    return records.map(SubscriptionPlanEntity.fromPrisma);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const findSubscriptionPlanService = async (
  client: PrismaClient,
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
): Promise<SubscriptionPlanEntity | null> => {
  try {
    const { id, clientId } = searchCriteria;
    const record = await client.subscriptionPlan.findUnique({
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
};

export const createSubscriptionPlanService = async (
  client: PrismaClient,
  subscriptionPlan: SubscriptionPlanEntity,
): Promise<SubscriptionPlanEntity> => {
  try {
    const record = client.subscriptionPlan.create({
      data: {
        subscription_plan_id: subscriptionPlan.getId(),
        subscription_plan_name: subscriptionPlan.getName(),
        subscription_plan_product_id: subscriptionPlan.getProductId(),
        subscription_plan_variants: subscriptionPlan.getVariants(),
        subscription_plan_slug: subscriptionPlan.getSlug(),
        subscription_plan_price: subscriptionPlan.getPrice(),
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

    const [recordCreated] = await client.$transaction([record]);
    return SubscriptionPlanEntity.fromPrisma(recordCreated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updateSubscriptionPlanService = async (
  client: PrismaClient,
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
  subscriptionPlan: UpdateSubscriptionPlanInput,
): Promise<SubscriptionPlanEntity> => {
  try {
    const record = client.subscriptionPlan.update({
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

    const [recordUpdated] = await client.$transaction([record]);
    return SubscriptionPlanEntity.fromPrisma(recordUpdated);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deleteSubscriptionPlanService = async (
  client: PrismaClient,
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
): Promise<SubscriptionPlanEntity> => {
  try {
    const { id, clientId } = searchCriteria;
    const record = client.subscriptionPlan.delete({
      where: {
        unique_subscription_plan_id_and_subscription_organization_client_id: {
          subscription_plan_id: id,
          subscription_plan_organization_client_id: clientId,
        },
      },
    });

    const [recordDeleted] = await client.$transaction([record]);
    return SubscriptionPlanEntity.fromPrisma(recordDeleted);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
