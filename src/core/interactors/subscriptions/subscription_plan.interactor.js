"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionPlanInteractor = exports.updateSubscriptionPlanInteractor = exports.createSubscriptionPlanInteractor = exports.findSubscriptionPlanInteractor = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../infrastructure/database/prisma");
const subscription_plan_service_1 = require("../../services/subscriptions/subscription_plan.service");
const findSubscriptionPlanInteractor = async (searchCriteria) => {
    const subscriptionPlanFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, subscription_plan_service_1.findSubscriptionPlanService)(client, searchCriteria);
    });
    if (!subscriptionPlanFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.SUBSCRIPTION_PLAN_NOT_FOUND);
    }
    return subscriptionPlanFound;
};
exports.findSubscriptionPlanInteractor = findSubscriptionPlanInteractor;
const createSubscriptionPlanInteractor = async (subscriptionPlan) => {
    const subscriptionPlanCreated = await (0, prisma_1.onSession)((client) => {
        return (0, subscription_plan_service_1.createSubscriptionPlanService)(client, subscriptionPlan);
    });
    return subscriptionPlanCreated;
};
exports.createSubscriptionPlanInteractor = createSubscriptionPlanInteractor;
const updateSubscriptionPlanInteractor = async (searchCriteria, subscriptionPlan) => {
    const subscriptionPlanUpdated = await (0, prisma_1.onSession)((client) => {
        return (0, subscription_plan_service_1.updateSubscriptionPlanService)(client, searchCriteria, subscriptionPlan);
    });
    return subscriptionPlanUpdated;
};
exports.updateSubscriptionPlanInteractor = updateSubscriptionPlanInteractor;
const deleteSubscriptionPlanInteractor = async (searchCriteria) => {
    const subscriptionPlanDeleted = await (0, prisma_1.onSession)((client) => {
        return (0, subscription_plan_service_1.deleteSubscriptionPlanService)(client, searchCriteria);
    });
    return subscriptionPlanDeleted;
};
exports.deleteSubscriptionPlanInteractor = deleteSubscriptionPlanInteractor;
