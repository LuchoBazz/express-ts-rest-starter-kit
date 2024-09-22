import { PrismaClient } from "@prisma/client";

import { PermissionsValues } from "../../src/entities/users/authentication.enum";

const prisma = new PrismaClient();

export const seedPermissionOnRoles = async () => {
  console.log("START_SEEDING_PERMISSION_ON_ROLES");

  const permissionOnRoles = {
    SUPER_ADMIN: [PermissionsValues.CREATE_FEATURE_FLAG],
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

  const foundPermissions = await prisma.permissionsOnRoles.findMany({
    where: {
      OR: Object.entries(permissionOnRoles).flatMap(([role, permissions]) => {
        return permissions.map((permission) => {
          return {
            permissions_on_roles_role_name: role,
            permissions_on_roles_permission_name: permission,
          };
        });
      }),
    },
  });

  const rolesToCreate = Object.entries(permissionOnRoles).flatMap(([role, permissions]) => {
    return permissions
      .filter((permission) => {
        return !foundPermissions.some((foundPermission) => {
          return (
            foundPermission.permissions_on_roles_role_name === role &&
            foundPermission.permissions_on_roles_permission_name === permission.toString()
          );
        });
      })
      .map((permission) => {
        return {
          permissions_on_roles_role_name: role,
          permissions_on_roles_permission_name: permission,
        };
      });
  });

  const rolePromises = rolesToCreate.map((permissionOnRole) => {
    return prisma.permissionsOnRoles.create({
      data: {
        permissions_on_roles_role_name: permissionOnRole.permissions_on_roles_role_name,
        permissions_on_roles_permission_name: permissionOnRole.permissions_on_roles_permission_name,
      },
    });
  });

  await Promise.all(rolePromises);

  console.log("END_SEEDING_PERMISSION_ON_ROLES");
};
