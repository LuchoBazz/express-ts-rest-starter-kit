import logger from "@open-syk/common/logger";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

import { getUserRepository } from "../../../../core/repositories/users/users";
import { onSession } from "../../../../infrastructure/database/prisma";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { BadRequestError } from "../../errors/bad_request.error";
import { ErrorMessage } from "../../errors/errors.enum";
import { NotFoundError } from "../../errors/not_found.error";

const log = logger("LEMON_SQUEEZY:CONTROLLER");

const mapStoreIdToOrganizationId: Record<number, string> = {
  187083: "SYK",
};

export const lemonSqueezyController = [
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const eventName = body.meta?.event_name;
      const payload = body.data;
      const attributes = payload.attributes;

      const stringPayload = JSON.stringify({ payload: body });
      log.debug("LEMON_SQUEEZY_PAYLOAD", { stringPayload });

      if (!eventName || !payload || !attributes) {
        throw new BadRequestError("BAD_REQUEST_ERROR");
      }

      const cliendId = mapStoreIdToOrganizationId[attributes.store_id];

      const userRepository = getUserRepository();

      await onSession(async (prisma: PrismaClient) => {
        const userEmail = attributes.user_email as string;

        const user = await userRepository.findOne(prisma, cliendId, userEmail);

        if (!user) {
          throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }

        if (eventName === "order_created") {
          const externalPaymentId = attributes.first_order_item.order_id.toString();
          const amount = attributes.first_order_item.price / 100;
          const productId = attributes.first_order_item.product_id.toString();
          const currency = attributes.currency;
          const createdAt = new Date(attributes.created_at as string);

          const plan = await prisma.subscriptionPlan.findFirst({
            where: {
              subscription_plan_product_id: productId,
              subscription_plan_is_active: true,
              subscription_plan_organization_client_id: cliendId,
            },
          });

          if (!plan) {
            throw new NotFoundError(ErrorMessage.SUBSCRIPTION_PLAN_NOT_FOUND);
          }

          const subscriptionsId = uuid();

          const subscription = await prisma.subscription.create({
            data: {
              subscriptions_id: subscriptionsId,
              subscriptions_user_id: user.getId(),
              subscriptions_subscription_plan_id: plan.subscription_plan_id,
              subscriptions_external_subscription_id: "NA", // TODO: @legacy: Review this field to update the external subscription ID in future versions
              subscriptions_billing_cycle: plan.subscription_plan_billing_cycle,
              subscriptions_status: "active",
              subscriptions_is_active: true,
              subscriptions_renews_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              subscriptions_ends_at: new Date(new Date().setMonth(new Date().getMonth() + 1)),
              subscriptions_organization_client_id: cliendId,
            },
          });

          await prisma.payment.create({
            data: {
              payment_subscription_id: subscriptionsId ?? subscription.subscriptions_id,
              payment_amount: amount,
              payment_currency: currency,
              payment_date: createdAt,
              payment_external_payment_id: externalPaymentId,
              payment_status: "completed",
              payment_organization_client_id: cliendId,
            },
          });
        }
      });

      const message =
        eventName === "order_created"
          ? `Event '${eventName}' processed successfully`
          : `Event '${eventName}' was received but ignored`;

      const status = eventName === "order_created" ? HttpStatusCode.OK : HttpStatusCode.BAD_REQUEST;

      response.status(status).json({ message });
    } catch (error) {
      next(error);
    }
  },
];
