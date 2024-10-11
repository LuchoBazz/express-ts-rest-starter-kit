-- CreateTable
CREATE TABLE "subscriptions"."subscriptions" (
    "subscriptions_id" TEXT NOT NULL,
    "subscriptions_user_id" UUID NOT NULL,
    "subscriptions_subscription_plan_id" UUID NOT NULL,
    "subscriptions_external_subscription_id" VARCHAR(255) NOT NULL,
    "subscriptions_billing_cycle" VARCHAR(63) NOT NULL,
    "subscriptions_status" VARCHAR(63) NOT NULL,
    "subscriptions_is_active" BOOLEAN NOT NULL DEFAULT true,
    "subscriptions_renews_at" TIMESTAMPTZ(6) NOT NULL,
    "subscriptions_starts_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptions_ends_at" TIMESTAMPTZ(6) NOT NULL,
    "subscriptions_organization_client_id" VARCHAR(63) NOT NULL,
    "subscriptions_created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptions_updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("subscriptions_id")
);

-- CreateIndex
CREATE INDEX "subscriptions_subscriptions_organization_client_id_idx" ON "subscriptions"."subscriptions"("subscriptions_organization_client_id");

-- CreateIndex
CREATE INDEX "subscriptions_subscriptions_user_id_idx" ON "subscriptions"."subscriptions"("subscriptions_user_id");

-- CreateIndex
CREATE INDEX "subscriptions_subscriptions_subscription_plan_id_idx" ON "subscriptions"."subscriptions"("subscriptions_subscription_plan_id");

-- AddForeignKey
ALTER TABLE "subscriptions"."subscriptions" ADD CONSTRAINT "subscriptions_subscriptions_organization_client_id_fkey" FOREIGN KEY ("subscriptions_organization_client_id") REFERENCES "organizations"."organizations"("organization_client_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions"."subscriptions" ADD CONSTRAINT "subscriptions_subscriptions_subscription_plan_id_fkey" FOREIGN KEY ("subscriptions_subscription_plan_id") REFERENCES "subscriptions"."subscription_plans"("subscription_plan_id") ON DELETE CASCADE ON UPDATE CASCADE;
