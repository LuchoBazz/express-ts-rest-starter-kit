import { Entity } from "../entity";

export interface PaymentPrisma {
  payment_id: string;
  payment_subscription_id: string;
  payment_amount: number;
  payment_currency: string;
  payment_date: Date;
  payment_external_payment_id: string;
  payment_status: string;
  payment_organization_client_id: string;
  payment_created_at: Date;
  payment_updated_at: Date;
}

export interface PaymentResponse {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  date: Date;
  externalPaymentId: string;
  status: string;
  organizationClientId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PaymentEntity extends Entity {
  protected subscriptionId: string;
  protected amount: number;
  protected currency: string;
  protected date: Date;
  protected externalPaymentId: string;
  protected status: string;
  protected organizationClientId: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(
    subscriptionId: string,
    amount: number,
    currency: string,
    date: Date,
    externalPaymentId: string,
    status: string,
    organizationClientId: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super();
    this.subscriptionId = subscriptionId;
    this.amount = amount;
    this.currency = currency;
    this.date = date;
    this.externalPaymentId = externalPaymentId;
    this.status = status;
    this.organizationClientId = organizationClientId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromPrisma(payload: PaymentPrisma): PaymentEntity {
    const payment = new PaymentEntity(
      payload.payment_subscription_id,
      payload.payment_amount,
      payload.payment_currency,
      payload.payment_date,
      payload.payment_external_payment_id,
      payload.payment_status,
      payload.payment_organization_client_id,
      payload.payment_created_at,
      payload.payment_updated_at,
    );
    payment.setId(payload.payment_id);
    return payment;
  }

  public getSubscriptionId(): string {
    return this.subscriptionId;
  }

  public setSubscriptionId(subscriptionId: string): void {
    this.subscriptionId = subscriptionId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getDate(): Date {
    return this.date;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public getExternalPaymentId(): string {
    return this.externalPaymentId;
  }

  public setExternalPaymentId(externalPaymentId: string): void {
    this.externalPaymentId = externalPaymentId;
  }

  public getStatus(): string {
    return this.status;
  }

  public setStatus(status: string): void {
    this.status = status;
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
