"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscriptionPlanController = exports.updateSubscriptionPlanController = exports.createSubscriptionPlanController = exports.findSubscriptionPlanController = void 0;
const subscription_plan_entity_1 = require("../../../../core/entities/subscriptions/subscription_plan.entity");
const subscription_plan_interactor_1 = require("../../../../core/interactors/subscriptions/subscription_plan.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const subscription_plan_presenter_1 = require("../../../presenters/subscriptions/subscription_plan.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("../organizations/schemas");
const schemas_2 = require("./schemas");
exports.findSubscriptionPlanController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.subscriptionPlanKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, slug } = request.params;
            const subscriptionPlanFound = await (0, subscription_plan_interactor_1.findSubscriptionPlanInteractor)({ id: slug, clientId });
            const responseSubscriptionPlan = (0, subscription_plan_presenter_1.presentSubscriptionPlan)(subscriptionPlanFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createSubscriptionPlanController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.createSubscriptionPlanSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId } = request.params;
            const { name, productId, variants, slug, price, href, billingCycle, description, nodeQuota, features, mostPopular, tier, } = request.body;
            const isActive = true;
            const createdAt = new Date();
            const updatedAt = new Date();
            const subscriptionPlan = new subscription_plan_entity_1.SubscriptionPlanEntity(name, productId, variants, slug, price, href, billingCycle, description, nodeQuota, features, mostPopular, tier, isActive, clientId, createdAt, updatedAt);
            const subscriptionPlanCreated = await (0, subscription_plan_interactor_1.createSubscriptionPlanInteractor)(subscriptionPlan);
            const responseSubscriptionPlan = (0, subscription_plan_presenter_1.presentSubscriptionPlan)(subscriptionPlanCreated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.updateSubscriptionPlanController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.subscriptionPlanKeyParamsSchema),
    (0, validator_1.validateSchema)(schemas_2.updateSubscriptionPlanSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, slug } = request.params;
            const { price, billingCycle, description, nodeQuota, features, mostPopular, tier, isActive } = request.body;
            const searchCriteria = { id: slug, clientId };
            const subscriptionPlan = {
                slug,
                price: price !== null && price !== void 0 ? price : undefined,
                billingCycle: billingCycle !== null && billingCycle !== void 0 ? billingCycle : undefined,
                description: description !== null && description !== void 0 ? description : undefined,
                nodeQuota: nodeQuota !== null && nodeQuota !== void 0 ? nodeQuota : undefined,
                features: features !== null && features !== void 0 ? features : undefined,
                mostPopular: mostPopular !== null && mostPopular !== void 0 ? mostPopular : undefined,
                tier: tier !== null && tier !== void 0 ? tier : undefined,
                isActive: isActive !== null && isActive !== void 0 ? isActive : undefined,
            };
            const subscriptionPlanUpdated = await (0, subscription_plan_interactor_1.updateSubscriptionPlanInteractor)(searchCriteria, subscriptionPlan);
            const responseSubscriptionPlan = (0, subscription_plan_presenter_1.presentSubscriptionPlan)(subscriptionPlanUpdated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deleteSubscriptionPlanController = [
    (0, validator_1.validateSchema)(schemas_1.organizationSchema),
    (0, validator_1.validateSchema)(schemas_2.subscriptionPlanKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { client_id: clientId, slug } = request.params;
            const subscriptionPlanDeleted = await (0, subscription_plan_interactor_1.deleteSubscriptionPlanInteractor)({ id: slug, clientId });
            const responseSubscriptionPlan = (0, subscription_plan_presenter_1.presentSubscriptionPlan)(subscriptionPlanDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responseSubscriptionPlan });
        }
        catch (error) {
            next(error);
        }
    },
];
