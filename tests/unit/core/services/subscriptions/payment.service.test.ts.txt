import { PrismaClient } from "@prisma/client";

import { PaymentEntity, PaymentPrisma } from "../../../../../src/core/entities/subscriptions/payment.entity";
import {
  createPaymentService,
  deletePaymentService,
  findPaymentService,
  updatePaymentService,
} from "../../../../../src/core/services/subscriptions/payment.service";
import { genRandomPaymentPrisma } from "../../../../mocks/subscriptions/payment.mock";

const paymentMock = jest.fn();
const transactionMock = jest.fn();
const disconnectMock = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        payment: {
          findUnique: paymentMock,
          create: paymentMock,
          update: paymentMock,
          delete: paymentMock,
        },
        $transaction: transactionMock,
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a payment service", () => {
  let prismaClient: PrismaClient;
  let paymentPrisma: PaymentPrisma;
  let payment: PaymentEntity;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    paymentPrisma = genRandomPaymentPrisma();
    payment = PaymentEntity.fromPrisma(paymentPrisma);

    paymentMock.mockImplementation(() => {
      return paymentPrisma;
    });
    transactionMock.mockImplementation(() => {
      return [paymentPrisma];
    });
  });

  afterEach(() => {
    paymentMock.mockClear();
    transactionMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get payment successfully", async () => {
    const foundPayment = await findPaymentService(prismaClient, {
      id: payment.getId(),
    });

    expect(foundPayment).toEqual(payment);
    expect(paymentMock).toHaveBeenCalledTimes(1);
  });

  it("should create payment successfully", async () => {
    const createdPayment = await createPaymentService(prismaClient, payment);

    expect(createdPayment).toEqual(payment);
    expect(paymentMock).toHaveBeenCalledTimes(1);
  });

  it("should update payment successfully", async () => {
    const updatedPayment = await updatePaymentService(
      prismaClient,
      {
        id: payment.getId(),
      },
      {
        amount: payment.getAmount(),
        currency: payment.getCurrency(),
        date: payment.getDate(),
        externalPaymentId: payment.getExternalPaymentId(),
        status: payment.getStatus(),
      },
    );

    expect(updatedPayment).toEqual(payment);
    expect(paymentMock).toHaveBeenCalledTimes(1);
  });

  it("should delete payment successfully", async () => {
    const deletedPayment = await deletePaymentService(prismaClient, {
      id: payment.getId(),
    });

    expect(deletedPayment).toEqual(payment);
    expect(paymentMock).toHaveBeenCalledTimes(1);
  });
});
