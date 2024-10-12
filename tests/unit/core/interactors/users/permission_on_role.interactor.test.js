"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissionServiceMock = jest.fn();
const disconnectMock = jest.fn();
const errors_enum_1 = require("../../../../../src/adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../../src/adapters/api/errors/not_found.error");
const permission_entity_1 = require("../../../../../src/core/entities/users/permission.entity");
const permission_on_role_interactor_1 = require("../../../../../src/core/interactors/users/permission_on_role.interactor");
const permission_mock_1 = require("../../../../mocks/users/permission.mock");
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
    let permissions;
    beforeEach(() => {
        const permissionPrisma = (0, permission_mock_1.genRandomPermissionPrisma)();
        const permission = permission_entity_1.PermissionEntity.fromPrisma(permissionPrisma);
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
            const permissionsFound = await (0, permission_on_role_interactor_1.findPermissionsByRoleInteractor)("some-role");
            expect(permissionsFound).toEqual(permissions);
            expect(permissionServiceMock).toHaveBeenCalledTimes(1);
            expect(disconnectMock).toHaveBeenCalledTimes(1);
        });
        it("should throw an error if no permissions found", async () => {
            permissionServiceMock.mockImplementation(() => {
                return Promise.resolve(null);
            });
            await expect((0, permission_on_role_interactor_1.findPermissionsByRoleInteractor)("some-role")).rejects.toThrow(new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.PERMISSION_NOT_FOUND));
            expect(permissionServiceMock).toHaveBeenCalledTimes(1);
            expect(disconnectMock).toHaveBeenCalledTimes(1);
        });
    });
    describe("When calling addPermissionsToRoleInteractor", () => {
        it("should add permissions to role successfully", async () => {
            const newPermissions = ["permission-1", "permission-2"];
            const permissionsCreated = await (0, permission_on_role_interactor_1.addPermissionsToRoleInteractor)("some-role", newPermissions);
            expect(permissionsCreated).toEqual(permissions);
            expect(permissionServiceMock).toHaveBeenCalledTimes(1);
            expect(disconnectMock).toHaveBeenCalledTimes(1);
        });
        it("should throw an error if adding permissions fails", async () => {
            permissionServiceMock.mockImplementation(() => {
                throw new Error("FAILED_TO_ADD_PERMISSIONS");
            });
            await expect((0, permission_on_role_interactor_1.addPermissionsToRoleInteractor)("some-role", ["permission-1"])).rejects.toThrow("FAILED_TO_ADD_PERMISSIONS");
            expect(permissionServiceMock).toHaveBeenCalledTimes(1);
            expect(disconnectMock).toHaveBeenCalledTimes(1);
        });
    });
});
