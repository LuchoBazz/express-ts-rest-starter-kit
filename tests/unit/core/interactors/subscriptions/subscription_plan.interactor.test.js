"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionPlanServiceMock = jest.fn();
const subscription_plan_entity_1 = require("../../../../../src/core/entities/subscriptions/subscription_plan.entity");
const subscription_plan_interactor_1 = require("../../../../../src/core/interactors/subscriptions/subscription_plan.interactor");
const subscription_plan_mock_1 = require("../../../../mocks/subscriptions/subscription_plan.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/subscriptions/subscription_plan.service", () => {
    return {
        findSubscriptionPlanService: subscriptionPlanServiceMock,
        createSubscriptionPlanService: subscriptionPlanServiceMock,
        updateSubscriptionPlanService: subscriptionPlanServiceMock,
        deleteSubscriptionPlanService: subscriptionPlanServiceMock,
    };
});
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe("Given a SubscriptionPlanInteractor", () => {
    let subscriptionPlan;
    beforeEach(() => {
        const subscriptionPlanPrisma = (0, subscription_plan_mock_1.genRandomSubscriptionPlan)();
        subscriptionPlan = subscription_plan_entity_1.SubscriptionPlanEntity.fromPrisma(subscriptionPlanPrisma);
        subscriptionPlanServiceMock.mockImplementation(() => {
            return Promise.resolve(subscriptionPlan);
        });
    });
    afterEach(() => {
        subscriptionPlanServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    // TODO: Add test for tests nullable case
    it("should get subscription plan successfully", async () => {
        const subPlanFound = await (0, subscription_plan_interactor_1.findSubscriptionPlanInteractor)({
            id: subscriptionPlan.getId(),
            clientId: subscriptionPlan.getOrganizationClientId(),
        });
        expect(subPlanFound).toEqual(subscriptionPlan);
        expect(subscriptionPlanServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create subscription plan successfully", async () => {
        const subPlanCreated = await (0, subscription_plan_interactor_1.createSubscriptionPlanInteractor)(subscriptionPlan);
        expect(subPlanCreated).toEqual(subscriptionPlan);
        expect(subscriptionPlanServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should update subscription plan successfully", async () => {
        const subPlanUpdated = await (0, subscription_plan_interactor_1.updateSubscriptionPlanInteractor)({
            id: subscriptionPlan.getId(),
            clientId: subscriptionPlan.getOrganizationClientId(),
        }, {
            name: subscriptionPlan.getName(),
            productId: subscriptionPlan.getProductId(),
            variants: subscriptionPlan.getVariants(),
            slug: subscriptionPlan.getSlug(),
            price: subscriptionPlan.getPrice(),
            href: subscriptionPlan.getHref(),
            billingCycle: subscriptionPlan.getBillingCycle(),
            description: subscriptionPlan.getDescription(),
            nodeQuota: subscriptionPlan.getNodeQuota(),
            features: subscriptionPlan.getFeatures(),
            mostPopular: subscriptionPlan.getMostPopular(),
            tier: subscriptionPlan.getTier(),
            isActive: subscriptionPlan.getIsActive(),
        });
        expect(subPlanUpdated).toEqual(subscriptionPlan);
        expect(subscriptionPlanServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete subscription plan successfully", async () => {
        const subPlanDeleted = await (0, subscription_plan_interactor_1.deleteSubscriptionPlanInteractor)({
            id: subscriptionPlan.getId(),
            clientId: subscriptionPlan.getOrganizationClientId(),
        });
        expect(subPlanDeleted).toEqual(subscriptionPlan);
        expect(subscriptionPlanServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
