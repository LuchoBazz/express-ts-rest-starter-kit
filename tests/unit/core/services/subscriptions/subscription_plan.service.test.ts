import { PrismaClient } from "@prisma/client";

import {
  SubscriptionPlanEntity,
  SubscriptionPlanPrisma,
} from "../../../../../src/core/entities/subscriptions/subscription_plan.entity";
import {
  createSubscriptionPlanService,
  deleteSubscriptionPlanService,
  findSubscriptionPlanService,
  updateSubscriptionPlanService,
} from "../../../../../src/core/services/subscriptions/subscription_plan.service";
import { genRandomSubscriptionPlan } from "../../../../mocks/subscriptions/subscription_plan.mock";

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
  let prismaClient: PrismaClient;
  let subscriptionPlanPrisma: SubscriptionPlanPrisma;
  let subscriptionPlan: SubscriptionPlanEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    subscriptionPlanPrisma = genRandomSubscriptionPlan();
    subscriptionPlan = SubscriptionPlanEntity.fromPrisma(subscriptionPlanPrisma);

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
    const foundSubscriptionPlan = await findSubscriptionPlanService(prismaClient, {
      id: subscriptionPlan.getId(),
      clientId: subscriptionPlan.getOrganizationClientId(),
    });

    expect(foundSubscriptionPlan).toEqual(subscriptionPlan);
    expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
  });

  it("should create subscription plan successfully", async () => {
    const createdSubscriptionPlan = await createSubscriptionPlanService(prismaClient, subscriptionPlan);

    expect(createdSubscriptionPlan).toEqual(subscriptionPlan);
    expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
  });

  it("should update subscription plan successfully", async () => {
    const updatedSubscriptionPlan = await updateSubscriptionPlanService(
      prismaClient,
      {
        clientId: subscriptionPlan.getOrganizationClientId(),
        id: subscriptionPlan.getId(),
      },
      {
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
      },
    );

    expect(updatedSubscriptionPlan).toEqual(subscriptionPlan);
    expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
  });

  it("should delete subscription plan successfully", async () => {
    const deletedSubscriptionPlan = await deleteSubscriptionPlanService(prismaClient, {
      id: subscriptionPlan.getId(),
      clientId: subscriptionPlan.getOrganizationClientId(),
    });

    expect(deletedSubscriptionPlan).toEqual(subscriptionPlan);
    expect(subscriptionPlanMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for testing errors
});
