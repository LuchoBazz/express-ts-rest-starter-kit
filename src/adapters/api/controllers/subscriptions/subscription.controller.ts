import { NextFunction, Request, Response } from "express";

import { SubscriptionEntity } from "../../../../core/entities/subscriptions/subscription.entity";
import {
  createSubscriptionInteractor,
  deleteSubscriptionInteractor,
  findSubscriptionByOrganizationInteractor,
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
import { clientIdInHeaderSchema } from "../organizations/schemas";
import { createSubscriptionSchema, subscriptionKeyParamsSchema, updateSubscriptionSchema } from "./schemas";

export const findSubscriptionByOrganizationsController = [
  validateSchema(clientIdInHeaderSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = request.headers["client-id"]?.toString() ?? "";

      const subscriptionsFound = await findSubscriptionByOrganizationInteractor(clientId);

      const responseSubscriptions = subscriptionsFound.map(presentSubscription);
      response.status(HttpStatusCode.OK).json({ data: responseSubscriptions });
    } catch (error) {
      next(error);
    }
  },
];

export const findSubscriptionController = [
  validateSchema(clientIdInHeaderSchema),
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
  validateSchema(clientIdInHeaderSchema),
  validateSchema(createSubscriptionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const clientId = request.headers["client-id"]?.toString() ?? "";
      const {
        user_id,
        subscription_plan_id,
        external_subscription_id,
        billing_cycle,
        status,
        is_active,
        renews_at,
        starts_at,
        ends_at,
      } = request.body;

      const subscription = new SubscriptionEntity(
        user_id as string,
        subscription_plan_id as string,
        external_subscription_id as string,
        billing_cycle as string,
        status as string,
        is_active as boolean,
        renews_at as Date,
        starts_at as Date,
        ends_at as Date,
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
  validateSchema(clientIdInHeaderSchema),
  validateSchema(subscriptionKeyParamsSchema),
  validateSchema(updateSubscriptionSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const {
        user_id,
        subscription_plan_id,
        external_subscription_id,
        billing_cycle,
        status,
        is_active,
        renews_at,
        starts_at,
        ends_at,
      } = request.body;

      const searchCriteria: SubscriptionSearchCriteriaInput = { id };

      const subscription: UpdateSubscriptionInput = {
        userId: user_id,
        subscriptionPlanId: subscription_plan_id,
        externalSubscriptionId: external_subscription_id,
        billingCycle: billing_cycle,
        status,
        isActive: is_active,
        renewsAt: renews_at,
        startsAt: starts_at,
        endsAt: ends_at,
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
  validateSchema(clientIdInHeaderSchema),
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
