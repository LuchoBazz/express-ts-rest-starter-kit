import { NextFunction, Request, Response } from "express";

import { SubscriptionEntity } from "../../../../core/entities/subscriptions/subscription.entity";
import {
  createSubscriptionInteractor,
  deleteSubscriptionInteractor,
  findSubscriptionInteractor,
  updateSubscriptionInteractor,
} from "../../../../core/interactors/subscriptions/subscription.interactor";
import {
  SubscriptionSearchCriteriaInput,
  UpdateSubscriptionInput,
} from "../../../../core/types/subscriptions/subscripition.types";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentSubscription } from "../../../presenters/subscriptions/subscription.presenter";
import { validateSchema } from "../../validator";
import { organizationSchema } from "../organizations/schemas";
import { createSubscriptionSchema, subscriptionKeyParamsSchema, updateSubscriptionSchema } from "./schemas";

export const findSubscriptionController = [
  // validateSchema(organizationSchema),
  validateSchema(subscriptionKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const subscriptionFound = await findSubscriptionInteractor({ id });

      const responseSubscription = presentSubscription(subscriptionFound);
      response.status(HttpStatusCode.OK).json({ data: responseSubscription });
    } catch (error) {
      next(error);
    }
  },
];

export const createSubscriptionController = [
  validateSchema(organizationSchema),
  validateSchema(createSubscriptionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const {
        userId,
        subscriptionPlanId,
        externalSubscriptionId,
        billingCycle,
        status,
        isActive,
        renewsAt,
        startsAt,
        endsAt,
      } = request.body;

      const subscription = new SubscriptionEntity(
        userId as string,
        subscriptionPlanId as string,
        externalSubscriptionId as string,
        billingCycle as string,
        status as string,
        isActive as boolean,
        renewsAt as Date,
        startsAt as Date,
        endsAt as Date,
        clientId,
        new Date(),
        new Date(),
      );

      const subscriptionCreated = await createSubscriptionInteractor(subscription);

      const responseSubscription = presentSubscription(subscriptionCreated);
      response.status(HttpStatusCode.OK).json({ data: responseSubscription });
    } catch (error) {
      next(error);
    }
  },
];

export const updateSubscriptionController = [
  // validateSchema(organizationSchema),
  validateSchema(subscriptionKeyParamsSchema),
  validateSchema(updateSubscriptionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const {
        userId,
        subscriptionPlanId,
        externalSubscriptionId,
        billingCycle,
        status,
        isActive,
        renewsAt,
        startsAt,
        endsAt,
      } = request.body;

      const searchCriteria: SubscriptionSearchCriteriaInput = { id };

      const subscription: UpdateSubscriptionInput = {
        userId,
        subscriptionPlanId,
        externalSubscriptionId,
        billingCycle,
        status,
        isActive,
        renewsAt,
        startsAt,
        endsAt,
      };

      const subscriptionUpdated = await updateSubscriptionInteractor(searchCriteria, subscription);

      const responseSubscription = presentSubscription(subscriptionUpdated);
      response.status(HttpStatusCode.OK).json({ data: responseSubscription });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteSubscriptionController = [
  // validateSchema(organizationSchema),
  validateSchema(subscriptionKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const subscriptionDeleted = await deleteSubscriptionInteractor({ id });

      const responseSubscription = presentSubscription(subscriptionDeleted);
      response.status(HttpStatusCode.OK).json({ data: responseSubscription });
    } catch (error) {
      next(error);
    }
  },
];
