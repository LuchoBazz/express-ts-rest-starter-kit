import {
  SubscriptionPlanEntity,
  SubscriptionPlanResponse,
} from "../../../core/entities/subscriptions/subscription_plan.entity";

export const presentSubscriptionPlan = (entity: SubscriptionPlanEntity): SubscriptionPlanResponse => {
  return {
    id: entity.getId(),
    name: entity.getName(),
    productId: entity.getProductId(),
    variants: entity.getVariants(),
    slug: entity.getSlug(),
    price: entity.getPrice(),
    href: entity.getHref(),
    billingCycle: entity.getBillingCycle(),
    description: entity.getDescription(),
    nodeQuota: entity.getNodeQuota(),
    features: entity.getFeatures(),
    mostPopular: entity.getMostPopular(),
    tier: entity.getTier(),
    isActive: entity.getIsActive(),
    organizationClientId: entity.getOrganizationClientId(),
    createdAt: entity.getCreatedAt(),
    updatedAt: entity.getUpdatedAt(),
  };
};
