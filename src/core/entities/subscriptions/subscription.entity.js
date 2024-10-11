"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionEntity = void 0;
const entity_1 = require("../entity");
class SubscriptionEntity extends entity_1.Entity {
    constructor(userId, subscriptionPlanId, externalSubscriptionId, billingCycle, status, isActive, renewsAt, startsAt, endsAt, organizationClientId, createdAt, updatedAt) {
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
    static fromPrisma(payload) {
        return new SubscriptionEntity(payload.subscriptions_user_id, payload.subscriptions_subscription_plan_id, payload.subscriptions_external_subscription_id, payload.subscriptions_billing_cycle, payload.subscriptions_status, payload.subscriptions_is_active, payload.subscriptions_renews_at, payload.subscriptions_starts_at, payload.subscriptions_ends_at, payload.subscriptions_organization_client_id, payload.subscriptions_created_at, payload.subscriptions_updated_at);
    }
    getUserId() {
        return this.userId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    getSubscriptionPlanId() {
        return this.subscriptionPlanId;
    }
    setSubscriptionPlanId(subscriptionPlanId) {
        this.subscriptionPlanId = subscriptionPlanId;
    }
    getExternalSubscriptionId() {
        return this.externalSubscriptionId;
    }
    setExternalSubscriptionId(externalSubscriptionId) {
        this.externalSubscriptionId = externalSubscriptionId;
    }
    getBillingCycle() {
        return this.billingCycle;
    }
    setBillingCycle(billingCycle) {
        this.billingCycle = billingCycle;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getIsActive() {
        return this.isActive;
    }
    setIsActive(isActive) {
        this.isActive = isActive;
    }
    getRenewsAt() {
        return this.renewsAt;
    }
    setRenewsAt(renewsAt) {
        this.renewsAt = renewsAt;
    }
    getStartsAt() {
        return this.startsAt;
    }
    setStartsAt(startsAt) {
        this.startsAt = startsAt;
    }
    getEndsAt() {
        return this.endsAt;
    }
    setEndsAt(endsAt) {
        this.endsAt = endsAt;
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
exports.SubscriptionEntity = SubscriptionEntity;
