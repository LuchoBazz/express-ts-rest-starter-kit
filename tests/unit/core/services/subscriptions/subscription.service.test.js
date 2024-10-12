"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const subscription_entity_1 = require("../../../../../src/core/entities/subscriptions/subscription.entity");
const subscription_service_1 = require("../../../../../src/core/services/subscriptions/subscription.service");
const subscription_mock_1 = require("../../../../mocks/subscriptions/subscription.mock");
const subscriptionMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                subscription: {
                    findUnique: subscriptionMock,
                    create: subscriptionMock,
                    update: subscriptionMock,
                    delete: subscriptionMock,
                },
                $transaction: transactionMock,
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe("Given a subscription service", () => {
    let prismaClient;
    let subscriptionPrisma;
    let subscription;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        subscriptionPrisma = (0, subscription_mock_1.genRandomSubscriptionPrisma)();
        subscription = subscription_entity_1.SubscriptionEntity.fromPrisma(subscriptionPrisma);
        subscriptionMock.mockImplementation(() => {
            return subscriptionPrisma;
        });
        transactionMock.mockImplementation(() => {
            return [subscriptionPrisma];
        });
    });
    afterEach(() => {
        subscriptionMock.mockClear();
        transactionMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get subscription successfully", async () => {
        const foundSubscription = await (0, subscription_service_1.findSubscriptionService)(prismaClient, {
            id: subscription.getId(),
        });
        expect(foundSubscription).toEqual(subscription);
        expect(subscriptionMock).toHaveBeenCalledTimes(1);
    });
    it("should create subscription successfully", async () => {
        const createdSubscription = await (0, subscription_service_1.createSubscriptionService)(prismaClient, subscription);
        expect(createdSubscription).toEqual(subscription);
        expect(subscriptionMock).toHaveBeenCalledTimes(1);
    });
    it("should update subscription successfully", async () => {
        const updatedSubscription = await (0, subscription_service_1.updateSubscriptionService)(prismaClient, {
            id: subscription.getId(),
        }, {
            userId: subscription.getUserId(),
            subscriptionPlanId: subscription.getSubscriptionPlanId(),
            externalSubscriptionId: subscription.getExternalSubscriptionId(),
            billingCycle: subscription.getBillingCycle(),
            status: subscription.getStatus(),
            isActive: subscription.getIsActive(),
            renewsAt: subscription.getRenewsAt(),
            startsAt: subscription.getStartsAt(),
            endsAt: subscription.getEndsAt(),
        });
        expect(updatedSubscription).toEqual(subscription);
        expect(subscriptionMock).toHaveBeenCalledTimes(1);
    });
    it("should delete subscription successfully", async () => {
        const deletedSubscription = await (0, subscription_service_1.deleteSubscriptionService)(prismaClient, {
            id: subscription.getId(),
        });
        expect(deletedSubscription).toEqual(subscription);
        expect(subscriptionMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for testing errors
});
