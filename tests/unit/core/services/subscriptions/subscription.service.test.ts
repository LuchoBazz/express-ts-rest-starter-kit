import { PrismaClient } from "@prisma/client";

import {
  SubscriptionEntity,
  SubscriptionPrisma,
} from "../../../../../src/core/entities/subscriptions/subscription.entity";
import {
  createSubscriptionService,
  deleteSubscriptionService,
  findSubscriptionByOrganizationService,
  findSubscriptionService,
  updateSubscriptionService,
} from "../../../../../src/core/services/subscriptions/subscription.service";
import { genRandomSubscriptionPrisma } from "../../../../mocks/subscriptions/subscription.mock";

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
          findMany: subscriptionMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a subscription service", () => {
  let prismaClient: PrismaClient;
  let subscriptionPrisma: SubscriptionPrisma;
  let subscription: SubscriptionEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    subscriptionPrisma = genRandomSubscriptionPrisma();
    subscription = SubscriptionEntity.fromPrisma(subscriptionPrisma);

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
    const foundSubscription = await findSubscriptionService(prismaClient, {
      id: subscription.getId(),
    });

    expect(foundSubscription).toEqual(subscription);
    expect(subscriptionMock).toHaveBeenCalledTimes(1);
  });

  it("should create subscription successfully", async () => {
    const createdSubscription = await createSubscriptionService(prismaClient, subscription);

    expect(createdSubscription).toEqual(subscription);
    expect(subscriptionMock).toHaveBeenCalledTimes(1);
  });

  it("should update subscription successfully", async () => {
    const updatedSubscription = await updateSubscriptionService(
      prismaClient,
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

    expect(updatedSubscription).toEqual(subscription);
    expect(subscriptionMock).toHaveBeenCalledTimes(1);
  });

  it("should delete subscription successfully", async () => {
    const deletedSubscription = await deleteSubscriptionService(prismaClient, {
      id: subscription.getId(),
    });

    expect(deletedSubscription).toEqual(subscription);
    expect(subscriptionMock).toHaveBeenCalledTimes(1);
  });

  it("should find subscriptions by organization successfully", async () => {
    const clientId = "DEMO";
    subscriptionMock.mockImplementationOnce(() => {
      return [subscriptionPrisma, subscriptionPrisma];
    });

    const foundSubscriptions = await findSubscriptionByOrganizationService(prismaClient, clientId);

    expect(foundSubscriptions).toEqual([subscription, subscription]);
    expect(subscriptionMock).toHaveBeenCalledTimes(1);
    expect(subscriptionMock).toHaveBeenCalledWith({
      where: {
        subscriptions_organization_client_id: clientId,
      },
    });
  });
});
