-- CreateTable
CREATE TABLE "users"."permissions" (
    "permission_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "permission_role" VARCHAR(63) NOT NULL,
    "permission_name" VARCHAR(63) NOT NULL,
    "permission_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permission_id")
);

-- AddForeignKey
ALTER TABLE "users"."permissions" ADD CONSTRAINT "permissions_permission_role_fkey" FOREIGN KEY ("permission_role") REFERENCES "users"."roles"("role_name") ON DELETE RESTRICT ON UPDATE CASCADE;
