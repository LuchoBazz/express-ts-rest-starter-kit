const featureFlagServiceMock = jest.fn();

import { FeatureFlagEntity, FeatureFlagPrisma } from "../../../src/entities/organizations/feature_flag.entity";
import {
  createFeatureFlagInteractor,
  deleteFeatureFlagInteractor,
  findFeatureFlagInteractor,
  updateFeatureFlagInteractor,
} from "../../../src/interactors/organizations/feature_flag/feature_flag.interactor";
import { genRandomFeatureFlagPrisma } from "../../mocks/organizations/feature_flag.mock";

const disconnectMock = jest.fn();

jest.mock("../../../src/services/organizations/feature_flag.service", () => {
  return {
    findFeatureFlagService: featureFlagServiceMock,
    createFeatureFlagService: featureFlagServiceMock,
    updateFeatureFlagService: featureFlagServiceMock,
    deleteFeatureFlagService: featureFlagServiceMock,
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

describe("Given a createFeatureFlagInteractor", () => {
  let featureFlagPrisma: FeatureFlagPrisma;
  let featureFlag: FeatureFlagEntity;

  beforeEach(() => {
    featureFlagPrisma = genRandomFeatureFlagPrisma();
    featureFlag = FeatureFlagEntity.fromPrisma(featureFlagPrisma);

    featureFlagServiceMock.mockImplementation(() => {
      return featureFlag;
    });
  });

  afterEach(() => {
    featureFlagServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  // TODO: Add test for tests nullable case
  it("should get feature flag successfully", async () => {
    const featFlagFound = await findFeatureFlagInteractor({
      clientId: featureFlag.getClientId(),
      id: featureFlag.getId(),
    });

    expect(featFlagFound).toEqual(featureFlag);
    expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create feature flag successfully", async () => {
    const featFlagCreated = await createFeatureFlagInteractor(featureFlag);

    expect(featFlagCreated).toEqual(featureFlag);
    expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
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
    expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete feature flag successfully", async () => {
    const featFlagDeleted = await deleteFeatureFlagInteractor({
      clientId: featureFlag.getClientId(),
      id: featureFlag.getId(),
    });

    expect(featFlagDeleted).toEqual(featureFlag);
    expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
