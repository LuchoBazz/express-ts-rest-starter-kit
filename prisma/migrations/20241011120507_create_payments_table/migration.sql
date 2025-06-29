-- CreateTable
CREATE TABLE "subscriptions"."payments" (
    "payment_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "payment_subscription_id" UUID NOT NULL,
    "payment_amount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "payment_currency" VARCHAR(4) NOT NULL,
    "payment_date" TIMESTAMPTZ(6) NOT NULL,
    "payment_external_payment_id" VARCHAR(255) NOT NULL,
    "payment_status" VARCHAR(63) NOT NULL,
    "payment_organization_client_id" VARCHAR(63) NOT NULL,
    "payment_created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE INDEX "payments_payment_subscription_id_idx" ON "subscriptions"."payments"("payment_subscription_id");

-- AddForeignKey
ALTER TABLE "subscriptions"."payments" ADD CONSTRAINT "payments_payment_organization_client_id_fkey" FOREIGN KEY ("payment_organization_client_id") REFERENCES "organizations"."organizations"("organization_client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions"."payments" ADD CONSTRAINT "payments_payment_subscription_id_fkey" FOREIGN KEY ("payment_subscription_id") REFERENCES "subscriptions"."subscriptions"("subscriptions_id") ON DELETE CASCADE ON UPDATE CASCADE;
