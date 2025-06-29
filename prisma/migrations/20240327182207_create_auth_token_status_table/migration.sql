-- CreateTable
CREATE TABLE "users"."auth_token_statuses" (
    "auth_token_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "auth_token_email" VARCHAR(63) NOT NULL,
    "auth_token_ip_address" VARCHAR(63),
    "auth_token_organization_client_id" VARCHAR(63) NOT NULL,
    "auth_token_revoked" BOOLEAN NOT NULL DEFAULT false,
    "auth_token_user_agent" VARCHAR(255),
    "auth_token_issued_at" TIMESTAMPTZ NOT NULL,
    "auth_token_expiration_time" TIMESTAMPTZ NOT NULL,
    "auth_token_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auth_token_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_token_statuses_pkey" PRIMARY KEY ("auth_token_id"),
    CONSTRAINT "auth_token_statuses_auth_token_email_auth_token_organizati_fkey" 
      FOREIGN KEY ("auth_token_email", "auth_token_organization_client_id") 
      REFERENCES "users"."users"("user_email", "user_organization_client_id") 
      ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_auth_token_statuses_email_client_id_issued_at" ON "users"."auth_token_statuses"("auth_token_email", "auth_token_organization_client_id", "auth_token_issued_at");
