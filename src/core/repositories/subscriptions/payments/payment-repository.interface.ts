import { PaymentEntity } from "../../../entities/subscriptions/payment.entity";
import { PaymentSearchCriteriaInput, UpdatePaymentInput } from "../../../types/subscriptions/payment.types";

export interface PaymentRepository {
  findOne(client: unknown, searchCriteria: PaymentSearchCriteriaInput): Promise<PaymentEntity | null>;
  create(client: unknown, payment: PaymentEntity): Promise<PaymentEntity>;
  update(
    client: unknown,
    searchCriteria: PaymentSearchCriteriaInput,
    payment: UpdatePaymentInput,
  ): Promise<PaymentEntity>;
  delete(client: unknown, searchCriteria: PaymentSearchCriteriaInput): Promise<PaymentEntity>;
}
