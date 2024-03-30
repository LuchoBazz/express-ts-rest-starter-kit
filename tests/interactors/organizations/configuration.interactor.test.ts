const configurationMock = jest.fn();

import { ConfigurationEntity } from "../../../src/entities/organizations/configuration.entity";
import { createConfigurationInteractor } from "../../../src/interactors/organizations/configuration/configuration.interactor";
import { genRandomConfigurationPrisma } from "../../mocks/organizations/configuration.mock";

const disconnectMock = jest.fn();

jest.mock("../../../src/services/organizations/configuration.service", () => {
  return {
    createConfigurationService: configurationMock,
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
  let config: ConfigurationEntity;

  beforeEach(() => {
    const configPrisma = genRandomConfigurationPrisma();
    config = ConfigurationEntity.fromPrisma(configPrisma);

    configurationMock.mockImplementation(() => {
      return Promise.resolve(config);
    });
  });

  afterEach(() => {
    configurationMock.mockClear();
  });

  it("should create configuration correctly", async () => {
    const configCreated = await createConfigurationInteractor(config);

    expect(configCreated).toEqual(config);
    expect(configurationMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
