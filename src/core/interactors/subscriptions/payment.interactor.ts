import { PrismaClient } from "@prisma/client";

import { ErrorMessage } from "../../../adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../adapters/api/errors/not_found.error";
import { onSession } from "../../../infrastructure/database/prisma";
import { PaymentEntity } from "../../entities/subscriptions/payment.entity";
import { getPaymentRepository } from "../../repositories/subscriptions/payment";
import { PaymentSearchCriteriaInput, UpdatePaymentInput } from "../../types/subscriptions/payment.types";

export const findPaymentInteractor = async (searchCriteria: PaymentSearchCriteriaInput): Promise<PaymentEntity> => {
  const paymentRepository = getPaymentRepository();
  const paymentFound = await onSession(async (client: PrismaClient) => {
    return paymentRepository.findOne(client, searchCriteria);
  });

  if (!paymentFound) {
    throw new NotFoundError(ErrorMessage.PAYMENT_NOT_FOUND);
  }

  return paymentFound;
};

export const createPaymentInteractor = async (payment: PaymentEntity): Promise<PaymentEntity> => {
  const paymentRepository = getPaymentRepository();
  const paymentCreated = await onSession(async (client: PrismaClient) => {
    return paymentRepository.create(client, payment);
  });

  return paymentCreated;
};

export const updatePaymentInteractor = async (
  searchCriteria: PaymentSearchCriteriaInput,
  payment: UpdatePaymentInput,
): Promise<PaymentEntity> => {
  const paymentRepository = getPaymentRepository();
  const paymentUpdated = await onSession(async (client: PrismaClient) => {
    return paymentRepository.update(client, searchCriteria, payment);
  });

  return paymentUpdated;
};

export const deletePaymentInteractor = async (searchCriteria: PaymentSearchCriteriaInput): Promise<PaymentEntity> => {
  const paymentRepository = getPaymentRepository();
  const paymentDeleted = await onSession(async (client: PrismaClient) => {
    return paymentRepository.delete(client, searchCriteria);
  });

  return paymentDeleted;
};
