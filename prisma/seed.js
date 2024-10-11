"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const permission_1 = require("./seeders/permission");
const permission_on_roles_1 = require("./seeders/permission_on_roles");
const roles_1 = require("./seeders/roles");
const main = async () => {
    try {
        await (0, roles_1.seedRoles)();
        await (0, permission_1.seedPermission)();
        await (0, permission_on_roles_1.seedPermissionOnRoles)();
        console.log("ALL_SEEDS_EXECUTED_SUCCESSFULLY");
    }
    catch (error) {
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
