-- CreateTable
CREATE TABLE "users"."roles" (
    "role_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "role_name" VARCHAR(63) NOT NULL,
    "role_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "users"."roles"("role_name");

-- AddForeignKey
ALTER TABLE "users"."users" ADD CONSTRAINT "users_user_role_fkey" FOREIGN KEY ("user_role") REFERENCES "users"."roles"("role_name") ON DELETE RESTRICT ON UPDATE CASCADE;
