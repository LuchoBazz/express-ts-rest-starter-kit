const roleServiceMock = jest.fn();

import { RoleEntity } from "../../../../src/core/entities/users/role.enum";
import {
  createRoleInteractor,
  deleteRoleInteractor,
  findRoleInteractor,
} from "../../../../src/core/interactors/users/role/role.interactor";
import { genRandomRolePrisma } from "../../../mocks/users/role.mock";

const disconnectMock = jest.fn();

jest.mock("../../../../src/core/services/users/role.service", () => {
  return {
    findRoleService: roleServiceMock,
    createRoleService: roleServiceMock,
    deleteRoleService: roleServiceMock,
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

describe("Given a role interactor", () => {
  let role: RoleEntity;

  beforeEach(() => {
    const rolePrisma = genRandomRolePrisma();
    role = RoleEntity.fromPrisma(rolePrisma);

    roleServiceMock.mockImplementation(() => {
      return Promise.resolve(role);
    });
  });

  afterEach(() => {
    roleServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get role successfully", async () => {
    const roleFound = await findRoleInteractor(role.getName());

    expect(roleFound).toEqual(role);
    expect(roleServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create role successfully", async () => {
    const roleCreated = await createRoleInteractor(role);

    expect(roleCreated).toEqual(role);
    expect(roleServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete role successfully", async () => {
    const roleDeleted = await deleteRoleInteractor(role.getName());

    expect(roleDeleted).toEqual(role);
    expect(roleServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
