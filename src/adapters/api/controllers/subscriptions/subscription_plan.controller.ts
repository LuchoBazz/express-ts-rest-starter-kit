import { NextFunction, Request, Response } from "express";

import { SubscriptionPlanEntity } from "../../../../core/entities/subscriptions/subscription_plan.entity";
import {
  createSubscriptionPlanInteractor,
  deleteSubscriptionPlanInteractor,
  findSubscriptionPlanInteractor,
  updateSubscriptionPlanInteractor,
} from "../../../../core/interactors/subscriptions/subscription_plan.interactor";
import {
  SubscriptionPlanSearchCriteriaInput,
  UpdateSubscriptionPlanInput,
} from "../../../../core/types/subscriptions/subscription_plan.types";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentSubscriptionPlan } from "../../../presenters/subscriptions/subscription_plan.presenter";
import { validateSchema } from "../../validator";
import { organizationSchema } from "../organizations/schemas";
import { createSubscriptionPlanSchema, subscriptionPlanKeyParamsSchema, updateSubscriptionPlanSchema } from "./schemas";

export const findSubscriptionPlanController = [
  validateSchema(organizationSchema),
  validateSchema(subscriptionPlanKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, slug } = request.params;

      const subscriptionPlanFound = await findSubscriptionPlanInteractor({ id: slug, clientId });

      const responseSubscriptionPlan = presentSubscriptionPlan(subscriptionPlanFound);
      response.status(HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
    } catch (error) {
      next(error);
    }
  },
];

export const createSubscriptionPlanController = [
  validateSchema(organizationSchema),
  validateSchema(createSubscriptionPlanSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;
      const {
        name,
        productId,
        variants,
        slug,
        price,
        href,
        billingCycle,
        description,
        nodeQuota,
        features,
        mostPopular,
        tier,
      } = request.body;
      const isActive = true;
      const createdAt = new Date();
      const updatedAt = new Date();

      const subscriptionPlan = new SubscriptionPlanEntity(
        name as string,
        productId as string,
        variants as string[],
        slug as string,
        price as number,
        href as string,
        billingCycle as string,
        description as string,
        nodeQuota as number,
        features as string,
        mostPopular as boolean,
        tier as number,
        isActive as boolean,
        clientId,
        createdAt,
        updatedAt,
      );

      const subscriptionPlanCreated = await createSubscriptionPlanInteractor(subscriptionPlan);

      const responseSubscriptionPlan = presentSubscriptionPlan(subscriptionPlanCreated);
      response.status(HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
    } catch (error) {
      next(error);
    }
  },
];

export const updateSubscriptionPlanController = [
  validateSchema(organizationSchema),
  validateSchema(subscriptionPlanKeyParamsSchema),
  validateSchema(updateSubscriptionPlanSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, slug } = request.params;
      const { price, billingCycle, description, nodeQuota, features, mostPopular, tier, isActive } = request.body;

      const searchCriteria: SubscriptionPlanSearchCriteriaInput = { id: slug, clientId };

      const subscriptionPlan: UpdateSubscriptionPlanInput = {
        slug,
        price: price ?? undefined,
        billingCycle: billingCycle ?? undefined,
        description: description ?? undefined,
        nodeQuota: nodeQuota ?? undefined,
        features: features ?? undefined,
        mostPopular: mostPopular ?? undefined,
        tier: tier ?? undefined,
        isActive: isActive ?? undefined,
      };

      const subscriptionPlanUpdated = await updateSubscriptionPlanInteractor(searchCriteria, subscriptionPlan);

      const responseSubscriptionPlan = presentSubscriptionPlan(subscriptionPlanUpdated);
      response.status(HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteSubscriptionPlanController = [
  validateSchema(organizationSchema),
  validateSchema(subscriptionPlanKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId, slug } = request.params;

      const subscriptionPlanDeleted = await deleteSubscriptionPlanInteractor({ id: slug, clientId });

      const responseSubscriptionPlan = presentSubscriptionPlan(subscriptionPlanDeleted);
      response.status(HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
    } catch (error) {
      next(error);
    }
  },
];
