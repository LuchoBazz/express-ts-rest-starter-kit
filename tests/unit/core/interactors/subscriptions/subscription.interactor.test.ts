const subscriptionServiceMock = jest.fn();

import { ErrorMessage } from "../../../../../src/adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../../../src/adapters/api/errors/not_found.error";
import { SubscriptionEntity } from "../../../../../src/core/entities/subscriptions/subscription.entity";
import {
  createSubscriptionInteractor,
  deleteSubscriptionInteractor,
  findSubscriptionByOrganizationInteractor,
  findSubscriptionInteractor,
  updateSubscriptionInteractor,
} from "../../../../../src/core/interactors/subscriptions/subscription.interactor";
import { genRandomSubscriptionPrisma } from "../../../../mocks/subscriptions/subscription.mock";

const disconnectMock = jest.fn();

jest.mock("../../../../../src/core/services/subscriptions/subscription.service", () => {
  return {
    findSubscriptionService: subscriptionServiceMock,
    createSubscriptionService: subscriptionServiceMock,
    updateSubscriptionService: subscriptionServiceMock,
    deleteSubscriptionService: subscriptionServiceMock,
    findSubscriptionByOrganizationService: subscriptionServiceMock,
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
  let subscription: SubscriptionEntity;

  beforeEach(() => {
    const subscriptionPrisma = genRandomSubscriptionPrisma();
    subscription = SubscriptionEntity.fromPrisma(subscriptionPrisma);

    subscriptionServiceMock.mockImplementation(() => {
      return Promise.resolve(subscription);
    });
  });

  afterEach(() => {
    subscriptionServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get subscription successfully", async () => {
    const subFound = await findSubscriptionInteractor({
      id: subscription.getId(),
    });

    expect(subFound).toEqual(subscription);
    expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create subscription successfully", async () => {
    const subCreated = await createSubscriptionInteractor(subscription);

    expect(subCreated).toEqual(subscription);
    expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should update subscription successfully", async () => {
    const subUpdated = await updateSubscriptionInteractor(
      {
        id: subscription.getId(),
      },
      {
        userId: subscription.getUserId(),
        subscriptionPlanId: subscription.getSubscriptionPlanId(),
        externalSubscriptionId: subscription.getExternalSubscriptionId(),
        billingCycle: subscription.getBillingCycle(),
        status: subscription.getStatus(),
        isActive: subscription.getIsActive(),
        renewsAt: subscription.getRenewsAt(),
        startsAt: subscription.getStartsAt(),
        endsAt: subscription.getEndsAt(),
      },
    );

    expect(subUpdated).toEqual(subscription);
    expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete subscription successfully", async () => {
    const subDeleted = await deleteSubscriptionInteractor({
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

    await expect(
      findSubscriptionInteractor({
        id: subscription.getId(),
      }),
    ).rejects.toThrow(new NotFoundError(ErrorMessage.SUBSCRIPTION_NOT_FOUND));

    expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should find subscriptions by organization successfully", async () => {
    const clientId = "client123";
    subscriptionServiceMock.mockImplementationOnce(() => {
      return Promise.resolve([subscription]);
    });

    const subscriptionsFound = await findSubscriptionByOrganizationInteractor(clientId);

    expect(subscriptionsFound).toEqual([subscription]);
    expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
    expect(subscriptionServiceMock).toHaveBeenCalledWith(expect.anything(), clientId);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should return an empty array when no subscriptions are found", async () => {
    const clientId = "client123";
    subscriptionServiceMock.mockImplementationOnce(() => {
      return Promise.resolve([]);
    });

    const subscriptionsFound = await findSubscriptionByOrganizationInteractor(clientId);

    expect(subscriptionsFound).toEqual([]);
    expect(subscriptionServiceMock).toHaveBeenCalledTimes(1);
    expect(subscriptionServiceMock).toHaveBeenCalledWith(expect.anything(), clientId);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
