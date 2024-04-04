-- CreateTable
CREATE TABLE "users"."permissions" (
    "permission_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "permission_name" VARCHAR(63) NOT NULL,
    "permission_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("permission_id")
);

