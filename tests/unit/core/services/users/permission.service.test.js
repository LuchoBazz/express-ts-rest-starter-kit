"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const permission_entity_1 = require("../../../../../src/core/entities/users/permission.entity");
const permission_service_1 = require("../../../../../src/core/services/users/permission.service");
const permission_mock_1 = require("../../../../mocks/users/permission.mock");
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
    let prismaClient;
    let permissionPrisma;
    let permission;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        permissionPrisma = (0, permission_mock_1.genRandomPermissionPrisma)();
        permission = permission_entity_1.PermissionEntity.fromPrisma(permissionPrisma);
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
        const permissionFound = await (0, permission_service_1.findPermissionService)(prismaClient, permission.getName());
        expect(permissionFound).toEqual(permission);
        expect(permissionMock).toHaveBeenCalledTimes(1);
    });
    it("should create a permission successfully", async () => {
        const permissionCreated = await (0, permission_service_1.createPermissionService)(prismaClient, permission);
        expect(permissionCreated).toEqual(permission);
        expect(permissionMock).toHaveBeenCalledTimes(1);
    });
    it("should delete a permission successfully", async () => {
        const permissionDeleted = await (0, permission_service_1.deletePermissionService)(prismaClient, permission.getName());
        expect(permissionDeleted).toEqual(permission);
        expect(permissionMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Add tests for error handling
});
