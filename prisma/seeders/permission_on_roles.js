"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPermissionOnRoles = void 0;
const client_1 = require("@prisma/client");
const authentication_enum_1 = require("../../src/core/entities/users/authentication.enum");
const prisma = new client_1.PrismaClient();
const seedPermissionOnRoles = async () => {
    console.log("START_SEEDING_PERMISSION_ON_ROLES");
    const permissionOnRoles = {
        SUPER_ADMIN: [authentication_enum_1.PermissionsValues.UPDATE_CONFIGURATION],
        INTERNAL_ADMIN: [authentication_enum_1.PermissionsValues.CREATE_CONFIGURATION],
        EXTERNAL_ADMIN: [
            authentication_enum_1.PermissionsValues.CREATE_FEATURE_FLAG,
            authentication_enum_1.PermissionsValues.CREATE_CONFIGURATION,
            authentication_enum_1.PermissionsValues.CREATE_SUBSCRIPTION_PLAN,
        ],
        READ_ONLY_FULL_ACCESS_ADMIN: [
            authentication_enum_1.PermissionsValues.READ_FEATURE_FLAG,
            authentication_enum_1.PermissionsValues.READ_CONFIGURATION,
            authentication_enum_1.PermissionsValues.READ_SUBSCRIPTION_PLAN,
        ],
        GUEST_USER: [authentication_enum_1.PermissionsValues.GUEST_USER],
    };
    const rolePromises = Object.entries(permissionOnRoles).flatMap(([role, permissions]) => {
        return permissions.map((permission) => {
            return prisma.permissionsOnRoles.upsert({
                where: {
                    permissions_on_roles_role_name_permissions_on_roles_permission_name: {
                        permissions_on_roles_role_name: role,
                        permissions_on_roles_permission_name: permission,
                    },
                },
                update: {},
                create: {
                    permissions_on_roles_role_name: role,
                    permissions_on_roles_permission_name: permission,
                },
            });
        });
    });
    await Promise.all(rolePromises);
    console.log("END_SEEDING_PERMISSION_ON_ROLES");
};
exports.seedPermissionOnRoles = seedPermissionOnRoles;
