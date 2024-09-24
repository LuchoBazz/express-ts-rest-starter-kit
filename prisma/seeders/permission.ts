import { PrismaClient } from "@prisma/client";

import { PermissionsValues } from "../../src/core/entities/users/authentication.enum";

const prisma = new PrismaClient();

export const seedPermission = async () => {
  console.log("START_SEEDING_PERMISSION");

  const permissionsArray: string[] = Object.values(PermissionsValues);

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
