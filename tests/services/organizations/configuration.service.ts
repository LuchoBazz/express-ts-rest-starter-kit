import { PrismaClient } from "@prisma/client";

import { ConfigurationEntity, ConfigurationPrisma } from "../../../src/entities/organizations/configuration.entity";
import { createConfigurationService } from "../../../src/services/organizations/configuration.service";
import { genRandomConfigurationPrisma } from "../../mocks/organizations/configuration.mock";

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
  let prismaClient: PrismaClient;
  let configPrisma: ConfigurationPrisma;
  let config: ConfigurationEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    configPrisma = genRandomConfigurationPrisma();
    config = ConfigurationEntity.fromPrisma(configPrisma);

    configurationMock.mockImplementation(() => {
      return configPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [configPrisma];
    });
  });

  afterEach(() => {
    configurationMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should create configuration successfully", async () => {
    const configurationCreated = await createConfigurationService(prismaClient, config);

    expect(configurationCreated).toEqual(config);
    expect(configurationMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for testing errors
});
