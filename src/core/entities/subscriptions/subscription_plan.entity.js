"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlanEntity = void 0;
const entity_1 = require("../entity");
class SubscriptionPlanEntity extends entity_1.Entity {
    constructor(name, productId, variants, slug, price, href, billingCycle, description, nodeQuota, features, mostPopular, tier, isActive, organizationClientId, createdAt, updatedAt) {
        super();
        this.name = name;
        this.productId = productId;
        this.variants = variants;
        this.slug = slug;
        this.price = price;
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
    static fromPrisma(payload) {
        const subscriptionPlan = new SubscriptionPlanEntity(payload.subscription_plan_name, payload.subscription_plan_product_id, payload.subscription_plan_variants, payload.subscription_plan_slug, payload.subscription_plan_price, payload.subscription_plan_href, payload.subscription_plan_billing_cycle, payload.subscription_plan_description, payload.subscription_plan_node_quota, payload.subscription_plan_features, payload.subscription_plan_most_popular, payload.subscription_plan_tier, payload.subscription_plan_is_active, payload.subscription_plan_organization_client_id, payload.subscription_plan_created_at, payload.subscription_plan_updated_at);
        return subscriptionPlan;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getProductId() {
        return this.productId;
    }
    setProductId(productId) {
        this.productId = productId;
    }
    getVariants() {
        return this.variants;
    }
    setVariants(variants) {
        this.variants = variants;
    }
    getSlug() {
        return this.slug;
    }
    setSlug(slug) {
        this.slug = slug;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
    getHref() {
        return this.href;
    }
    setHref(href) {
        this.href = href;
    }
    getBillingCycle() {
        return this.billingCycle;
    }
    setBillingCycle(billingCycle) {
        this.billingCycle = billingCycle;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getNodeQuota() {
        return this.nodeQuota;
    }
    setNodeQuota(nodeQuota) {
        this.nodeQuota = nodeQuota;
    }
    getFeatures() {
        return this.features;
    }
    setFeatures(features) {
        this.features = features;
    }
    getMostPopular() {
        return this.mostPopular;
    }
    setMostPopular(mostPopular) {
        this.mostPopular = mostPopular;
    }
    getTier() {
        return this.tier;
    }
    setTier(tier) {
        this.tier = tier;
    }
    getIsActive() {
        return this.isActive;
    }
    setIsActive(isActive) {
        this.isActive = isActive;
    }
    getOrganizationClientId() {
        return this.organizationClientId;
    }
    setOrganizationClientId(clientId) {
        this.organizationClientId = clientId;
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
exports.SubscriptionPlanEntity = SubscriptionPlanEntity;
