-- CreateTable
CREATE TABLE "org"."feature_flags" (
    "feature_flag_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "feature_flag_key" VARCHAR(255) NOT NULL,
    "feature_flag_percentage" INTEGER NOT NULL DEFAULT 0,
    "feature_flag_is_experimental" BOOLEAN NOT NULL DEFAULT false,
    "feature_flag_is_active" BOOLEAN NOT NULL DEFAULT true,
    "feature_flag_organization_client_id" VARCHAR(63) NOT NULL,
    "feature_flag_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feature_flag_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("feature_flag_id")
);

-- AddForeignKey
ALTER TABLE "org"."feature_flags" ADD CONSTRAINT "feature_flags_feature_flag_organization_client_id_fkey" FOREIGN KEY ("feature_flag_organization_client_id") REFERENCES "org"."organizations"("organization_client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "org"."feature_flags" ADD CONSTRAINT "feature_flags_percentage_check" CHECK (0 <= "feature_flag_percentage" AND "feature_flag_percentage" <= 100);