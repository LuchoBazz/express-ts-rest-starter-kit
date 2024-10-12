"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleService = exports.createRoleService = exports.findRoleService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const role_enum_1 = require("../../entities/users/role.enum");
const findRoleService = async (client, name) => {
    try {
        const record = await client.role.findUnique({ where: { role_name: name } });
        return record ? role_enum_1.RoleEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findRoleService = findRoleService;
const createRoleService = async (client, role) => {
    try {
        const record = client.role.create({
            data: {
                role_id: role.getId(),
                role_name: role.getName(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return role_enum_1.RoleEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createRoleService = createRoleService;
const deleteRoleService = async (client, name) => {
    try {
        const record = client.role.delete({ where: { role_name: name } });
        const [recordDeleted] = await client.$transaction([record]);
        return role_enum_1.RoleEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deleteRoleService = deleteRoleService;
