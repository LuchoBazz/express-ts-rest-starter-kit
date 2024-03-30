import { FeatureFlagEntity, FeatureFlagPrisma } from "../../../src/entities/organizations/feature_flag.entity";
import {
  createFeatureFlagInteractor,
  deleteFeatureFlagInteractor,
  findFeatureFlagInteractor,
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

  // TODO: Add test for tests nullable case
  it("should get feature flag successfully", async () => {
    const featFlagFound = await findFeatureFlagInteractor({
      clientId: featureFlag.getClientId(),
      id: featureFlag.getId(),
    });

    expect(featFlagFound).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create feature flag successfully", async () => {
    const featFlagCreated = await createFeatureFlagInteractor(featureFlag);

    expect(featFlagCreated).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should update feature flag successfully", async () => {
    const featFlagUpdated = await updateFeatureFlagInteractor({
      id: featureFlag.getId(),
      clientId: featureFlag.getClientId(),
      key: featureFlag.getKey(),
      percentage: featureFlag.getPercentage(),
      isExperimental: featureFlag.getIsExperimental(),
      isActive: featureFlag.getIsActive(),
    });

    expect(featFlagUpdated).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete feature flag successfully", async () => {
    const featFlagDeleted = await deleteFeatureFlagInteractor({
      clientId: featureFlag.getClientId(),
      id: featureFlag.getId(),
    });

    expect(featFlagDeleted).toEqual(featureFlag);
    expect(featureFlagMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
