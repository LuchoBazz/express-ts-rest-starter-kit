import { SubscriptionPlanEntity } from "../../../entities/subscriptions/subscription_plan.entity";
import {
  SubscriptionPlanSearchCriteriaInput,
  UpdateSubscriptionPlanInput,
} from "../../../types/subscriptions/subscription_plan.types";

export interface SubscriptionPlanRepository {
  find(client: unknown, clientId: string): Promise<SubscriptionPlanEntity[]>;
  findOne(client: unknown, searchCriteria: SubscriptionPlanSearchCriteriaInput): Promise<SubscriptionPlanEntity | null>;
  create(client: unknown, subscriptionPlan: SubscriptionPlanEntity): Promise<SubscriptionPlanEntity>;
  update(
    client: unknown,
    searchCriteria: SubscriptionPlanSearchCriteriaInput,
    subscriptionPlan: UpdateSubscriptionPlanInput,
  ): Promise<SubscriptionPlanEntity>;
  delete(client: unknown, searchCriteria: SubscriptionPlanSearchCriteriaInput): Promise<SubscriptionPlanEntity>;
}
