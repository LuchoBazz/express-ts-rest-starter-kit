const paymentServiceMock = jest.fn();

import { ErrorMessage } from "../../../../../src/adapters/api/errors/errors.enum";
import { NotFoundError } from "../../../../../src/adapters/api/errors/not_found.error";
import { PaymentEntity } from "../../../../../src/core/entities/subscriptions/payment.entity";
import {
  createPaymentInteractor,
  deletePaymentInteractor,
  findPaymentInteractor,
  updatePaymentInteractor,
} from "../../../../../src/core/interactors/subscriptions/payment.interactor";
import { genRandomPaymentPrisma } from "../../../../mocks/subscriptions/payment.mock";

const disconnectMock = jest.fn();

jest.mock("../../../../../src/core/services/subscriptions/payment.service", () => {
  return {
    findPaymentService: paymentServiceMock,
    createPaymentService: paymentServiceMock,
    updatePaymentService: paymentServiceMock,
    deletePaymentService: paymentServiceMock,
  };
});

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => {
      return {
        $disconnect: disconnectMock,
      };
    }),
  };
});

describe("Given a PaymentInteractor", () => {
  let payment: PaymentEntity;

  beforeEach(() => {
    const paymentPrisma = genRandomPaymentPrisma();
    payment = PaymentEntity.fromPrisma(paymentPrisma);

    paymentServiceMock.mockImplementation(() => {
      return Promise.resolve(payment);
    });
  });

  afterEach(() => {
    paymentServiceMock.mockClear();
    disconnectMock.mockClear();
  });

  it("should get payment successfully", async () => {
    const paymentFound = await findPaymentInteractor({
      id: payment.getId(),
    });

    expect(paymentFound).toEqual(payment);
    expect(paymentServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should create payment successfully", async () => {
    const paymentCreated = await createPaymentInteractor(payment);

    expect(paymentCreated).toEqual(payment);
    expect(paymentServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should update payment successfully", async () => {
    const paymentUpdated = await updatePaymentInteractor(
      {
        id: payment.getId(),
      },
      {
        subscriptionId: payment.getSubscriptionId(),
        amount: payment.getAmount(),
        currency: payment.getCurrency(),
        date: payment.getDate(),
        externalPaymentId: payment.getExternalPaymentId(),
        status: payment.getStatus(),
      },
    );

    expect(paymentUpdated).toEqual(payment);
    expect(paymentServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should delete payment successfully", async () => {
    const paymentDeleted = await deletePaymentInteractor({
      id: payment.getId(),
    });

    expect(paymentDeleted).toEqual(payment);
    expect(paymentServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });

  it("should throw NotFoundError when payment not found", async () => {
    paymentServiceMock.mockImplementationOnce(() => {
      return Promise.resolve(null);
    });

    await expect(
      findPaymentInteractor({
        id: payment.getId(),
      }),
    ).rejects.toThrow(new NotFoundError(ErrorMessage.PAYMENT_NOT_FOUND));

    expect(paymentServiceMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
  });
});
