import { NextFunction, Request, Response } from "express";

import { PaymentEntity } from "../../../../core/entities/subscriptions/payment.entity";
import {
  createPaymentInteractor,
  deletePaymentInteractor,
  findPaymentInteractor,
  updatePaymentInteractor,
} from "../../../../core/interactors/subscriptions/payment.interactor";
import { PaymentSearchCriteriaInput, UpdatePaymentInput } from "../../../../core/types/subscriptions/payment.types";
import { HttpStatusCode } from "../../../../infrastructure/http/basics";
import { presentPayment } from "../../../presenters/subscriptions/payment.presenter";
import { validateSchema } from "../../validator";
import { createPaymentSchema, paymentKeyParamsSchema, updatePaymentSchema } from "./schemas";

export const findPaymentController = [
  validateSchema(paymentKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { payment_id: id } = request.params;

      const paymentFound = await findPaymentInteractor({ id });

      const responsePayment = presentPayment(paymentFound);
      response.status(HttpStatusCode.OK).json({ data: responsePayment });
    } catch (error) {
      next(error);
    }
  },
];

export const createPaymentController = [
  validateSchema(createPaymentSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { subscriptionId, amount, currency, externalPaymentId, status, organizationClientId } = request.body;

      const payment = new PaymentEntity(
        subscriptionId as string,
        amount as number,
        currency as string,
        new Date(),
        externalPaymentId as string,
        status as string,
        organizationClientId as string,
        new Date(),
        new Date(),
      );

      const paymentCreated = await createPaymentInteractor(payment);

      const responsePayment = presentPayment(paymentCreated);
      response.status(HttpStatusCode.CREATED).json({ data: responsePayment });
    } catch (error) {
      next(error);
    }
  },
];

export const updatePaymentController = [
  validateSchema(paymentKeyParamsSchema),
  validateSchema(updatePaymentSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { payment_id: id } = request.params;
      const { subscriptionId, amount, currency, externalPaymentId, status, organizationClientId } = request.body;

      const searchCriteria: PaymentSearchCriteriaInput = { id };

      const payment: UpdatePaymentInput = {
        subscriptionId: subscriptionId ?? undefined,
        amount: amount ?? undefined,
        currency: currency ?? undefined,
        externalPaymentId: externalPaymentId ?? undefined,
        status: status ?? undefined,
        organizationClientId: organizationClientId ?? undefined,
      };

      const paymentUpdated = await updatePaymentInteractor(searchCriteria, payment);

      const responsePayment = presentPayment(paymentUpdated);
      response.status(HttpStatusCode.OK).json({ data: responsePayment });
    } catch (error) {
      next(error);
    }
  },
];

export const deletePaymentController = [
  validateSchema(paymentKeyParamsSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { payment_id: id } = request.params;

      const paymentDeleted = await deletePaymentInteractor({ id });

      const responsePayment = presentPayment(paymentDeleted);
      response.status(HttpStatusCode.OK).json({ data: responsePayment });
    } catch (error) {
      next(error);
    }
  },
];