"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionService = exports.updateSubscriptionService = exports.createSubscriptionService = exports.findSubscriptionService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const subscription_entity_1 = require("../../entities/subscriptions/subscription.entity");
const findSubscriptionService = async (client, searchCriteria) => {
    try {
        const { id } = searchCriteria;
        const record = await client.subscription.findUnique({
            where: {
                subscriptions_id: id,
            },
        });
        return record ? subscription_entity_1.SubscriptionEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findSubscriptionService = findSubscriptionService;
const createSubscriptionService = async (client, subscription) => {
    try {
        const record = client.subscription.create({
            data: {
                subscriptions_user_id: subscription.getUserId(),
                subscriptions_subscription_plan_id: subscription.getSubscriptionPlanId(),
                subscriptions_external_subscription_id: subscription.getExternalSubscriptionId(),
                subscriptions_billing_cycle: subscription.getBillingCycle(),
                subscriptions_status: subscription.getStatus(),
                subscriptions_is_active: subscription.getIsActive(),
                subscriptions_renews_at: subscription.getRenewsAt(),
                subscriptions_starts_at: subscription.getStartsAt(),
                subscriptions_ends_at: subscription.getEndsAt(),
                subscriptions_organization_client_id: subscription.getOrganizationClientId(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return subscription_entity_1.SubscriptionEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createSubscriptionService = createSubscriptionService;
const updateSubscriptionService = async (client, searchCriteria, subscription) => {
    try {
        const record = client.subscription.update({
            where: {
                subscriptions_id: searchCriteria.id,
            },
            data: {
                subscriptions_user_id: subscription.userId,
                subscriptions_subscription_plan_id: subscription.subscriptionPlanId,
                subscriptions_external_subscription_id: subscription.externalSubscriptionId,
                subscriptions_billing_cycle: subscription.billingCycle,
                subscriptions_status: subscription.status,
                subscriptions_is_active: subscription.isActive,
                subscriptions_renews_at: subscription.renewsAt,
                subscriptions_starts_at: subscription.startsAt,
                subscriptions_ends_at: subscription.endsAt,
            },
        });
        const [recordUpdated] = await client.$transaction([record]);
        return subscription_entity_1.SubscriptionEntity.fromPrisma(recordUpdated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.updateSubscriptionService = updateSubscriptionService;
const deleteSubscriptionService = async (client, searchCriteria) => {
    try {
        const { id } = searchCriteria;
        const record = client.subscription.delete({
            where: {
                subscriptions_id: id,
            },
        });
        const [recordDeleted] = await client.$transaction([record]);
        return subscription_entity_1.SubscriptionEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteSubscriptionService = deleteSubscriptionService;
