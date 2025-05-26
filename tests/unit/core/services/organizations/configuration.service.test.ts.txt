import { PrismaClient } from "@prisma/client";

import {
  ConfigurationEntity,
  ConfigurationPrisma,
} from "../../../../../src/core/entities/organizations/configuration.entity";
import {
  createConfigurationService,
  deleteConfigurationService,
  findConfigurationService,
  updateConfigurationService,
} from "../../../../../src/core/services/organizations/configuration.service";
import { genRandomConfigurationPrisma } from "../../../../mocks/organizations/configuration.mock";

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
  let configurationPrisma: ConfigurationPrisma;
  let configuration: ConfigurationEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    configurationPrisma = genRandomConfigurationPrisma();
    configuration = ConfigurationEntity.fromPrisma(configurationPrisma);

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
    const configFound = await findConfigurationService(prismaClient, {
      key: configuration.getKey(),
      clientId: configuration.getClientId(),
    });

    expect(configFound).toEqual(configuration);
    expect(configurationMock).toHaveBeenCalledTimes(1);
  });

  it("should create configuration successfully", async () => {
    const configCreated = await createConfigurationService(prismaClient, configuration);

    expect(configCreated).toEqual(configuration);
    expect(configurationMock).toHaveBeenCalledTimes(1);
  });

  it("should update configuration successfully", async () => {
    const configUpdated = await updateConfigurationService(prismaClient, {
      clientId: configuration.getClientId(),
      key: configuration.getKey(),
      value: configuration.getValue(),
      type: configuration.getType(),
    });

    expect(configUpdated).toEqual(configuration);
    expect(configurationMock).toHaveBeenCalledTimes(1);
  });

  it("should delete configuration successfully", async () => {
    const configDeleted = await deleteConfigurationService(prismaClient, {
      key: configuration.getKey(),
      clientId: configuration.getClientId(),
    });

    expect(configDeleted).toEqual(configuration);
    expect(configurationMock).toHaveBeenCalledTimes(1);
  });
});
