import { PrismaClient } from "@prisma/client";

import { PermissionsValues } from "../../src/core/entities/users/authentication.enum";

const prisma = new PrismaClient();

export const seedPermissionOnRoles = async () => {
  console.log("START_SEEDING_PERMISSION_ON_ROLES");

  const permissionOnRoles = {
    SUPER_ADMIN: [PermissionsValues.UPDATE_CONFIGURATION],
    INTERNAL_ADMIN: [PermissionsValues.CREATE_CONFIGURATION],
    EXTERNAL_ADMIN: [
      PermissionsValues.CREATE_FEATURE_FLAG,
      PermissionsValues.CREATE_CONFIGURATION,
      PermissionsValues.CREATE_SUBSCRIPTION_PLAN,
    ],
    READ_ONLY_FULL_ACCESS_ADMIN: [
      PermissionsValues.READ_FEATURE_FLAG,
      PermissionsValues.READ_CONFIGURATION,
      PermissionsValues.READ_SUBSCRIPTION_PLAN,
    ],
    GUEST_USER: [PermissionsValues.GUEST_USER],
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
