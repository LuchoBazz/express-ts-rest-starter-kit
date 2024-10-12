const configurationServiceMock = jest.fn();

import { ConfigurationEntity } from "../../../../../src/core/entities/organizations/configuration.entity";
import {
  createConfigurationInteractor,
  deleteConfigurationInteractor,
  findConfigurationInteractor,
  updateConfigurationInteractor,
} from "../../../../../src/core/interactors/organizations/configuration.interactor";
import { genRandomConfigurationPrisma } from "../../../../mocks/organizations/configuration.mock";

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
  let configuration: ConfigurationEntity;

  beforeEach(() => {
    const configurationPrisma = genRandomConfigurationPrisma();
    configuration = ConfigurationEntity.fromPrisma(configurationPrisma);

    configurationServiceMock.mockImplementation(() => {
      return Promise.resolve(configuration);
    });
  });

  afterEach(() => {
    configurationServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get configuration successfully", async () => {
    const configFound = await findConfigurationInteractor({
      key: configuration.getKey(),
      clientId: configuration.getClientId(),
    });

    expect(configFound).toEqual(configuration);
    expect(configurationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create configuration successfully", async () => {
    const configCreated = await createConfigurationInteractor(configuration);

    expect(configCreated).toEqual(configuration);
    expect(configurationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should update configuration successfully", async () => {
    const configUpdated = await updateConfigurationInteractor({
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
    const configDeleted = await deleteConfigurationInteractor({
      key: configuration.getKey(),
      clientId: configuration.getClientId(),
    });

    expect(configDeleted).toEqual(configuration);
    expect(configurationServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
