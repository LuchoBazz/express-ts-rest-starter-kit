import { faker } from "@faker-js/faker";

import { SubscriptionPrisma } from "../../../src/core/entities/subscriptions/subscription.entity";

export const genRandomSubscriptionPrisma = ({
  subscriptions_id = faker.string.uuid(),
  subscriptions_user_id = faker.string.uuid(),
  subscriptions_subscription_plan_id = faker.string.uuid(),
  subscriptions_external_subscription_id = faker.string.alpha(10),
  subscriptions_billing_cycle = faker.helpers.arrayElement(["monthly", "yearly"]),
  subscriptions_status = faker.helpers.arrayElement(["active", "cancelled", "past_due", "paused"]),
  subscriptions_is_active = true,
  subscriptions_renews_at = faker.date.future(),
  subscriptions_starts_at = faker.date.recent(),
  subscriptions_ends_at = faker.date.future(),
  subscriptions_organization_client_id = faker.string.alpha(10),
  subscriptions_created_at = new Date(),
  subscriptions_updated_at = new Date(),
} = {}): SubscriptionPrisma => {
  return {
    subscriptions_id,
    subscriptions_user_id,
    subscriptions_subscription_plan_id,
    subscriptions_external_subscription_id,
    subscriptions_billing_cycle,
    subscriptions_status,
    subscriptions_is_active,
    subscriptions_renews_at,
    subscriptions_starts_at,
    subscriptions_ends_at,
    subscriptions_organization_client_id,
    subscriptions_created_at,
    subscriptions_updated_at,
  };
};
