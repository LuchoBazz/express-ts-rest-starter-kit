export interface SubscriptionSearchCriteriaInput {
  id: string;
}

export interface UpdateSubscriptionInput {
  userId?: string;
  subscriptionPlanId?: string;
  externalSubscriptionId?: string;
  billingCycle?: string;
  status?: string;
  isActive?: boolean;
  renewsAt?: Date;
  startsAt?: Date;
  endsAt?: Date;
  organizationClientId?: string;
}
