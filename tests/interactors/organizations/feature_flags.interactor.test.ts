import {
  FeatureFlagEntity,
  FeatureFlagPrisma,
} from "../../../src/controllers/entities/organizations/feature_flag.entity";
import { createFeatureFlagInteractor } from "../../../src/interactors/organizations/feature_flags/feature_flag.interactor";
import { genRandomFeatureFlagPrisma } from "../../mocks/organizations/feature_flag.mock";

const createFeatureFlagMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        featureFlag: { create: createFeatureFlagMock },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a createFeatureFlagInteractor", () => {
  let featureFlagPrisma: FeatureFlagPrisma;
  let featureFlag: FeatureFlagEntity;

  beforeEach(() => {
    featureFlagPrisma = genRandomFeatureFlagPrisma();
    featureFlag = FeatureFlagEntity.fromPrisma(featureFlagPrisma);

    createFeatureFlagMock.mockImplementation(() => {
      return featureFlagPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [featureFlagPrisma];
    });
  });

  afterEach(() => {
    createFeatureFlagMock.mockClear();
    transactionMock.mockClear();
  });

  it("should create feature flag correctly", async () => {
    const createdFeatureFlag = await createFeatureFlagInteractor(featureFlag);

    expect(createdFeatureFlag).toEqual(featureFlag);
    expect(createFeatureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
