import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedOrganizations = async () => {
  console.log("START_SEEDING_ORGANIZATIONS");

  const organizations = [{ organization_name: "Open Syk", organization_client_id: "SYK" }];

  const rolePromises = organizations.map((organization) => {
    return prisma.organization.create({
      data: { ...organization },
    });
  });

  await Promise.all(rolePromises);

  console.log("END_SEEDING_ORGANIZATIONS");
};
