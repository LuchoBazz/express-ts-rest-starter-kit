import { faker } from "@faker-js/faker";

import { PaymentPrisma } from "../../../src/core/entities/subscriptions/payment.entity";

export const genRandomPaymentPrisma = ({
  payment_id = faker.string.uuid(),
  payment_subscription_id = faker.string.uuid(),
  payment_amount = faker.number.float({ min: 0, max: 1000, precision: 0.01 }),
  payment_currency = faker.finance.currencyCode(),
  payment_date = faker.date.recent(),
  payment_external_payment_id = faker.string.alpha(10),
  payment_status = faker.helpers.arrayElement(["completed", "failed", "pending"]),
  payment_organization_client_id = faker.string.alpha(10),
  payment_created_at = new Date(),
  payment_updated_at = new Date(),
} = {}): PaymentPrisma => {
  return {
    payment_id,
    payment_subscription_id,
    payment_amount,
    payment_currency,
    payment_date,
    payment_external_payment_id,
    payment_status,
    payment_organization_client_id,
    payment_created_at,
    payment_updated_at,
  };
};
