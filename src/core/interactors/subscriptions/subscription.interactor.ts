import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { SubscriptionEntity } from "../../entities/subscriptions/subscription.entity";
import { getSubscriptionRepository } from "../../repositories/subscriptions/subscriptions";
import {
  SubscriptionSearchCriteriaInput,
  UpdateSubscriptionInput,
} from "../../types/subscriptions/subscripition.types";

export const findSubscriptionByOrganizationInteractor = async (clientId: string): Promise<SubscriptionEntity[]> => {
  const subscriptionRepository = getSubscriptionRepository();
  const subscriptionFound = await onSession(async (client: PrismaClient) =>
    subscriptionRepository.find(client, clientId),
  );

  return subscriptionFound;
};

export const findSubscriptionInteractor = async (
  searchCriteria: SubscriptionSearchCriteriaInput,
): Promise<SubscriptionEntity> => {
  const subscriptionRepository = getSubscriptionRepository();
  const subscriptionFound = await onSession((client: PrismaClient) =>
    subscriptionRepository.findOne(client, searchCriteria),
  );

  if (!subscriptionFound) {
    throw new NotFoundError(ErrorMessage.SUBSCRIPTION_NOT_FOUND);
  }

  return subscriptionFound;
};

export const createSubscriptionInteractor = async (subscription: SubscriptionEntity): Promise<SubscriptionEntity> => {
  const subscriptionRepository = getSubscriptionRepository();
  const subscriptionCreated = await onSession((client: PrismaClient) =>
    subscriptionRepository.create(client, subscription),
  );

  return subscriptionCreated;
};

export const updateSubscriptionInteractor = async (
  searchCriteria: SubscriptionSearchCriteriaInput,
  subscription: UpdateSubscriptionInput,
): Promise<SubscriptionEntity> => {
  const subscriptionRepository = getSubscriptionRepository();
  const subscriptionUpdated = await onSession((client: PrismaClient) =>
    subscriptionRepository.update(client, searchCriteria, subscription),
  );

  return subscriptionUpdated;
};

export const deleteSubscriptionInteractor = async (
  searchCriteria: SubscriptionSearchCriteriaInput,
): Promise<SubscriptionEntity> => {
  const subscriptionRepository = getSubscriptionRepository();
  const subscriptionDeleted = await onSession((client: PrismaClient) =>
    subscriptionRepository.delete(client, searchCriteria),
  );

  return subscriptionDeleted;
};
