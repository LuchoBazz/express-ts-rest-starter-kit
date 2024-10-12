"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionPlanService = exports.updateSubscriptionPlanService = exports.createSubscriptionPlanService = exports.findSubscriptionPlanService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const subscription_plan_entity_1 = require("../../entities/subscriptions/subscription_plan.entity");
const findSubscriptionPlanService = async (client, searchCriteria) => {
    try {
        const { id, clientId } = searchCriteria;
        const record = await client.subscriptionPlan.findUnique({
            where: {
                unique_subscription_plan_id_and_subscription_organization_client_id: {
                    subscription_plan_id: id,
                    subscription_plan_organization_client_id: clientId,
                },
            },
        });
        return record ? subscription_plan_entity_1.SubscriptionPlanEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findSubscriptionPlanService = findSubscriptionPlanService;
const createSubscriptionPlanService = async (client, subscriptionPlan) => {
    try {
        const record = client.subscriptionPlan.create({
            data: {
                subscription_plan_id: subscriptionPlan.getId(),
                subscription_plan_name: subscriptionPlan.getName(),
                subscription_plan_product_id: subscriptionPlan.getProductId(),
                subscription_plan_variants: subscriptionPlan.getVariants(),
                subscription_plan_slug: subscriptionPlan.getSlug(),
                subscription_plan_price: subscriptionPlan.getPrice(),
                subscription_plan_href: subscriptionPlan.getHref(),
                subscription_plan_billing_cycle: subscriptionPlan.getBillingCycle(),
                subscription_plan_description: subscriptionPlan.getDescription(),
                subscription_plan_node_quota: subscriptionPlan.getNodeQuota(),
                subscription_plan_features: subscriptionPlan.getFeatures(),
                subscription_plan_most_popular: subscriptionPlan.getMostPopular(),
                subscription_plan_tier: subscriptionPlan.getTier(),
                subscription_plan_is_active: subscriptionPlan.getIsActive(),
                subscription_plan_organization_client_id: subscriptionPlan.getOrganizationClientId(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return subscription_plan_entity_1.SubscriptionPlanEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createSubscriptionPlanService = createSubscriptionPlanService;
const updateSubscriptionPlanService = async (client, searchCriteria, subscriptionPlan) => {
    try {
        const record = client.subscriptionPlan.update({
            where: {
                unique_subscription_plan_id_and_subscription_organization_client_id: {
                    subscription_plan_id: searchCriteria.id,
                    subscription_plan_organization_client_id: searchCriteria.clientId,
                },
            },
            data: {
                subscription_plan_name: subscriptionPlan.name,
                subscription_plan_product_id: subscriptionPlan.productId,
                subscription_plan_variants: subscriptionPlan.variants,
                subscription_plan_slug: subscriptionPlan.slug,
                subscription_plan_price: subscriptionPlan.price,
                subscription_plan_href: subscriptionPlan.href,
                subscription_plan_billing_cycle: subscriptionPlan.billingCycle,
                subscription_plan_description: subscriptionPlan.description,
                subscription_plan_node_quota: subscriptionPlan.nodeQuota,
                subscription_plan_features: subscriptionPlan.features,
                subscription_plan_most_popular: subscriptionPlan.mostPopular,
                subscription_plan_tier: subscriptionPlan.tier,
                subscription_plan_is_active: subscriptionPlan.isActive,
            },
        });
        const [recordUpdated] = await client.$transaction([record]);
        return subscription_plan_entity_1.SubscriptionPlanEntity.fromPrisma(recordUpdated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.updateSubscriptionPlanService = updateSubscriptionPlanService;
const deleteSubscriptionPlanService = async (client, searchCriteria) => {
    try {
        const { id, clientId } = searchCriteria;
        const record = client.subscriptionPlan.delete({
            where: {
                unique_subscription_plan_id_and_subscription_organization_client_id: {
                    subscription_plan_id: id,
                    subscription_plan_organization_client_id: clientId,
                },
            },
        });
        const [recordDeleted] = await client.$transaction([record]);
        return subscription_plan_entity_1.SubscriptionPlanEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteSubscriptionPlanService = deleteSubscriptionPlanService;
