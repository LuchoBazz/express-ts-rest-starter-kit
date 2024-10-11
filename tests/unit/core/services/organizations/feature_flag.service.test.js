"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const feature_flag_entity_1 = require("../../../../../src/core/entities/organizations/feature_flag.entity");
const feature_flag_service_1 = require("../../../../../src/core/services/organizations/feature_flag.service");
const feature_flag_mock_1 = require("../../../../mocks/organizations/feature_flag.mock");
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
    let prismaClient;
    let featureFlagPrisma;
    let featureFlag;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        featureFlagPrisma = (0, feature_flag_mock_1.genRandomFeatureFlagPrisma)();
        featureFlag = feature_flag_entity_1.FeatureFlagEntity.fromPrisma(featureFlagPrisma);
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
        const featFlagFound = await (0, feature_flag_service_1.findFeatureFlagService)(prismaClient, {
            key: featureFlag.getKey(),
            clientId: featureFlag.getClientId(),
        });
        expect(featFlagFound).toEqual(featureFlag);
        expect(featureFlagMock).toHaveBeenCalledTimes(1);
    });
    it("should create feature flag successfully", async () => {
        const featFlagCreated = await (0, feature_flag_service_1.createFeatureFlagService)(prismaClient, featureFlag);
        expect(featFlagCreated).toEqual(featureFlag);
        expect(featureFlagMock).toHaveBeenCalledTimes(1);
    });
    it("should update feature flag successfully", async () => {
        const featFlagUpdated = await (0, feature_flag_service_1.updateFeatureFlagService)(prismaClient, {
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
        const featFlagDeleted = await (0, feature_flag_service_1.deleteFeatureFlagService)(prismaClient, {
            key: featureFlag.getKey(),
            clientId: featureFlag.getClientId(),
        });
        expect(featFlagDeleted).toEqual(featureFlag);
        expect(featureFlagMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for testing errors
});
