import { Entity } from "../entity";

interface OfferingItem {
  name: string;
}

interface Offerings {
  included: OfferingItem[];
  not_included: OfferingItem[];
}

interface CallToAction {
  url: string;
  text: string;
  emoji: string;
}

export interface FeatureSubscriptionPlan {
  offerings: Offerings;
  call_to_action: CallToAction;
}

export interface SubscriptionPlanPrisma {
  subscription_plan_id: string;
  subscription_plan_name: string;
  subscription_plan_product_id: string;
  subscription_plan_variants: string[];
  subscription_plan_slug: string;
  subscription_plan_price: number;
  subscription_plan_final_price: number;
  subscription_plan_currency: string;
  subscription_plan_currency_symbol: string;
  subscription_plan_href: string | null;
  subscription_plan_billing_cycle: string;
  subscription_plan_description: string;
  subscription_plan_node_quota: number;
  subscription_plan_features: any;
  subscription_plan_most_popular: boolean;
  subscription_plan_tier: number;
  subscription_plan_is_active: boolean;
  subscription_plan_organization_client_id: string;
  subscription_plan_created_at: Date;
  subscription_plan_updated_at: Date;
}

export interface SubscriptionPlanResponse {
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
  features: FeatureSubscriptionPlan;
  most_popular: boolean;
  tier: number;
  is_active: boolean;
  client_id: string;
  created_at: Date;
  updated_at: Date;
}

export class SubscriptionPlanEntity extends Entity {
  protected name: string;
  protected productId: string;
  protected variants: string[];
  protected slug: string;
  protected price: number;
  protected finalPrice: number;
  protected currency: string;
  protected currencySymbol: string;
  protected href: string | null;
  protected billingCycle: string;
  protected description: string;
  protected nodeQuota: number;
  protected features: any;
  protected mostPopular: boolean;
  protected tier: number;
  protected isActive: boolean;
  protected organizationClientId: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(
    name: string,
    productId: string,
    variants: string[],
    slug: string,
    price: number,
    finalPrice: number,
    currency: string,
    currencySymbol: string,
    href: string | null,
    billingCycle: string,
    description: string,
    nodeQuota: number,
    features: any,
    mostPopular: boolean,
    tier: number,
    isActive: boolean,
    organizationClientId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.name = name;
    this.productId = productId;
    this.variants = variants;
    this.slug = slug;
    this.price = price;
    this.finalPrice = finalPrice;
    this.currency = currency;
    this.currencySymbol = currencySymbol;
    this.href = href;
    this.billingCycle = billingCycle;
    this.description = description;
    this.nodeQuota = nodeQuota;
    this.features = features;
    this.mostPopular = mostPopular;
    this.tier = tier;
    this.isActive = isActive;
    this.organizationClientId = organizationClientId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromPrisma(payload: SubscriptionPlanPrisma): SubscriptionPlanEntity {
    const subscriptionPlan = new SubscriptionPlanEntity(
      payload.subscription_plan_name,
      payload.subscription_plan_product_id,
      payload.subscription_plan_variants,
      payload.subscription_plan_slug,
      payload.subscription_plan_price,
      payload.subscription_plan_final_price,
      payload.subscription_plan_currency,
      payload.subscription_plan_currency_symbol,
      payload.subscription_plan_href,
      payload.subscription_plan_billing_cycle,
      payload.subscription_plan_description,
      payload.subscription_plan_node_quota,
      payload.subscription_plan_features,
      payload.subscription_plan_most_popular,
      payload.subscription_plan_tier,
      payload.subscription_plan_is_active,
      payload.subscription_plan_organization_client_id,
      payload.subscription_plan_created_at,
      payload.subscription_plan_updated_at,
    );
    subscriptionPlan.setId(payload.subscription_plan_id);
    return subscriptionPlan;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getProductId(): string {
    return this.productId;
  }

  public setProductId(productId: string): void {
    this.productId = productId;
  }

  public getVariants(): string[] {
    return this.variants;
  }

  public setVariants(variants: string[]): void {
    this.variants = variants;
  }

  public getSlug(): string {
    return this.slug;
  }

  public setSlug(slug: string): void {
    this.slug = slug;
  }

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getFinalPrice(): number {
    return this.finalPrice;
  }

  public setFinalPrice(finalPrice: number): void {
    this.finalPrice = finalPrice;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getCurrencySymbol(): string {
    return this.currencySymbol;
  }

  public setCurrencySymbol(symbol: string): void {
    this.currencySymbol = symbol;
  }

  public getHref(): string | null {
    return this.href;
  }

  public setHref(href: string | null): void {
    this.href = href;
  }

  public getBillingCycle(): string {
    return this.billingCycle;
  }

  public setBillingCycle(billingCycle: string): void {
    this.billingCycle = billingCycle;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getNodeQuota(): number {
    return this.nodeQuota;
  }

  public setNodeQuota(nodeQuota: number): void {
    this.nodeQuota = nodeQuota;
  }

  public getFeatures(): any {
    return this.features;
  }

  public setFeatures(features: any): void {
    this.features = features;
  }

  public getMostPopular(): boolean {
    return this.mostPopular;
  }

  public setMostPopular(mostPopular: boolean): void {
    this.mostPopular = mostPopular;
  }

  public getTier(): number {
    return this.tier;
  }

  public setTier(tier: number): void {
    this.tier = tier;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  public getOrganizationClientId(): string {
    return this.organizationClientId;
  }

  public setOrganizationClientId(clientId: string): void {
    this.organizationClientId = clientId;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
