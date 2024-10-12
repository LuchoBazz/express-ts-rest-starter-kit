export interface PaymentSearchCriteriaInput {
  id: string;
}

export interface UpdatePaymentInput {
  id?: string;
  subscriptionId?: string;
  amount?: number;
  currency?: string;
  date?: Date;
  externalPaymentId?: string;
  status?: string;
  organizationClientId?: string;
}
