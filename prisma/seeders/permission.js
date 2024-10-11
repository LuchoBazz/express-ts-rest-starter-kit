"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPermission = void 0;
const client_1 = require("@prisma/client");
const authentication_enum_1 = require("../../src/core/entities/users/authentication.enum");
const prisma = new client_1.PrismaClient();
const seedPermission = async () => {
    console.log("START_SEEDING_PERMISSION");
    const permissionsArray = Object.values(authentication_enum_1.PermissionsValues);
    const foundPermissions = await prisma.permission.findMany({
        where: { permission_name: { in: permissionsArray } },
    });
    const permissionsToCreate = permissionsArray.filter((permission) => {
        return !foundPermissions.some((foundPermission) => {
            return foundPermission.permission_name === permission;
        });
    });
    const permissionPromises = permissionsToCreate.map((permission) => {
        return prisma.permission.create({
            data: { permission_name: permission },
        });
    });
    await Promise.all(permissionPromises);
    console.log("END_SEEDING_PERMISSION");
};
exports.seedPermission = seedPermission;
