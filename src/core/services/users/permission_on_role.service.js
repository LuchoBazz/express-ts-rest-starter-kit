"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPermissionsToRoleService = exports.findPermissionsByRoleService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const permission_entity_1 = require("../../entities/users/permission.entity");
const permission_on_role_entity_1 = require("../../entities/users/permission_on_role.entity");
const findPermissionsByRoleService = async (client, role) => {
    try {
        const permissionsOnRole = await client.permissionsOnRoles.findMany({
            where: { permissions_on_roles_role_name: role },
        });
        const permissionsOnRoleEntity = permissionsOnRole.map((permissionOnRole) => {
            return permission_on_role_entity_1.PermissionOnRoleEntity.fromPrisma(permissionOnRole);
        });
        return permissionsOnRoleEntity.map((permissionOnRole) => {
            return new permission_entity_1.PermissionEntity(permissionOnRole.getPermissionName());
        });
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findPermissionsByRoleService = findPermissionsByRoleService;
const addPermissionsToRoleService = async (client, role, permissions) => {
    try {
        const createPermissionsTransactions = permissions.map((permission) => {
            return client.permissionsOnRoles.create({
                data: {
                    permissions_on_roles_permission_name: permission,
                    permissions_on_roles_role_name: role,
                },
            });
        });
        const permissionsCreated = await client.$transaction(createPermissionsTransactions);
        const permissionsOnRole = permissionsCreated.map((permissionCreated) => {
            return permission_on_role_entity_1.PermissionOnRoleEntity.fromPrisma(permissionCreated);
        });
        return permissionsOnRole.map((permissionOnRole) => {
            return new permission_entity_1.PermissionEntity(permissionOnRole.getPermissionName());
        });
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.addPermissionsToRoleService = addPermissionsToRoleService;
