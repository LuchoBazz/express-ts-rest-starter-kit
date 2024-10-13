import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { SubscriptionPlanEntity } from "../../entities/subscriptions/subscription_plan.entity";
import {
  createSubscriptionPlanService,
  deleteSubscriptionPlanService,
  findSubscriptionPlanByOrganizationService,
  findSubscriptionPlanService,
  updateSubscriptionPlanService,
} from "../../services/subscriptions/subscription_plan.service";
import {
  SubscriptionPlanSearchCriteriaInput,
  UpdateSubscriptionPlanInput,
} from "../../types/subscriptions/subscription_plan.types";

export const findSubscriptionPlanByOrganizationInteractor = async (
  clientId: string,
): Promise<SubscriptionPlanEntity[]> => {
  const subscriptionPlansFound = await onSession(async (client: PrismaClient) => {
    return findSubscriptionPlanByOrganizationService(client, clientId);
  });
  return subscriptionPlansFound;
};

export const findSubscriptionPlanInteractor = async (
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanFound = await onSession(async (client: PrismaClient) => {
    return findSubscriptionPlanService(client, searchCriteria);
  });

  if (!subscriptionPlanFound) {
    throw new NotFoundError(ErrorMessage.SUBSCRIPTION_PLAN_NOT_FOUND);
  }

  return subscriptionPlanFound;
};

export const createSubscriptionPlanInteractor = async (
  subscriptionPlan: SubscriptionPlanEntity,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanCreated = await onSession((client: PrismaClient) => {
    return createSubscriptionPlanService(client, subscriptionPlan);
  });

  return subscriptionPlanCreated;
};

export const updateSubscriptionPlanInteractor = async (
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
  subscriptionPlan: UpdateSubscriptionPlanInput,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanUpdated = await onSession((client: PrismaClient) => {
    return updateSubscriptionPlanService(client, searchCriteria, subscriptionPlan);
  });

  return subscriptionPlanUpdated;
};

export const deleteSubscriptionPlanInteractor = async (
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanDeleted = await onSession((client: PrismaClient) => {
    return deleteSubscriptionPlanService(client, searchCriteria);
  });

  return subscriptionPlanDeleted;
};
