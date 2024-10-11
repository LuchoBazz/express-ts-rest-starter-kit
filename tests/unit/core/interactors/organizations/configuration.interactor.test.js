"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configurationServiceMock = jest.fn();
const configuration_entity_1 = require("../../../../../src/core/entities/organizations/configuration.entity");
const configuration_interactor_1 = require("../../../../../src/core/interactors/organizations/configuration/configuration.interactor");
const configuration_mock_1 = require("../../../../mocks/organizations/configuration.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/organizations/configuration.service", () => {
    return {
        findConfigurationService: configurationServiceMock,
        createConfigurationService: configurationServiceMock,
        updateConfigurationService: configurationServiceMock,
        deleteConfigurationService: configurationServiceMock,
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
describe("Given a createConfigurationInteractor", () => {
    let configuration;
    beforeEach(() => {
        const configurationPrisma = (0, configuration_mock_1.genRandomConfigurationPrisma)();
        configuration = configuration_entity_1.ConfigurationEntity.fromPrisma(configurationPrisma);
        configurationServiceMock.mockImplementation(() => {
            return Promise.resolve(configuration);
        });
    });
    afterEach(() => {
        configurationServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get configuration successfully", async () => {
        const configFound = await (0, configuration_interactor_1.findConfigurationInteractor)({
            key: configuration.getKey(),
            clientId: configuration.getClientId(),
        });
        expect(configFound).toEqual(configuration);
        expect(configurationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create configuration successfully", async () => {
        const configCreated = await (0, configuration_interactor_1.createConfigurationInteractor)(configuration);
        expect(configCreated).toEqual(configuration);
        expect(configurationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should update configuration successfully", async () => {
        const configUpdated = await (0, configuration_interactor_1.updateConfigurationInteractor)({
            clientId: configuration.getClientId(),
            key: configuration.getKey(),
            value: configuration.getValue(),
            type: configuration.getType(),
        });
        expect(configUpdated).toEqual(configuration);
        expect(configurationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete configuration successfully", async () => {
        const configDeleted = await (0, configuration_interactor_1.deleteConfigurationInteractor)({
            key: configuration.getKey(),
            clientId: configuration.getClientId(),
        });
        expect(configDeleted).toEqual(configuration);
        expect(configurationServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
