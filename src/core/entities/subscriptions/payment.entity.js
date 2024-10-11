"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentEntity = void 0;
const entity_1 = require("../entity");
class PaymentEntity extends entity_1.Entity {
    constructor(subscriptionId, amount, currency, date, externalPaymentId, status, organizationClientId, createdAt, updatedAt) {
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
    static fromPrisma(payload) {
        const payment = new PaymentEntity(payload.payment_subscription_id, payload.payment_amount, payload.payment_currency, payload.payment_date, payload.payment_external_payment_id, payload.payment_status, payload.payment_organization_client_id, payload.payment_created_at, payload.payment_updated_at);
        payment.setId(payload.payment_id);
        return payment;
    }
    getSubscriptionId() {
        return this.subscriptionId;
    }
    setSubscriptionId(subscriptionId) {
        this.subscriptionId = subscriptionId;
    }
    getAmount() {
        return this.amount;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    getCurrency() {
        return this.currency;
    }
    setCurrency(currency) {
        this.currency = currency;
    }
    getDate() {
        return this.date;
    }
    setDate(date) {
        this.date = date;
    }
    getExternalPaymentId() {
        return this.externalPaymentId;
    }
    setExternalPaymentId(externalPaymentId) {
        this.externalPaymentId = externalPaymentId;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getOrganizationClientId() {
        return this.organizationClientId;
    }
    setOrganizationClientId(organizationClientId) {
        this.organizationClientId = organizationClientId;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(createdAt) {
        this.createdAt = createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(updatedAt) {
        this.updatedAt = updatedAt;
    }
}
exports.PaymentEntity = PaymentEntity;
