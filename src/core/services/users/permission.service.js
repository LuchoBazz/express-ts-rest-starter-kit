"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePermissionService = exports.createPermissionService = exports.findPermissionService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const permission_entity_1 = require("../../entities/users/permission.entity");
const findPermissionService = async (client, name) => {
    try {
        const record = await client.permission.findUnique({ where: { permission_name: name } });
        return record ? permission_entity_1.PermissionEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findPermissionService = findPermissionService;
const createPermissionService = async (client, permission) => {
    try {
        const record = client.permission.create({
            data: {
                permission_id: permission.getId(),
                permission_name: permission.getName(),
            },
        });
        const [recordCreated] = await client.$transaction([record]);
        return permission_entity_1.PermissionEntity.fromPrisma(recordCreated);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createPermissionService = createPermissionService;
const deletePermissionService = async (client, name) => {
    try {
        const record = client.permission.delete({ where: { permission_name: name } });
        const [recordDeleted] = await client.$transaction([record]);
        return permission_entity_1.PermissionEntity.fromPrisma(recordDeleted);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deletePermissionService = deletePermissionService;
