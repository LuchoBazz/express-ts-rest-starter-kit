import { Entity } from "../entity";

export interface SubscriptionPrisma {
  subscriptions_id: string;
  subscriptions_user_id: string;
  subscriptions_subscription_plan_id: string;
  subscriptions_external_subscription_id: string;
  subscriptions_billing_cycle: string;
  subscriptions_status: string;
  subscriptions_is_active: boolean;
  subscriptions_renews_at: Date;
  subscriptions_starts_at: Date;
  subscriptions_ends_at: Date;
  subscriptions_organization_client_id: string;
  subscriptions_created_at: Date;
  subscriptions_updated_at: Date;
}

export interface SubscriptionResponse {
  id: string;
  user_id: string;
  subscription_plan_id: string;
  external_subscription_id: string;
  billing_cycle: string;
  status: string;
  is_active: boolean;
  renews_at: Date;
  starts_at: Date;
  ends_at: Date;
  client_id: string;
  created_at: Date;
  updated_at: Date;
}

export class SubscriptionEntity extends Entity {
  protected userId: string;
  protected subscriptionPlanId: string;
  protected externalSubscriptionId: string;
  protected billingCycle: string;
  protected status: string;
  protected isActive: boolean;
  protected renewsAt: Date;
  protected startsAt: Date;
  protected endsAt: Date;
  protected organizationClientId: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(
    userId: string,
    subscriptionPlanId: string,
    externalSubscriptionId: string,
    billingCycle: string,
    status: string,
    isActive: boolean,
    renewsAt: Date,
    startsAt: Date,
    endsAt: Date,
    organizationClientId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.userId = userId;
    this.subscriptionPlanId = subscriptionPlanId;
    this.externalSubscriptionId = externalSubscriptionId;
    this.billingCycle = billingCycle;
    this.status = status;
    this.isActive = isActive;
    this.renewsAt = renewsAt;
    this.startsAt = startsAt;
    this.endsAt = endsAt;
    this.organizationClientId = organizationClientId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromPrisma(payload: SubscriptionPrisma): SubscriptionEntity {
    const subscription = new SubscriptionEntity(
      payload.subscriptions_user_id,
      payload.subscriptions_subscription_plan_id,
      payload.subscriptions_external_subscription_id,
      payload.subscriptions_billing_cycle,
      payload.subscriptions_status,
      payload.subscriptions_is_active,
      payload.subscriptions_renews_at,
      payload.subscriptions_starts_at,
      payload.subscriptions_ends_at,
      payload.subscriptions_organization_client_id,
      payload.subscriptions_created_at,
      payload.subscriptions_updated_at,
    );
    subscription.setId(payload.subscriptions_id);
    return subscription;
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getSubscriptionPlanId(): string {
    return this.subscriptionPlanId;
  }

  public setSubscriptionPlanId(subscriptionPlanId: string): void {
    this.subscriptionPlanId = subscriptionPlanId;
  }

  public getExternalSubscriptionId(): string {
    return this.externalSubscriptionId;
  }

  public setExternalSubscriptionId(externalSubscriptionId: string): void {
    this.externalSubscriptionId = externalSubscriptionId;
  }

  public getBillingCycle(): string {
    return this.billingCycle;
  }

  public setBillingCycle(billingCycle: string): void {
    this.billingCycle = billingCycle;
  }

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  public getRenewsAt(): Date {
    return this.renewsAt;
  }

  public setRenewsAt(renewsAt: Date): void {
    this.renewsAt = renewsAt;
  }

  public getStartsAt(): Date {
    return this.startsAt;
  }

  public setStartsAt(startsAt: Date): void {
    this.startsAt = startsAt;
  }

  public getEndsAt(): Date {
    return this.endsAt;
  }

  public setEndsAt(endsAt: Date): void {
    this.endsAt = endsAt;
  }

  public getOrganizationClientId(): string {
    return this.organizationClientId;
  }

  public setOrganizationClientId(organizationClientId: string): void {
    this.organizationClientId = organizationClientId;
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
