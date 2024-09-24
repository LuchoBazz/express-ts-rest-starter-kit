import { PrismaClient } from "@prisma/client";

import { PermissionEntity, PermissionPrisma } from "../../../../src/core/entities/users/permission.entity";
import {
  createPermissionService,
  deletePermissionService,
  findPermissionService,
} from "../../../../src/core/services/users/permission.service";
import { genRandomPermissionPrisma } from "../../../mocks/users/permission.mock";

const permissionMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        permission: {
          findUnique: permissionMock,
          create: permissionMock,
          delete: permissionMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a permission service", () => {
  let prismaClient: PrismaClient;
  let permissionPrisma: PermissionPrisma;
  let permission: PermissionEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    permissionPrisma = genRandomPermissionPrisma();
    permission = PermissionEntity.fromPrisma(permissionPrisma);

    permissionMock.mockImplementation(() => {
      return permissionPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [permissionPrisma];
    });
  });

  afterEach(() => {
    permissionMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should find a permission successfully", async () => {
    const permissionFound = await findPermissionService(prismaClient, permission.getName());

    expect(permissionFound).toEqual(permission);
    expect(permissionMock).toHaveBeenCalledTimes(1);
  });

  it("should create a permission successfully", async () => {
    const permissionCreated = await createPermissionService(prismaClient, permission);

    expect(permissionCreated).toEqual(permission);
    expect(permissionMock).toHaveBeenCalledTimes(1);
  });

  it("should delete a permission successfully", async () => {
    const permissionDeleted = await deletePermissionService(prismaClient, permission.getName());

    expect(permissionDeleted).toEqual(permission);
    expect(permissionMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for error handling
});
