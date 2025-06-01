-- CreateEnum
CREATE TYPE "organizations"."configuration_type_enum" AS ENUM ('ENUM', 'JSON');

-- CreateTable
CREATE TABLE "organizations"."configurations" (
    "configuration_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "configuration_key" VARCHAR(255) NOT NULL,
    "configuration_value" TEXT NOT NULL,
    "configuration_type" "organizations"."configuration_type_enum" NOT NULL,
    "configuration_is_active" BOOLEAN NOT NULL DEFAULT true,
    "configuration_organization_client_id" VARCHAR(63) NOT NULL,
    "configuration_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "configuration_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("configuration_id")
);

-- AddForeignKey
ALTER TABLE "organizations"."configurations" ADD CONSTRAINT "configurations_configuration_organization_client_id_fkey" FOREIGN KEY ("configuration_organization_client_id") REFERENCES "organizations"."organizations"("organization_client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "configurations_configuration_key_configuration_organization_key" ON "organizations"."configurations"("configuration_key", "configuration_organization_client_id");
