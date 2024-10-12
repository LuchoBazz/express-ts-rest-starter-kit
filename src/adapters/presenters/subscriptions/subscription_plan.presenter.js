"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentSubscriptionPlan = void 0;
const presentSubscriptionPlan = (entity) => {
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
exports.presentSubscriptionPlan = presentSubscriptionPlan;
