"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleService = exports.createRoleService = exports.findRoleService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const role_enum_1 = require("../../entities/users/role.enum");
const findRoleService = async (client, name) => {
    try {
        const role = await client.role.findUnique({ where: { role_name: name } });
        return role ? role_enum_1.RoleEntity.fromPrisma(role) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findRoleService = findRoleService;
const createRoleService = async (client, role) => {
    try {
        const createRoleTransaction = client.role.create({
            data: {
                role_id: role.getId(),
                role_name: role.getName(),
            },
        });
        const [roleCreated] = await client.$transaction([createRoleTransaction]);
        return role_enum_1.RoleEntity.fromPrisma(roleCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createRoleService = createRoleService;
const deleteRoleService = async (client, name) => {
    try {
        const deleteRoleTransaction = client.role.delete({ where: { role_name: name } });
        const [roleDeleted] = await client.$transaction([deleteRoleTransaction]);
        return role_enum_1.RoleEntity.fromPrisma(roleDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteRoleService = deleteRoleService;
