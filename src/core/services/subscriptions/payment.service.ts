import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { InternalServerError } from "../../../adapters/api/errors/internal_server.error";
import { prismaGlobalExceptionFilter } from "../../../adapters/api/errors/prisma_global_exception_filter";
import { PaymentEntity } from "../../entities/subscriptions/payment.entity";
import { PaymentSearchCriteriaInput, UpdatePaymentInput } from "../../types/subscriptions/payment.types";

export const findPaymentService = async (
  client: PrismaClient,
  searchCriteria: PaymentSearchCriteriaInput,
): Promise<PaymentEntity | null> => {
  try {
    const { id } = searchCriteria;
    const record = await client.payment.findUnique({ where: { payment_id: id } });

    return record ? PaymentEntity.fromPrisma(record) : null;
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const createPaymentService = async (client: PrismaClient, payment: PaymentEntity): Promise<PaymentEntity> => {
  try {
    const record = await client.payment.create({
      data: {
        payment_id: payment.getId(),
        payment_subscription_id: payment.getSubscriptionId(),
        payment_amount: payment.getAmount(),
        payment_currency: payment.getCurrency(),
        payment_date: payment.getDate(),
        payment_external_payment_id: payment.getExternalPaymentId(),
        payment_status: payment.getStatus(),
        payment_organization_client_id: payment.getOrganizationClientId(),
      },
    });

    return PaymentEntity.fromPrisma(record);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const updatePaymentService = async (
  client: PrismaClient,
  searchCriteria: PaymentSearchCriteriaInput,
  payment: UpdatePaymentInput,
): Promise<PaymentEntity> => {
  try {
    const { id } = searchCriteria;
    const record = await client.payment.update({
      where: {
        payment_id: id,
      },
      data: {
        payment_amount: payment.amount,
        payment_currency: payment.currency,
        payment_date: payment.date,
        payment_external_payment_id: payment.externalPaymentId,
        payment_status: payment.status,
      },
    });

    return PaymentEntity.fromPrisma(record);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};

export const deletePaymentService = async (
  client: PrismaClient,
  searchCriteria: PaymentSearchCriteriaInput,
): Promise<PaymentEntity> => {
  try {
    const { id } = searchCriteria;
    const record = await client.payment.delete({ where: { payment_id: id } });

    return PaymentEntity.fromPrisma(record);
  } catch (error) {
    prismaGlobalExceptionFilter(error);
    throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
