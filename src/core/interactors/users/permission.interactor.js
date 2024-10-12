"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePermissionInteractor = exports.createPermissionInteractor = exports.findPermissionInteractor = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../infrastructure/database/prisma");
const permission_service_1 = require("../../services/users/permission.service");
const findPermissionInteractor = async (name) => {
    const permissionFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, permission_service_1.findPermissionService)(client, name);
    });
    if (!permissionFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.PERMISSION_NOT_FOUND);
    }
    return permissionFound;
};
exports.findPermissionInteractor = findPermissionInteractor;
const createPermissionInteractor = async (permission) => {
    const permissionCreated = await (0, prisma_1.onSession)((client) => {
        return (0, permission_service_1.createPermissionService)(client, permission);
    });
    return permissionCreated;
};
exports.createPermissionInteractor = createPermissionInteractor;
const deletePermissionInteractor = async (name) => {
    const permissionDeleted = await (0, prisma_1.onSession)((client) => {
        return (0, permission_service_1.deletePermissionService)(client, name);
    });
    return permissionDeleted;
};
exports.deletePermissionInteractor = deletePermissionInteractor;
