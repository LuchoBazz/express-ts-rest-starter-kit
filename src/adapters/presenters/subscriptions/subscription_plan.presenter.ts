import {
  SubscriptionPlanEntity,
  SubscriptionPlanResponse,
} from "../../../core/entities/subscriptions/subscription_plan.entity";

export const presentSubscriptionPlan = (entity: SubscriptionPlanEntity): SubscriptionPlanResponse => {
  return {
    id: entity.getId(),
    name: entity.getName(),
    product_id: entity.getProductId(),
    variants: entity.getVariants(),
    slug: entity.getSlug(),
    price: entity.getPrice(),
    final_price: entity.getFinalPrice(),
    currency: entity.getCurrency(),
    currency_symbol: entity.getCurrencySymbol(),
    href: entity.getHref(),
    billing_cycle: entity.getBillingCycle(),
    description: entity.getDescription(),
    node_quota: entity.getNodeQuota(),
    features: entity.getFeatures(),
    most_popular: entity.getMostPopular(),
    tier: entity.getTier(),
    is_active: entity.getIsActive(),
    client_id: entity.getOrganizationClientId(),
    created_at: entity.getCreatedAt(),
    updated_at: entity.getUpdatedAt(),
  };
};
