import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { SubscriptionEntity } from "../../entities/subscriptions/subscription.entity";
import {
  createSubscriptionService,
  deleteSubscriptionService,
  findSubscriptionByOrganizationService,
  findSubscriptionService,
  updateSubscriptionService,
} from "../../services/subscriptions/subscription.service";
import {
  SubscriptionSearchCriteriaInput,
  UpdateSubscriptionInput,
} from "../../types/subscriptions/subscripition.types";

export const findSubscriptionByOrganizationInteractor = async (clientId: string): Promise<SubscriptionEntity[]> => {
  const subscriptionFound = await onSession(async (client: PrismaClient) => {
    return findSubscriptionByOrganizationService(client, clientId);
  });

  return subscriptionFound;
};

export const findSubscriptionInteractor = async (
  searchCriteria: SubscriptionSearchCriteriaInput,
): Promise<SubscriptionEntity> => {
  const subscriptionFound = await onSession(async (client: PrismaClient) => {
    return findSubscriptionService(client, searchCriteria);
  });

  if (!subscriptionFound) {
    throw new NotFoundError(ErrorMessage.SUBSCRIPTION_NOT_FOUND);
  }

  return subscriptionFound;
};

export const createSubscriptionInteractor = async (subscription: SubscriptionEntity): Promise<SubscriptionEntity> => {
  const subscriptionCreated = await onSession((client: PrismaClient) => {
    return createSubscriptionService(client, subscription);
  });

  return subscriptionCreated;
};

export const updateSubscriptionInteractor = async (
  searchCriteria: SubscriptionSearchCriteriaInput,
  subscription: UpdateSubscriptionInput,
): Promise<SubscriptionEntity> => {
  const subscriptionUpdated = await onSession((client: PrismaClient) => {
    return updateSubscriptionService(client, searchCriteria, subscription);
  });

  return subscriptionUpdated;
};

export const deleteSubscriptionInteractor = async (
  searchCriteria: SubscriptionSearchCriteriaInput,
): Promise<SubscriptionEntity> => {
  const subscriptionDeleted = await onSession((client: PrismaClient) => {
    return deleteSubscriptionService(client, searchCriteria);
  });

  return subscriptionDeleted;
};
