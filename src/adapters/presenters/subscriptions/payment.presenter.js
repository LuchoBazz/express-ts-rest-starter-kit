"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentPayment = void 0;
const presentPayment = (entity) => {
    return {
        id: entity.getId(),
        subscriptionId: entity.getSubscriptionId(),
        amount: entity.getAmount(),
        currency: entity.getCurrency(),
        date: entity.getDate(),
        externalPaymentId: entity.getExternalPaymentId(),
        status: entity.getStatus(),
        organizationClientId: entity.getOrganizationClientId(),
        createdAt: entity.getCreatedAt(),
        updatedAt: entity.getUpdatedAt(),
    };
};
exports.presentPayment = presentPayment;
