import { PaymentEntity, PaymentResponse } from "../../../core/entities/subscriptions/payment.entity";

export const presentPayment = (entity: PaymentEntity): PaymentResponse => {
  return {
    id: entity.getId(),
    subscription_id: entity.getSubscriptionId(),
    amount: entity.getAmount(),
    currency: entity.getCurrency(),
    date: entity.getDate(),
    external_payment_id: entity.getExternalPaymentId(),
    status: entity.getStatus(),
    client_id: entity.getOrganizationClientId(),
    created_at: entity.getCreatedAt(),
    updated_at: entity.getUpdatedAt(),
  };
};
