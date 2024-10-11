"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const configuration_entity_1 = require("../../../../../src/core/entities/organizations/configuration.entity");
const configuration_service_1 = require("../../../../../src/core/services/organizations/configuration.service");
const configuration_mock_1 = require("../../../../mocks/organizations/configuration.mock");
const configurationMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                configuration: {
                    findUnique: configurationMock,
                    create: configurationMock,
                    update: configurationMock,
                    delete: configurationMock,
                },
                $transaction: transactionMock,
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe("Given a configuration service", () => {
    let prismaClient;
    let configurationPrisma;
    let configuration;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        configurationPrisma = (0, configuration_mock_1.genRandomConfigurationPrisma)();
        configuration = configuration_entity_1.ConfigurationEntity.fromPrisma(configurationPrisma);
        configurationMock.mockImplementation(() => {
            return configurationPrisma;
        });
        transactionMock.mockImplementation(() => {
            return [configurationPrisma];
        });
    });
    afterEach(() => {
        configurationMock.mockClear();
        transactionMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get configuration successfully", async () => {
        const configFound = await (0, configuration_service_1.findConfigurationService)(prismaClient, {
            key: configuration.getKey(),
            clientId: configuration.getClientId(),
        });
        expect(configFound).toEqual(configuration);
        expect(configurationMock).toHaveBeenCalledTimes(1);
    });
    it("should create configuration successfully", async () => {
        const configCreated = await (0, configuration_service_1.createConfigurationService)(prismaClient, configuration);
        expect(configCreated).toEqual(configuration);
        expect(configurationMock).toHaveBeenCalledTimes(1);
    });
    it("should update configuration successfully", async () => {
        const configUpdated = await (0, configuration_service_1.updateConfigurationService)(prismaClient, {
            clientId: configuration.getClientId(),
            key: configuration.getKey(),
            value: configuration.getValue(),
            type: configuration.getType(),
        });
        expect(configUpdated).toEqual(configuration);
        expect(configurationMock).toHaveBeenCalledTimes(1);
    });
    it("should delete configuration successfully", async () => {
        const configDeleted = await (0, configuration_service_1.deleteConfigurationService)(prismaClient, {
            key: configuration.getKey(),
            clientId: configuration.getClientId(),
        });
        expect(configDeleted).toEqual(configuration);
        expect(configurationMock).toHaveBeenCalledTimes(1);
    });
});
