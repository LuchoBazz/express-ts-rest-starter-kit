import { seedOrganizations } from "./seeders/organizations";
import { seedPermission } from "./seeders/permission";
import { seedPermissionOnRoles } from "./seeders/permission_on_roles";
import { seedRoles } from "./seeders/roles";

const main = async () => {
  try {
    await seedOrganizations();
    await seedRoles();
    await seedPermission();
    await seedPermissionOnRoles();

    console.log("ALL_SEEDS_EXECUTED_SUCCESSFULLY");
  } catch (error) {
    console.error("ERROR_SEEDING_DATABASE:", error);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    console.log("SEEDING_PROCESS_COMPLETED");
  });
