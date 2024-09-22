import { seedRoles } from "./seeders/01_roles";

const main = async () => {
  try {
    await seedRoles();

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
