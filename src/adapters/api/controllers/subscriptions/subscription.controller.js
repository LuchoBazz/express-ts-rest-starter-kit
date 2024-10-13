"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionController = exports.updateSubscriptionController = exports.createSubscriptionController = exports.findSubscriptionController = void 0;
const subscription_entity_1 = require("../../../../core/entities/subscriptions/subscription.entity");
const subscription_interactor_1 = require("../../../../core/interactors/subscriptions/subscription.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const subscription_presenter_1 = require("../../../presenters/subscriptions/subscription.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("../organizations/schemas");
const schemas_2 = require("./schemas");
exports.findSubscriptionController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.subscriptionKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const subscriptionFound = await (0, subscription_interactor_1.findSubscriptionInteractor)({ id });
            const responseSubscription = (0, subscription_presenter_1.presentSubscription)(subscriptionFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscription });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createSubscriptionController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.createSubscriptionSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const { user_id, subscription_plan_id, external_subscription_id, billing_cycle, status, is_active, renews_at, starts_at, ends_at, } = request.body;
            const subscription = new subscription_entity_1.SubscriptionEntity(user_id, subscription_plan_id, external_subscription_id, billing_cycle, status, is_active, renews_at, starts_at, ends_at, clientId, new Date(), new Date());
            const subscriptionCreated = await (0, subscription_interactor_1.createSubscriptionInteractor)(subscription);
            const responseSubscription = (0, subscription_presenter_1.presentSubscription)(subscriptionCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscription });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.updateSubscriptionController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.subscriptionKeyParamsSchema),
    (0, validator_1.validateSchema)(schemas_2.updateSubscriptionSchema),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const { user_id, subscription_plan_id, external_subscription_id, billing_cycle, status, is_active, renews_at, starts_at, ends_at, } = request.body;
            const searchCriteria = { id };
            const subscription = {
                userId: user_id,
                subscriptionPlanId: subscription_plan_id,
                externalSubscriptionId: external_subscription_id,
                billingCycle: billing_cycle,
                status,
                isActive: is_active,
                renewsAt: renews_at,
                startsAt: starts_at,
                endsAt: ends_at,
            };
            const subscriptionUpdated = await (0, subscription_interactor_1.updateSubscriptionInteractor)(searchCriteria, subscription);
            const responseSubscription = (0, subscription_presenter_1.presentSubscription)(subscriptionUpdated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscription });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deleteSubscriptionController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.subscriptionKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { id } = request.params;
            const subscriptionDeleted = await (0, subscription_interactor_1.deleteSubscriptionInteractor)({ id });
            const responseSubscription = (0, subscription_presenter_1.presentSubscription)(subscriptionDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscription });
        }
        catch (error) {
            next(error);
        }
    },
];
