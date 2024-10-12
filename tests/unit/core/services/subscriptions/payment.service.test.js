"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const payment_entity_1 = require("../../../../../src/core/entities/subscriptions/payment.entity");
const payment_service_1 = require("../../../../../src/core/services/subscriptions/payment.service");
const payment_mock_1 = require("../../../../mocks/subscriptions/payment.mock");
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
    let prismaClient;
    let paymentPrisma;
    let payment;
    beforeEach(() => {
        prismaClient = new client_1.PrismaClient();
        paymentPrisma = (0, payment_mock_1.genRandomPaymentPrisma)();
        payment = payment_entity_1.PaymentEntity.fromPrisma(paymentPrisma);
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
        const foundPayment = await (0, payment_service_1.findPaymentService)(prismaClient, {
            id: payment.getId(),
        });
        expect(foundPayment).toEqual(payment);
        expect(paymentMock).toHaveBeenCalledTimes(1);
    });
    it("should create payment successfully", async () => {
        const createdPayment = await (0, payment_service_1.createPaymentService)(prismaClient, payment);
        expect(createdPayment).toEqual(payment);
        expect(paymentMock).toHaveBeenCalledTimes(1);
    });
    it("should update payment successfully", async () => {
        const updatedPayment = await (0, payment_service_1.updatePaymentService)(prismaClient, {
            id: payment.getId(),
        }, {
            amount: payment.getAmount(),
            currency: payment.getCurrency(),
            date: payment.getDate(),
            externalPaymentId: payment.getExternalPaymentId(),
            status: payment.getStatus(),
        });
        expect(updatedPayment).toEqual(payment);
        expect(paymentMock).toHaveBeenCalledTimes(1);
    });
    it("should delete payment successfully", async () => {
        const deletedPayment = await (0, payment_service_1.deletePaymentService)(prismaClient, {
            id: payment.getId(),
        });
        expect(deletedPayment).toEqual(payment);
        expect(paymentMock).toHaveBeenCalledTimes(1);
    });
});
