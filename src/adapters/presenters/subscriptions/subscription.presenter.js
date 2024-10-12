"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentSubscription = void 0;
const presentSubscription = (entity) => {
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
exports.presentSubscription = presentSubscription;
