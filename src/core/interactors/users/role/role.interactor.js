"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleInteractor = exports.createRoleInteractor = exports.findRoleInteractor = void 0;
const errors_enum_1 = require("../../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../../infrastructure/database/prisma");
const role_service_1 = require("../../../services/users/role.service");
const findRoleInteractor = async (name) => {
    const roleFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, role_service_1.findRoleService)(client, name);
    });
    if (!roleFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.ROLE_NOT_FOUND);
    }
    return roleFound;
};
exports.findRoleInteractor = findRoleInteractor;
const createRoleInteractor = async (role) => {
    const roleCreated = await (0, prisma_1.onSession)((client) => {
        return (0, role_service_1.createRoleService)(client, role);
    });
    return roleCreated;
};
exports.createRoleInteractor = createRoleInteractor;
const deleteRoleInteractor = async (name) => {
    const roleDeleted = await (0, prisma_1.onSession)((client) => {
        return (0, role_service_1.deleteRoleService)(client, name);
    });
    return roleDeleted;
};
exports.deleteRoleInteractor = deleteRoleInteractor;
