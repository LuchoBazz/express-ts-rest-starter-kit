const permissionServiceMock = jest.fn();

import { PermissionEntity } from "../../../../src/core/entities/users/permission.entity";
import {
  createPermissionInteractor,
  deletePermissionInteractor,
  findPermissionInteractor,
} from "../../../../src/core/interactors/users/permission/permission.interactor";
import { genRandomPermissionPrisma } from "../../../mocks/users/permission.mock";

const disconnectMock = jest.fn();

jest.mock("../../../../src/core/services/users/permission.service", () => {
  return {
    findPermissionService: permissionServiceMock,
    createPermissionService: permissionServiceMock,
    deletePermissionService: permissionServiceMock,
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
  let permission: PermissionEntity;

  beforeEach(() => {
    const permissionPrisma = genRandomPermissionPrisma();
    permission = PermissionEntity.fromPrisma(permissionPrisma);

    permissionServiceMock.mockImplementation(() => {
      return Promise.resolve(permission);
    });
  });

  afterEach(() => {
    permissionServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get permission successfully", async () => {
    const permissionFound = await findPermissionInteractor(permission.getName());

    expect(permissionFound).toEqual(permission);
    expect(permissionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create permission successfully", async () => {
    const permissionCreated = await createPermissionInteractor(permission);

    expect(permissionCreated).toEqual(permission);
    expect(permissionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete permission successfully", async () => {
    const permissionDeleted = await deletePermissionInteractor(permission.getName());

    expect(permissionDeleted).toEqual(permission);
    expect(permissionServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
