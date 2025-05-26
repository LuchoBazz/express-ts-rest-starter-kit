import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { SubscriptionPlanEntity } from "../../entities/subscriptions/subscription_plan.entity";
import { getSubscriptionPlanRepository } from "../../repositories/subscriptions/subscription_plan";
import {
  SubscriptionPlanSearchCriteriaInput,
  UpdateSubscriptionPlanInput,
} from "../../types/subscriptions/subscription_plan.types";

export const findSubscriptionPlanByOrganizationInteractor = async (
  clientId: string,
): Promise<SubscriptionPlanEntity[]> => {
  const subscriptionPlanRepository = getSubscriptionPlanRepository();
  const subscriptionPlansFound = await onSession(async (client: PrismaClient) => {
    return subscriptionPlanRepository.find(client, clientId);
  });
  return subscriptionPlansFound;
};

export const findSubscriptionPlanInteractor = async (
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanRepository = getSubscriptionPlanRepository();
  const subscriptionPlanFound = await onSession(async (client: PrismaClient) => {
    return subscriptionPlanRepository.findOne(client, searchCriteria);
  });

  if (!subscriptionPlanFound) {
    throw new NotFoundError(ErrorMessage.SUBSCRIPTION_PLAN_NOT_FOUND);
  }

  return subscriptionPlanFound;
};

export const createSubscriptionPlanInteractor = async (
  subscriptionPlan: SubscriptionPlanEntity,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanRepository = getSubscriptionPlanRepository();
  const subscriptionPlanCreated = await onSession((client: PrismaClient) => {
    return subscriptionPlanRepository.create(client, subscriptionPlan);
  });

  return subscriptionPlanCreated;
};

export const updateSubscriptionPlanInteractor = async (
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
  subscriptionPlan: UpdateSubscriptionPlanInput,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanRepository = getSubscriptionPlanRepository();
  const subscriptionPlanUpdated = await onSession((client: PrismaClient) => {
    return subscriptionPlanRepository.update(client, searchCriteria, subscriptionPlan);
  });

  return subscriptionPlanUpdated;
};

export const deleteSubscriptionPlanInteractor = async (
  searchCriteria: SubscriptionPlanSearchCriteriaInput,
): Promise<SubscriptionPlanEntity> => {
  const subscriptionPlanRepository = getSubscriptionPlanRepository();

  const subscriptionPlanDeleted = await onSession((client: PrismaClient) => {
    return subscriptionPlanRepository.delete(client, searchCriteria);
  });

  return subscriptionPlanDeleted;
};
