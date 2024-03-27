-- CreateTable
CREATE TABLE "users"."auth_token_statuses" (
    "auth_token_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "auth_token_user" UUID NOT NULL,
    "auth_token_issued_at" BIGINT NOT NULL,
    "auth_token_expiration_time" BIGINT NOT NULL,
    "auth_token_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auth_token_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_token_statuses_pkey" PRIMARY KEY ("auth_token_id")
);

-- AddForeignKey
ALTER TABLE "users"."auth_token_statuses" ADD CONSTRAINT "auth_token_statuses_auth_token_user_fkey" FOREIGN KEY ("auth_token_user") REFERENCES "users"."users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
