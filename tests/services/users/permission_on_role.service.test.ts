import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

import { PermissionOnRoleEntity } from "../../../src/entities/users/permission_on_role.entity";
import { findPermissionsByRoleService } from "../../../src/services/users/permission_on_role.service";
import { genRandomPermissionOnRolePrisma } from "../../mocks/users/permission_on_role.mock";

const permissionOnRoleMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        permissionsOnRoles: {
          findMany: permissionOnRoleMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a permission on role service", () => {
  let prismaClient: PrismaClient;
  let permissionsExpected: string[];
  let role: string;

  beforeAll(() => {
    prismaClient = new PrismaClient();
  });

  beforeEach(() => {
    role = faker.string.alphanumeric(10);

    const permissionsOnRolePrisma = [
      genRandomPermissionOnRolePrisma({ permissions_on_roles_role_name: role }),
      genRandomPermissionOnRolePrisma({ permissions_on_roles_role_name: role }),
    ];
    const permissionsOnRoleEntity = permissionsOnRolePrisma.map((permissionOnRolePrisma) => {
      return PermissionOnRoleEntity.fromPrisma(permissionOnRolePrisma);
    });
    permissionsExpected = permissionsOnRoleEntity.map((permissionOnRoleEntity) => {
      return permissionOnRoleEntity.getPermissionName();
    });

    permissionOnRoleMock.mockImplementation(() => {
      return permissionsOnRolePrisma;
    });
  });

  afterEach(() => {
    permissionOnRoleMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should find all permissions by role successfully", async () => {
    const permissionsFound = await findPermissionsByRoleService(prismaClient, role);

    expect(
      permissionsFound.map((permission) => {
        return permission.getName();
      }),
    ).toEqual(permissionsExpected);
    expect(permissionOnRoleMock).toHaveBeenCalledTimes(1);
  });

  // TODO: Add tests for error handling
});
