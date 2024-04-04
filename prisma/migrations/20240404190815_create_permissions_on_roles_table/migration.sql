/*
  Warnings:

  - A unique constraint covering the columns `[permission_name]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "users"."permissions_on_roles" (
    "permissions_on_roles_role_name" VARCHAR(63) NOT NULL,
    "permissions_on_roles_permission_name" VARCHAR(63) NOT NULL,
    "permissions_on_roles_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permissions_on_roles_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_on_roles_pkey" PRIMARY KEY ("permissions_on_roles_role_name","permissions_on_roles_permission_name")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_permission_name_key" ON "users"."permissions"("permission_name");

-- AddForeignKey
ALTER TABLE "users"."permissions_on_roles" ADD CONSTRAINT "permissions_on_roles_permissions_on_roles_role_name_fkey" FOREIGN KEY ("permissions_on_roles_role_name") REFERENCES "users"."roles"("role_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users"."permissions_on_roles" ADD CONSTRAINT "permissions_on_roles_permissions_on_roles_permission_name_fkey" FOREIGN KEY ("permissions_on_roles_permission_name") REFERENCES "users"."permissions"("permission_name") ON DELETE RESTRICT ON UPDATE CASCADE;
