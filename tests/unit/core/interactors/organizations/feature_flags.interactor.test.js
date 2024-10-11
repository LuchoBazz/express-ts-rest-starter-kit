"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const featureFlagServiceMock = jest.fn();
const feature_flag_entity_1 = require("../../../../../src/core/entities/organizations/feature_flag.entity");
const feature_flag_interactor_1 = require("../../../../../src/core/interactors/organizations/feature_flag/feature_flag.interactor");
const feature_flag_mock_1 = require("../../../../mocks/organizations/feature_flag.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/organizations/feature_flag.service", () => {
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
    let featureFlag;
    beforeEach(() => {
        const featureFlagPrisma = (0, feature_flag_mock_1.genRandomFeatureFlagPrisma)();
        featureFlag = feature_flag_entity_1.FeatureFlagEntity.fromPrisma(featureFlagPrisma);
        featureFlagServiceMock.mockImplementation(() => {
            return Promise.resolve(featureFlag);
        });
    });
    afterEach(() => {
        featureFlagServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    // TODO: Add test for tests nullable case
    it("should get feature flag successfully", async () => {
        const featFlagFound = await (0, feature_flag_interactor_1.findFeatureFlagInteractor)({
            key: featureFlag.getKey(),
            clientId: featureFlag.getClientId(),
        });
        expect(featFlagFound).toEqual(featureFlag);
        expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create feature flag successfully", async () => {
        const featFlagCreated = await (0, feature_flag_interactor_1.createFeatureFlagInteractor)(featureFlag);
        expect(featFlagCreated).toEqual(featureFlag);
        expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should update feature flag successfully", async () => {
        const featFlagUpdated = await (0, feature_flag_interactor_1.updateFeatureFlagInteractor)({
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
        const featFlagDeleted = await (0, feature_flag_interactor_1.deleteFeatureFlagInteractor)({
            key: featureFlag.getKey(),
            clientId: featureFlag.getClientId(),
        });
        expect(featFlagDeleted).toEqual(featureFlag);
        expect(featureFlagServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
