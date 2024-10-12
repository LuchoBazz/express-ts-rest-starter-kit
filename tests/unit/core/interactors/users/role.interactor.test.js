"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleServiceMock = jest.fn();
const role_enum_1 = require("../../../../../src/core/entities/users/role.enum");
const role_interactor_1 = require("../../../../../src/core/interactors/users/role.interactor");
const role_mock_1 = require("../../../../mocks/users/role.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/users/role.service", () => {
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
    let role;
    beforeEach(() => {
        const rolePrisma = (0, role_mock_1.genRandomRolePrisma)();
        role = role_enum_1.RoleEntity.fromPrisma(rolePrisma);
        roleServiceMock.mockImplementation(() => {
            return Promise.resolve(role);
        });
    });
    afterEach(() => {
        roleServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get role successfully", async () => {
        const roleFound = await (0, role_interactor_1.findRoleInteractor)(role.getName());
        expect(roleFound).toEqual(role);
        expect(roleServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create role successfully", async () => {
        const roleCreated = await (0, role_interactor_1.createRoleInteractor)(role);
        expect(roleCreated).toEqual(role);
        expect(roleServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete role successfully", async () => {
        const roleDeleted = await (0, role_interactor_1.deleteRoleInteractor)(role.getName());
        expect(roleDeleted).toEqual(role);
        expect(roleServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
