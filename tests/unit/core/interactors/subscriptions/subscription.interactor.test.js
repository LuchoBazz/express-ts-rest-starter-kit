"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscriptionServiceMock = jest.fn();
const errors_enum_1 = require("../../../../../src/adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../../src/adapters/api/errors/not_found.error");
const subscription_entity_1 = require("../../../../../src/core/entities/subscriptions/subscription.entity");
const subscription_interactor_1 = require("../../../../../src/core/interactors/subscriptions/subscription.interactor");
const subscription_mock_1 = require("../../../../mocks/subscriptions/subscription.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/subscriptions/subscription.service", () => {
    return {
        findSubscriptionService: subscriptionServiceMock,
        createSubscriptionService: subscriptionServiceMock,
        updateSubscriptionService: subscriptionServiceMock,
        deleteSubscriptionService: subscriptionServiceMock,
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
describe("Given a SubscriptionInteractor", () => {
    let subscription;
    beforeEach(() => {
        const subscriptionPrisma = (0, subscription_mock_1.genRandomSubscriptionPrisma)();
        subscription = subscription_entity_1.SubscriptionEntity.fromPrisma(subscriptionPrisma);
        subscriptionServiceMock.mockImplementation(() => {
            return Promise.resolve(subscription);
        });
    });
    afterEach(() => {
        subscriptionServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get subscription successfully", async () => {
        const subFound = await (0, subscription_interactor_1.findSubscriptionInteractor)({
            id: subscription.getId(),
        });
        expect(subFound).toEqual(subscription);
        expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create subscription successfully", async () => {
        const subCreated = await (0, subscription_interactor_1.createSubscriptionInteractor)(subscription);
        expect(subCreated).toEqual(subscription);
        expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should update subscription successfully", async () => {
        const subUpdated = await (0, subscription_interactor_1.updateSubscriptionInteractor)({
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
        expect(subUpdated).toEqual(subscription);
        expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete subscription successfully", async () => {
        const subDeleted = await (0, subscription_interactor_1.deleteSubscriptionInteractor)({
            id: subscription.getId(),
        });
        expect(subDeleted).toEqual(subscription);
        expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should throw NotFoundError when subscription not found", async () => {
        subscriptionServiceMock.mockImplementationOnce(() => {
            return Promise.resolve(null);
        });
        await expect((0, subscription_interactor_1.findSubscriptionInteractor)({
            id: subscription.getId(),
        })).rejects.toThrow(new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.SUBSCRIPTION_NOT_FOUND));
        expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
