"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const subscription_plan_entity_1 = require("../../../../../src/core/entities/subscriptions/subscription_plan.entity");
const subscription_plan_service_1 = require("../../../../../src/core/services/subscriptions/subscription_plan.service");
const subscription_plan_mock_1 = require("../../../../mocks/subscriptions/subscription_plan.mock");
const subscriptionPlanMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                subscriptionPlan: {
                    findUnique: subscriptionPlanMock,
                    create: subscriptionPlanMock,
                    update: subscriptionPlanMock,
                    delete: subscriptionPlanMock,
                },
                $transaction: transactionMock,
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe("Given a subscription plan service", () => {
    let prismaClient;
    let subscriptionPlanPrisma;
    let subscriptionPlan;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        subscriptionPlanPrisma = (0, subscription_plan_mock_1.genRandomSubscriptionPlan)();
        subscriptionPlan = subscription_plan_entity_1.SubscriptionPlanEntity.fromPrisma(subscriptionPlanPrisma);
        subscriptionPlanMock.mockImplementation(() => {
            return subscriptionPlanPrisma;
        });
        transactionMock.mockImplementation(() => {
            return [subscriptionPlanPrisma];
        });
    });
    afterEach(() => {
        subscriptionPlanMock.mockClear();
        transactionMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get subscription plan successfully", async () => {
        const foundSubscriptionPlan = await (0, subscription_plan_service_1.findSubscriptionPlanService)(prismaClient, {
            id: subscriptionPlan.getId(),
            clientId: subscriptionPlan.getOrganizationClientId(),
        });
        expect(foundSubscriptionPlan).toEqual(subscriptionPlan);
        expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
    });
    it("should create subscription plan successfully", async () => {
        const createdSubscriptionPlan = await (0, subscription_plan_service_1.createSubscriptionPlanService)(prismaClient, subscriptionPlan);
        expect(createdSubscriptionPlan).toEqual(subscriptionPlan);
        expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
    });
    it("should update subscription plan successfully", async () => {
        const updatedSubscriptionPlan = await (0, subscription_plan_service_1.updateSubscriptionPlanService)(prismaClient, {
            clientId: subscriptionPlan.getOrganizationClientId(),
            id: subscriptionPlan.getId(),
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
        expect(updatedSubscriptionPlan).toEqual(subscriptionPlan);
        expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
    });
    it("should delete subscription plan successfully", async () => {
        const deletedSubscriptionPlan = await (0, subscription_plan_service_1.deleteSubscriptionPlanService)(prismaClient, {
            id: subscriptionPlan.getId(),
            clientId: subscriptionPlan.getOrganizationClientId(),
        });
        expect(deletedSubscriptionPlan).toEqual(subscriptionPlan);
        expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for testing errors
});
