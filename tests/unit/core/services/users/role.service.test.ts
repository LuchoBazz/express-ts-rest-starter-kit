import { PrismaClient } from "@prisma/client";

import { RoleEntity, RolePrisma } from "../../../../../src/core/entities/users/role.enum";
import {
  createRoleService,
  deleteRoleService,
  findRoleService,
} from "../../../../../src/core/services/users/role.service";
import { genRandomRolePrisma } from "../../../../mocks/users/role.mock";

const roleMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        role: {
          findUnique: roleMock,
          create: roleMock,
          delete: roleMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a role service", () => {
  let prismaClient: PrismaClient;
  let rolePrisma: RolePrisma;
  let role: RoleEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    rolePrisma = genRandomRolePrisma();
    role = RoleEntity.fromPrisma(rolePrisma);

    roleMock.mockImplementation(() => {
      return rolePrisma;
    });
    transactionMock.mockImplementation(() => {
      return [rolePrisma];
    });
  });

  afterEach(() => {
    roleMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should find a role successfully", async () => {
    const roleFound = await findRoleService(prismaClient, role.getName());

    expect(roleFound).toEqual(role);
    expect(roleMock).toHaveBeenCalledTimes(1);
  });

  it("should create a role successfully", async () => {
    const roleCreated = await createRoleService(prismaClient, role);

    expect(roleCreated).toEqual(role);
    expect(roleMock).toHaveBeenCalledTimes(1);
  });

  it("should delete a role successfully", async () => {
    const roleDeleted = await deleteRoleService(prismaClient, role.getName());

    expect(roleDeleted).toEqual(role);
    expect(roleMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for error handling
});
