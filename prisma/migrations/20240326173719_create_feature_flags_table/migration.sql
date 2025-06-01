-- CreateTable
CREATE TABLE "organizations"."feature_flags" (
    "feature_flag_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "feature_flag_key" VARCHAR(255) NOT NULL,
    "feature_flag_value" BOOLEAN NOT NULL DEFAULT false,
    "feature_flag_is_active" BOOLEAN NOT NULL DEFAULT true,
    "feature_flag_organization_client_id" VARCHAR(63) NOT NULL,
    "feature_flag_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feature_flag_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("feature_flag_id")
);

-- AddForeignKey
ALTER TABLE "organizations"."feature_flags" ADD CONSTRAINT "feature_flags_feature_flag_organization_client_id_fkey" FOREIGN KEY ("feature_flag_organization_client_id") REFERENCES "organizations"."organizations"("organization_client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "feature_flags_feature_flag_key_feature_flag_organization_cl_key" ON "organizations"."feature_flags"("feature_flag_key", "feature_flag_organization_client_id");
