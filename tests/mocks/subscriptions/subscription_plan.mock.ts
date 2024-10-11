import { faker } from "@faker-js/faker";

import { SubscriptionPlanPrisma } from "../../../src/core/entities/subscriptions/subscription_plan.entity";

export const genRandomSubscriptionPlan = ({
  subscription_plan_id = faker.string.uuid(),
  subscription_plan_name = faker.commerce.productName(),
  subscription_plan_product_id = faker.string.alpha(20),
  subscription_plan_variants = [faker.string.alpha(10), faker.string.alpha(10)],
  subscription_plan_slug = faker.helpers.slugify(faker.commerce.productName()),
  subscription_plan_price = faker.number.float({ min: 0, max: 1000 }),
  subscription_plan_href = faker.internet.url(),
  subscription_plan_billing_cycle = faker.helpers.arrayElement(["monthly", "yearly"]),
  subscription_plan_description = faker.commerce.productDescription(),
  subscription_plan_node_quota = faker.number.int({ min: 50, max: 500 }),
  subscription_plan_features = faker.helpers.arrayElements([
    { feature: faker.commerce.productAdjective() },
    { feature: faker.commerce.productAdjective() },
  ]),
  subscription_plan_most_popular = faker.datatype.boolean(),
  subscription_plan_tier = faker.number.int({ min: 0, max: 5 }),
  subscription_plan_is_active = faker.datatype.boolean(),
  subscription_plan_organization_client_id = faker.string.alpha(10),
  subscription_plan_created_at = new Date(),
  subscription_plan_updated_at = new Date(),
} = {}): SubscriptionPlanPrisma => {
  return {
    subscription_plan_id,
    subscription_plan_name,
    subscription_plan_product_id,
    subscription_plan_variants,
    subscription_plan_slug,
    subscription_plan_price,
    subscription_plan_href,
    subscription_plan_billing_cycle,
    subscription_plan_description,
    subscription_plan_node_quota,
    subscription_plan_features,
    subscription_plan_most_popular,
    subscription_plan_tier,
    subscription_plan_is_active,
    subscription_plan_organization_client_id,
    subscription_plan_created_at,
    subscription_plan_updated_at,
  };
};
