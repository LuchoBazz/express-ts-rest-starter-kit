"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionInteractor = exports.updateSubscriptionInteractor = exports.createSubscriptionInteractor = exports.findSubscriptionInteractor = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../infrastructure/database/prisma");
const subscription_service_1 = require("../../services/subscriptions/subscription.service");
const findSubscriptionInteractor = async (searchCriteria) => {
    const subscriptionFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, subscription_service_1.findSubscriptionService)(client, searchCriteria);
    });
    if (!subscriptionFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.SUBSCRIPTION_NOT_FOUND);
    }
    return subscriptionFound;
};
exports.findSubscriptionInteractor = findSubscriptionInteractor;
const createSubscriptionInteractor = async (subscription) => {
    const subscriptionCreated = await (0, prisma_1.onSession)((client) => {
        return (0, subscription_service_1.createSubscriptionService)(client, subscription);
    });
    return subscriptionCreated;
};
exports.createSubscriptionInteractor = createSubscriptionInteractor;
const updateSubscriptionInteractor = async (searchCriteria, subscription) => {
    const subscriptionUpdated = await (0, prisma_1.onSession)((client) => {
        return (0, subscription_service_1.updateSubscriptionService)(client, searchCriteria, subscription);
    });
    return subscriptionUpdated;
};
exports.updateSubscriptionInteractor = updateSubscriptionInteractor;
const deleteSubscriptionInteractor = async (searchCriteria) => {
    const subscriptionDeleted = await (0, prisma_1.onSession)((client) => {
        return (0, subscription_service_1.deleteSubscriptionService)(client, searchCriteria);
    });
    return subscriptionDeleted;
};
exports.deleteSubscriptionInteractor = deleteSubscriptionInteractor;
