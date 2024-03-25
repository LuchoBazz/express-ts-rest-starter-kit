-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "org";

-- CreateTable
CREATE TABLE "org"."organizations" (
    "organization_id" UUID NOT NULL,
    "organization_name" VARCHAR(127) NOT NULL,
    "organization_client_id" VARCHAR(63) NOT NULL,
    "organization_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("organization_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organization_id_key" ON "org"."organizations"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_organization_client_id_key" ON "org"."organizations"("organization_client_id");
