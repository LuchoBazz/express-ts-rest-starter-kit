import { SubscriptionEntity, SubscriptionResponse } from "../../../core/entities/subscriptions/subscription.entity";

export const presentSubscription = (entity: SubscriptionEntity): SubscriptionResponse => {
  return {
    id: entity.getId(),
    userId: entity.getUserId(),
    subscriptionPlanId: entity.getSubscriptionPlanId(),
    externalSubscriptionId: entity.getExternalSubscriptionId(),
    billingCycle: entity.getBillingCycle(),
    status: entity.getStatus(),
    isActive: entity.getIsActive(),
    renewsAt: entity.getRenewsAt(),
    startsAt: entity.getStartsAt(),
    endsAt: entity.getEndsAt(),
    organizationClientId: entity.getOrganizationClientId(),
    createdAt: entity.getCreatedAt(),
    updatedAt: entity.getUpdatedAt(),
  };
};
