import { PaymentEntity, PaymentResponse } from "../../../core/entities/subscriptions/payment.entity";

export const presentPayment = (entity: PaymentEntity): PaymentResponse => {
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
