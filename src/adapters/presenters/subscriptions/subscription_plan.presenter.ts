import {
  FeatureSubscriptionPlan,
  OfferingItem,
  SubscriptionPlanEntity,
  SubscriptionPlanResponse,
} from "../../../core/entities/subscriptions/subscription_plan.entity";

export const presentFeatureSubscriptionPlan = (feature: any): FeatureSubscriptionPlan => {
  const included = feature.offerings?.included || [];
  const notIncluded = feature.offerings?.not_included || [];
  const callToAction = feature.call_to_action;

  return {
    offerings: {
      included: included.map((item: OfferingItem) => ({ name: item.name || "" })),
      not_included: notIncluded.map((item: OfferingItem) => ({ name: item.name || "" })),
    },
    call_to_action: {
      text: callToAction?.text || "",
      emoji: callToAction?.emoji || "",
      color: callToAction?.color || "green",
    },
  };
};

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
    features: presentFeatureSubscriptionPlan(entity.getFeatures()),
    most_popular: entity.getMostPopular(),
    tier: entity.getTier(),
    is_active: entity.getIsActive(),
    client_id: entity.getOrganizationClientId(),
    created_at: entity.getCreatedAt(),
    updated_at: entity.getUpdatedAt(),
  };
};
