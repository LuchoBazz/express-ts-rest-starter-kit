import { SubscriptionEntity, SubscriptionResponse } from "../../../core/entities/subscriptions/subscription.entity";

export const presentSubscription = (entity: SubscriptionEntity): SubscriptionResponse => {
  return {
    id: entity.getId(),
    user_id: entity.getUserId(),
    subscription_plan_id: entity.getSubscriptionPlanId(),
    external_subscription_id: entity.getExternalSubscriptionId(),
    billing_cycle: entity.getBillingCycle(),
    status: entity.getStatus(),
    is_active: entity.getIsActive(),
    renews_at: entity.getRenewsAt(),
    starts_at: entity.getStartsAt(),
    ends_at: entity.getEndsAt(),
    client_id: entity.getOrganizationClientId(),
    created_at: entity.getCreatedAt(),
    updated_at: entity.getUpdatedAt(),
  };
};
