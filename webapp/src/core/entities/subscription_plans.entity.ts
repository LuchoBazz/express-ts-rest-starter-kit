export interface SubscriptionPlanBackend {
  id: string;
  name: string;
  product_id: string;
  variants: string[];
  slug: string;
  price: number;
  final_price: number;
  currency: string;
  currency_symbol: string;
  href: string | null;
  billing_cycle: string;
  description: string;
  node_quota: number;
  features: any;
  most_popular: boolean;
  tier: number;
  is_active: boolean;
  client_id: string;
  created_at: Date;
  updated_at: Date;
}
