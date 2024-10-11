"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomSubscriptionPlan = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomSubscriptionPlan = ({ subscription_plan_id = faker_1.faker.string.uuid(), subscription_plan_name = faker_1.faker.commerce.productName(), subscription_plan_product_id = faker_1.faker.string.alpha(20), subscription_plan_variants = [faker_1.faker.string.alpha(10), faker_1.faker.string.alpha(10)], subscription_plan_slug = faker_1.faker.helpers.slugify(faker_1.faker.commerce.productName()), subscription_plan_price = faker_1.faker.number.float({ min: 0, max: 1000 }), subscription_plan_href = faker_1.faker.internet.url(), subscription_plan_billing_cycle = faker_1.faker.helpers.arrayElement(["monthly", "yearly"]), subscription_plan_description = faker_1.faker.commerce.productDescription(), subscription_plan_node_quota = faker_1.faker.number.int({ min: 50, max: 500 }), subscription_plan_features = faker_1.faker.helpers.arrayElements([
    { feature: faker_1.faker.commerce.productAdjective() },
    { feature: faker_1.faker.commerce.productAdjective() },
]), subscription_plan_most_popular = faker_1.faker.datatype.boolean(), subscription_plan_tier = faker_1.faker.number.int({ min: 0, max: 5 }), subscription_plan_is_active = faker_1.faker.datatype.boolean(), subscription_plan_organization_client_id = faker_1.faker.string.alpha(10), subscription_plan_created_at = new Date(), subscription_plan_updated_at = new Date(), } = {}) => {
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
exports.genRandomSubscriptionPlan = genRandomSubscriptionPlan;
