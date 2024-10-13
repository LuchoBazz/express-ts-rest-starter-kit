import { NextFunction, Request, Response } from "express";

import { SubscriptionPlanEntity } from "../../../../core/entities/subscriptions/subscription_plan.entity";
import {
  createSubscriptionPlanInteractor,
  deleteSubscriptionPlanInteractor,
  findSubscriptionPlanByOrganizationInteractor,
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

export const findSubscriptionPlanByOrganizationController = [
  validateSchema(organizationSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { client_id: clientId } = request.params;

      const subscriptionPlansFound = await findSubscriptionPlanByOrganizationInteractor(clientId);

      const responseSubscriptionPlans = subscriptionPlansFound.map(presentSubscriptionPlan);
      response.status(HttpStatusCode.OK).json({ data: responseSubscriptionPlans });
    } catch (error) {
      next(error);
    }
  },
];

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
        product_id: productId,
        variants,
        slug,
        price,
        href,
        billing_cycle: billingCycle,
        description,
        node_quota: nodeQuota,
        features,
        most_popular: mostPopular,
        tier,
      } = request.body;
      const is_active = true;
      const created_at = new Date();
      const updated_at = new Date();

      const subscription_plan = new SubscriptionPlanEntity(
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
        is_active as boolean,
        clientId,
        created_at,
        updated_at,
      );

      const subscription_plan_created = await createSubscriptionPlanInteractor(subscription_plan);

      const response_subscription_plan = presentSubscriptionPlan(subscription_plan_created);
      response.status(HttpStatusCode.OK).json({ data: response_subscription_plan });
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
      const { price, billing_cycle, description, node_quota, features, most_popular, tier, is_active } = request.body;

      const searchCriteria: SubscriptionPlanSearchCriteriaInput = { id: slug, clientId };

      const subscriptionPlan: UpdateSubscriptionPlanInput = {
        slug,
        price: price ?? undefined,
        billingCycle: billing_cycle ?? undefined,
        description: description ?? undefined,
        nodeQuota: node_quota ?? undefined,
        features: features ?? undefined,
        mostPopular: most_popular ?? undefined,
        tier: tier ?? undefined,
        isActive: is_active ?? undefined,
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
