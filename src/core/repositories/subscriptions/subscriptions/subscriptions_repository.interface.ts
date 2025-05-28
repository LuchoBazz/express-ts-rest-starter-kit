import { SubscriptionEntity } from "../../../entities/subscriptions/subscription.entity";
import {
  SubscriptionSearchCriteriaInput,
  UpdateSubscriptionInput,
} from "../../../types/subscriptions/subscripition.types";

export interface SubscriptionRepository {
  find(client: unknown, clientId: string): Promise<SubscriptionEntity[]>;
  findOne(client: unknown, searchCriteria: SubscriptionSearchCriteriaInput): Promise<SubscriptionEntity | null>;
  create(client: unknown, subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
  update(
    client: unknown,
    searchCriteria: SubscriptionSearchCriteriaInput,
    subscription: UpdateSubscriptionInput,
  ): Promise<SubscriptionEntity>;
  delete(client: unknown, searchCriteria: SubscriptionSearchCriteriaInput): Promise<SubscriptionEntity>;
}
