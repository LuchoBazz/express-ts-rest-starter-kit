"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPermissionsToRoleInteractor = exports.findPermissionsByRoleInteractor = void 0;
const errors_enum_1 = require("../../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../../infrastructure/database/prisma");
const permission_on_role_service_1 = require("../../../services/users/permission_on_role.service");
const findPermissionsByRoleInteractor = async (role) => {
    const permissionsFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, permission_on_role_service_1.findPermissionsByRoleService)(client, role);
    });
    if (!permissionsFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.PERMISSION_NOT_FOUND);
    }
    return permissionsFound;
};
exports.findPermissionsByRoleInteractor = findPermissionsByRoleInteractor;
const addPermissionsToRoleInteractor = async (role, permissions) => {
    const permissionsCreated = await (0, prisma_1.onSession)((client) => {
        return (0, permission_on_role_service_1.addPermissionsToRoleService)(client, role, permissions);
    });
    return permissionsCreated;
};
exports.addPermissionsToRoleInteractor = addPermissionsToRoleInteractor;
