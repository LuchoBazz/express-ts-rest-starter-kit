"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permissionServiceMock = jest.fn();
const permission_entity_1 = require("../../../../../src/core/entities/users/permission.entity");
const permission_interactor_1 = require("../../../../../src/core/interactors/users/permission.interactor");
const permission_mock_1 = require("../../../../mocks/users/permission.mock");
const disconnectMock = jest.fn();
jest.mock("../../../../../src/core/services/users/permission.service", () => {
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
    let permission;
    beforeEach(() => {
        const permissionPrisma = (0, permission_mock_1.genRandomPermissionPrisma)();
        permission = permission_entity_1.PermissionEntity.fromPrisma(permissionPrisma);
        permissionServiceMock.mockImplementation(() => {
            return Promise.resolve(permission);
        });
    });
    afterEach(() => {
        permissionServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get permission successfully", async () => {
        const permissionFound = await (0, permission_interactor_1.findPermissionInteractor)(permission.getName());
        expect(permissionFound).toEqual(permission);
        expect(permissionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create permission successfully", async () => {
        const permissionCreated = await (0, permission_interactor_1.createPermissionInteractor)(permission);
        expect(permissionCreated).toEqual(permission);
        expect(permissionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete permission successfully", async () => {
        const permissionDeleted = await (0, permission_interactor_1.deletePermissionInteractor)(permission.getName());
        expect(permissionDeleted).toEqual(permission);
        expect(permissionServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
