const permissionServiceMock = jest.fn();

import { ErrorMessage } from "../../../../../src/adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../../../src/adapters/api/errors/not_found.error";
import { PermissionEntity } from "../../../../../src/core/entities/users/permission.entity";
import { findPermissionsByRoleInteractor } from "../../../../../src/core/interactors/users/permission/permission_on_role.interactor";
import { genRandomPermissionPrisma } from "../../../../mocks/users/permission.mock";

const disconnectMock = jest.fn();

jest.mock("../../../../../src/core/services/users/permission_on_role.service", () => {
  return {
    findPermissionsByRoleService: permissionServiceMock,
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

describe("Given a findPermissionsByRole interactor", () => {
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
