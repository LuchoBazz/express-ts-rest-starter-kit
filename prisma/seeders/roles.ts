import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedRoles = async () => {
  console.log("START_SEEDING_ROLES");

  const roles = [
    { role_name: "SUPER_ADMIN" },
    { role_name: "INTERNAL_ADMIN" },
    { role_name: "EXTERNAL_ADMIN" },
    { role_name: "READ_ONLY_FULL_ACCESS_ADMIN" },
    { role_name: "GUEST_USER" },
    { role_name: "COMMON_USER" },
  ];

  const roleNames = roles.map((role) => {
    return role.role_name;
  });

  const foundRoles = await prisma.role.findMany({
    where: { role_name: { in: roleNames } },
  });

  const rolesToCreate = roles.filter((role) => {
    return !foundRoles.some((foundRole) => {
      return foundRole.role_name === role.role_name;
    });
  });

  const rolePromises = rolesToCreate.map((role) => {
    return prisma.role.create({
      data: { role_name: role.role_name },
    });
  });

  await Promise.all(rolePromises);

  console.log("END_SEEDING_ROLES");
};
