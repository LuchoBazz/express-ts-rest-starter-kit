import { ConfigurationEntity, ConfigurationPrisma } from "../../../src/entities/organizations/configuration.entity";
import { createConfigurationInteractor } from "../../../src/interactors/organizations/configuration.interactor";
import { genRandomConfigurationPrisma } from "../../mocks/organizations/configuration.mock";

const createConfigurationMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        configuration: { create: createConfigurationMock },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a createConfigurationInteractor", () => {
  let configPrisma: ConfigurationPrisma;
  let config: ConfigurationEntity;

  beforeEach(() => {
    configPrisma = genRandomConfigurationPrisma();
    config = ConfigurationEntity.fromPrisma(configPrisma);

    createConfigurationMock.mockImplementation(() => {
      return configPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [configPrisma];
    });
  });

  afterEach(() => {
    createConfigurationMock.mockClear();
    transactionMock.mockClear();
  });

  it("should create configuration correctly", async () => {
    const configCreated = await createConfigurationInteractor(config);

    expect(configCreated).toEqual(config);
    expect(createConfigurationMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
