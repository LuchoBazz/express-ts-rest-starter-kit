-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "subscriptions";

-- CreateTable
CREATE TABLE "subscriptions"."subscription_plans" (
    "subscription_plan_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subscription_plan_name" VARCHAR(63) NOT NULL,
    "subscription_plan_product_id" VARCHAR(255) NOT NULL,
    "subscription_plan_variants" VARCHAR[],
    "subscription_plan_slug" VARCHAR(63) NOT NULL,
    "subscription_plan_price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "subscription_plan_href" VARCHAR(255),
    "subscription_plan_billing_cycle" VARCHAR(63) NOT NULL,
    "subscription_plan_description" VARCHAR(255) NOT NULL,
    "subscription_plan_node_quota" INTEGER NOT NULL DEFAULT 100,
    "subscription_plan_features" JSONB NOT NULL DEFAULT '[]',
    "subscription_plan_most_popular" BOOLEAN NOT NULL DEFAULT false,
    "subscription_plan_tier" INTEGER NOT NULL DEFAULT 0,
    "subscription_plan_is_active" BOOLEAN NOT NULL DEFAULT true,
    "subscription_plan_organization_client_id" VARCHAR(63) NOT NULL,
    "subscription_plan_created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscription_plan_updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("subscription_plan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_plans_subscription_plan_slug_key" ON "subscriptions"."subscription_plans"("subscription_plan_slug");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_plans_subscription_plan_billing_cycle_key" ON "subscriptions"."subscription_plans"("subscription_plan_billing_cycle");

-- CreateIndex
CREATE INDEX "subscription_plans_subscription_plan_organization_client_id_idx" ON "subscriptions"."subscription_plans"("subscription_plan_organization_client_id");

-- AddForeignKey
ALTER TABLE "subscriptions"."subscription_plans" ADD CONSTRAINT "subscription_plans_subscription_plan_organization_client_i_fkey" FOREIGN KEY ("subscription_plan_organization_client_id") REFERENCES "organizations"."organizations"("organization_client_id") ON DELETE CASCADE ON UPDATE CASCADE;
