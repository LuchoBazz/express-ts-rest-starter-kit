export interface UpdateSubscriptionPlanInput {
  name?: string;
  productId?: string;
  variants?: string[];
  slug?: string;
  price?: number;
  href?: string | null;
  billingCycle?: string;
  description?: string;
  nodeQuota?: number;
  features?: any;
  mostPopular?: boolean;
  tier?: number;
  isActive?: boolean;
}

export interface SubscriptionPlanSearchCriteriaInput {
  id: string;
  clientId: string;
}
