"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const permission_on_role_entity_1 = require("../../../../../src/core/entities/users/permission_on_role.entity");
const permission_on_role_service_1 = require("../../../../../src/core/services/users/permission_on_role.service");
const permission_on_role_mock_1 = require("../../../../mocks/users/permission_on_role.mock");
const permissionOnRoleMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn(() => {
            return {
                permissionsOnRoles: {
                    findMany: permissionOnRoleMock,
                    create: permissionOnRoleMock,
                },
                $transaction: transactionMock,
                $disconnect: disconnectMock,
            };
        }),
    };
});
describe("Given a permission on role service", () => {
    let prismaClient;
    let permissionsExpected;
    let role;
    let permissions;
    beforeAll(() => {
        prismaClient = new client_1.PrismaClient();
    });
    beforeEach(() => {
        role = faker_1.faker.string.alphanumeric(10);
        permissions = [faker_1.faker.string.alphanumeric(8), faker_1.faker.string.alphanumeric(8)];
        const permissionsOnRolePrisma = [
            (0, permission_on_role_mock_1.genRandomPermissionOnRolePrisma)({ permissions_on_roles_role_name: role }),
            (0, permission_on_role_mock_1.genRandomPermissionOnRolePrisma)({ permissions_on_roles_role_name: role }),
        ];
        const permissionsOnRoleEntity = permissionsOnRolePrisma.map((permissionOnRolePrisma) => {
            return permission_on_role_entity_1.PermissionOnRoleEntity.fromPrisma(permissionOnRolePrisma);
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
        const permissionsFound = await (0, permission_on_role_service_1.findPermissionsByRoleService)(prismaClient, role);
        const permissionNamesExpected = permissionsFound.map((permission) => {
            return permission.getName();
        });
        expect(permissionNamesExpected).toEqual(permissionsExpected);
        expect(permissionOnRoleMock).toHaveBeenCalledTimes(1);
    });
    it("should add permissions to role successfully", async () => {
        const permissionsOnRolePrisma = permissions.map((permission) => {
            return (0, permission_on_role_mock_1.genRandomPermissionOnRolePrisma)({
                permissions_on_roles_permission_name: permission,
                permissions_on_roles_role_name: role,
            });
        });
        transactionMock.mockImplementation(() => {
            return permissionsOnRolePrisma;
        });
        const permissionsAdded = await (0, permission_on_role_service_1.addPermissionsToRoleService)(prismaClient, role, permissions);
        const permissionNamesAdded = permissionsAdded.map((permission) => {
            return permission.getName();
        });
        expect(permissionNamesAdded).toEqual(permissions);
        expect(transactionMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for error handling
});
