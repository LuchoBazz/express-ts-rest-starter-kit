import { PrismaClient } from "@prisma/client";

import { FeatureFlagEntity, FeatureFlagPrisma } from "../../../../src/core/entities/organizations/feature_flag.entity";
import {
  createFeatureFlagService,
  deleteFeatureFlagService,
  findFeatureFlagService,
  updateFeatureFlagService,
} from "../../../../src/core/services/organizations/feature_flag.service";
import { genRandomFeatureFlagPrisma } from "../../../mocks/organizations/feature_flag.mock";

const featureFlagMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        featureFlag: {
          findUnique: featureFlagMock,
          create: featureFlagMock,
          update: featureFlagMock,
          delete: featureFlagMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a feature flag service", () => {
  let prismaClient: PrismaClient;
  let featureFlagPrisma: FeatureFlagPrisma;
  let featureFlag: FeatureFlagEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    featureFlagPrisma = genRandomFeatureFlagPrisma();
    featureFlag = FeatureFlagEntity.fromPrisma(featureFlagPrisma);

    featureFlagMock.mockImplementation(() => {
      return featureFlagPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [featureFlagPrisma];
    });
  });

  afterEach(() => {
    featureFlagMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  // TODO: Add test for tests nullable case
  it("should get feature flag successfully", async () => {
    const featFlagFound = await findFeatureFlagService(prismaClient, {
      key: featureFlag.getKey(),
      clientId: featureFlag.getClientId(),
    });

    expect(featFlagFound).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
  });

  it("should create feature flag successfully", async () => {
    const featFlagCreated = await createFeatureFlagService(prismaClient, featureFlag);

    expect(featFlagCreated).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
  });

  it("should update feature flag successfully", async () => {
    const featFlagUpdated = await updateFeatureFlagService(prismaClient, {
      clientId: featureFlag.getClientId(),
      key: featureFlag.getKey(),
      percentage: featureFlag.getPercentage(),
      isExperimental: featureFlag.getIsExperimental(),
      isActive: featureFlag.getIsActive(),
    });

    expect(featFlagUpdated).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
  });

  it("should delete feature flag successfully", async () => {
    const featFlagDeleted = await deleteFeatureFlagService(prismaClient, {
      key: featureFlag.getKey(),
      clientId: featureFlag.getClientId(),
    });

    expect(featFlagDeleted).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for testing errors
});
