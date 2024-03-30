import { FeatureFlagEntity, FeatureFlagPrisma } from "../../../src/entities/organizations/feature_flag.entity";
import {
  createFeatureFlagInteractor,
  updateFeatureFlagInteractor,
} from "../../../src/interactors/organizations/feature_flag.interactor";
import { genRandomFeatureFlagPrisma } from "../../mocks/organizations/feature_flag.mock";

const featureFlagMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        featureFlag: {
          create: featureFlagMock,
          update: featureFlagMock,
        },
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

  it("should create feature flag correctly", async () => {
    const featFlagCreated = await createFeatureFlagInteractor(featureFlag);

    expect(featFlagCreated).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should update feature flag correctly", async () => {
    const featFlagCreated = await updateFeatureFlagInteractor({
      id: featureFlag.getId(),
      clientId: featureFlag.getClientId(),
      key: featureFlag.getKey(),
      percentage: featureFlag.getPercentage(),
      isExperimental: featureFlag.getIsExperimental(),
      isActive: featureFlag.getIsActive(),
    });

    expect(featFlagCreated).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
