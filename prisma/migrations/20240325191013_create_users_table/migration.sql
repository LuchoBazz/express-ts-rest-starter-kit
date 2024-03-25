/*
  Warnings:

  - The primary key for the `organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "users";

-- CreateEnum
CREATE TYPE "users"."AuthProvider" AS ENUM ('FIREBASE', 'SUPABASE');

-- CreateEnum
CREATE TYPE "users"."AuthType" AS ENUM ('EMAIL_AND_PASSWORD', 'FACEBOOK_AUTH', 'GOOGLE_AUTH', 'GITHUB_AUTH');

-- CreateTable
CREATE TABLE "users"."users" (
    "user_id" TEXT NOT NULL,
    "user_username" VARCHAR(63) NOT NULL,
    "user_first_name" VARCHAR(63) NOT NULL,
    "user_last_name" VARCHAR(63) NOT NULL,
    "user_email" VARCHAR(63) NOT NULL,
    "user_identification_number" VARCHAR(63),
    "user_phone_number" VARCHAR(31),
    "user_terms" BOOLEAN NOT NULL DEFAULT false,
    "user_notifications" BOOLEAN NOT NULL DEFAULT false,
    "user_is_active" BOOLEAN NOT NULL DEFAULT true,
    "user_uid" VARCHAR(255) NOT NULL,
    "user_role" VARCHAR(63) NOT NULL,
    "user_auth_provider" "users"."AuthProvider" NOT NULL,
    "user_auth_type" "users"."AuthType" NOT NULL,
    "user_organization_client_id" VARCHAR(63) NOT NULL,
    "user_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "users"."users" ADD CONSTRAINT "users_user_organization_client_id_fkey" FOREIGN KEY ("user_organization_client_id") REFERENCES "org"."organizations"("organization_client_id") ON DELETE CASCADE ON UPDATE CASCADE;
