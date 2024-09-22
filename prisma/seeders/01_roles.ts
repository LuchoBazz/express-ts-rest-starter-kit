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
  ];

  const rolePromises = roles.map((role) => {
    return prisma.role.upsert({
      where: { role_name: role.role_name },
      update: {},
      create: role,
    });
  });

  await Promise.all(rolePromises);

  console.log("END_SEEDING_ROLES");
};
