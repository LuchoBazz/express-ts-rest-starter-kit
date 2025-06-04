import logger from "@open-syk/common/logger";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { onSession } from "../../../../infrastructure/database/prisma";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { BadRequestError } from "../../errors/bad_request.error";

const log = logger("LEMON_SQUEEZY:CONTROLLER");

export const lemonSqueezyController = [
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload = request.body;
      const eventName = payload.meta?.event_name;

      log.info("LEMON_SQUEEZY_PAYLOAD", { payload });

      if (!eventName) {
        throw new BadRequestError("BAD_REQUEST_ERROR");
      }

      const order = payload.data;
      const attributes = order.attributes;

      if (eventName === "order_created") {
        const externalSubscriptionId = order.relationships?.subscription?.data?.id?.toString();
        const externalPaymentId = order.id.toString();
        const currency = attributes.currency;
        const amount = attributes.total / 100;
        const userEmail = attributes.user_email as string;
        const createdAt = new Date(attributes.created_at as string);

        await onSession(async (prisma: PrismaClient) => {
          const user = await prisma.user.findFirst({ where: { user_email: userEmail } });

          if (!user) {
            throw new BadRequestError("BAD_REQUEST_ERROR");
          }

          const plan = await prisma.subscriptionPlan.findFirst({
            where: {
              subscription_plan_billing_cycle: "monthly",
              subscription_plan_is_active: true,
              subscription_plan_organization_client_id: user.user_organization_client_id,
            },
          });

          if (!plan) {
            throw new BadRequestError("BAD_REQUEST_ERROR");
          }

          const subscription = await prisma.subscription.create({
            data: {
              subscriptions_user_id: user.user_id,
              subscriptions_subscription_plan_id: plan.subscription_plan_id,
              subscriptions_external_subscription_id: externalSubscriptionId || "",
              subscriptions_billing_cycle: plan.subscription_plan_billing_cycle,
              subscriptions_status: "active",
              subscriptions_is_active: true,
              subscriptions_renews_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              subscriptions_ends_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              subscriptions_organization_client_id: user.user_organization_client_id,
            },
          });

          await prisma.payment.create({
            data: {
              payment_subscription_id: subscription.subscriptions_id,
              payment_amount: amount,
              payment_currency: currency,
              payment_date: createdAt,
              payment_external_payment_id: externalPaymentId,
              payment_status: "completed",
              payment_organization_client_id: user.user_organization_client_id,
            },
          });
        });
      } else if (eventName === "order_paid") {
        console.log("order_paid");
      } else {
        console.log("else");
      }

      response.status(HttpStatusCode.OK).json({ data: [] });
    } catch (error) {
      next(error);
    }
  },
];
