const permissionServiceMock = jest.fn();
const disconnectMock = jest.fn();

import { ErrorMessage } from "../../../../../src/adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../../../src/adapters/api/errors/not_found.error";
import { PermissionEntity } from "../../../../../src/core/entities/users/permission.entity";
import {
  addPermissionsToRoleInteractor,
  findPermissionsByRoleInteractor,
} from "../../../../../src/core/interactors/users/permission_on_role.interactor";
import { genRandomPermissionPrisma } from "../../../../mocks/users/permission.mock";

jest.mock("../../../../../src/core/services/users/permission_on_role.service", () => {
  return {
    findPermissionsByRoleService: permissionServiceMock,
    addPermissionsToRoleService: permissionServiceMock,
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

describe("Given a permission interactor", () => {
  let permissions: PermissionEntity[];

  beforeEach(() => {
    const permissionPrisma = genRandomPermissionPrisma();
    const permission = PermissionEntity.fromPrisma(permissionPrisma);
    permissions = [permission];

    permissionServiceMock.mockImplementation(() => {
      return Promise.resolve(permissions);
    });
  });

  afterEach(() => {
    permissionServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  describe("When calling findPermissionsByRoleInteractor", () => {
    it("should get permissions by role successfully", async () => {
      const permissionsFound = await findPermissionsByRoleInteractor("some-role");

      expect(permissionsFound).toEqual(permissions);
      expect(permissionServiceMock).toHaveBeenCalledTimes(1);
      expect(disconnectMock).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if no permissions found", async () => {
      permissionServiceMock.mockImplementation(() => {
        return Promise.resolve(null);
      });

      await expect(findPermissionsByRoleInteractor("some-role")).rejects.toThrow(
        new NotFoundError(ErrorMessage.PERMISSION_NOT_FOUND),
      );

      expect(permissionServiceMock).toHaveBeenCalledTimes(1);
      expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("When calling addPermissionsToRoleInteractor", () => {
    it("should add permissions to role successfully", async () => {
      const newPermissions = ["permission-1", "permission-2"];

      const permissionsCreated = await addPermissionsToRoleInteractor("some-role", newPermissions);

      expect(permissionsCreated).toEqual(permissions);
      expect(permissionServiceMock).toHaveBeenCalledTimes(1);
      expect(disconnectMock).toHaveBeenCalledTimes(1);
    });

    it("should throw an error if adding permissions fails", async () => {
      permissionServiceMock.mockImplementation(() => {
        throw new Error("FAILED_TO_ADD_PERMISSIONS");
      });

      await expect(addPermissionsToRoleInteractor("some-role", ["permission-1"])).rejects.toThrow(
        "FAILED_TO_ADD_PERMISSIONS",
      );

      expect(permissionServiceMock).toHaveBeenCalledTimes(1);
      expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
  });
});
