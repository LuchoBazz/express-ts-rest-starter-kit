"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paymentServiceMock = jest.fn();
const errors_enum_1 = require("../../../../../src/adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../../../src/adapters/api/errors/not_found.error");
const payment_entity_1 = require("../../../../../src/core/entities/subscriptions/payment.entity");
const payment_interactor_1 = require("../../../../../src/core/interactors/subscriptions/payment.interactor");
const payment_mock_1 = require("../../../../mocks/subscriptions/payment.mock");
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
    let payment;
    beforeEach(() => {
        const paymentPrisma = (0, payment_mock_1.genRandomPaymentPrisma)();
        payment = payment_entity_1.PaymentEntity.fromPrisma(paymentPrisma);
        paymentServiceMock.mockImplementation(() => {
            return Promise.resolve(payment);
        });
    });
    afterEach(() => {
        paymentServiceMock.mockClear();
        disconnectMock.mockClear();
    });
    it("should get payment successfully", async () => {
        const paymentFound = await (0, payment_interactor_1.findPaymentInteractor)({
            id: payment.getId(),
        });
        expect(paymentFound).toEqual(payment);
        expect(paymentServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should create payment successfully", async () => {
        const paymentCreated = await (0, payment_interactor_1.createPaymentInteractor)(payment);
        expect(paymentCreated).toEqual(payment);
        expect(paymentServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should update payment successfully", async () => {
        const paymentUpdated = await (0, payment_interactor_1.updatePaymentInteractor)({
            id: payment.getId(),
        }, {
            subscriptionId: payment.getSubscriptionId(),
            amount: payment.getAmount(),
            currency: payment.getCurrency(),
            date: payment.getDate(),
            externalPaymentId: payment.getExternalPaymentId(),
            status: payment.getStatus(),
        });
        expect(paymentUpdated).toEqual(payment);
        expect(paymentServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
    it("should delete payment successfully", async () => {
        const paymentDeleted = await (0, payment_interactor_1.deletePaymentInteractor)({
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
        await expect((0, payment_interactor_1.findPaymentInteractor)({
            id: payment.getId(),
        })).rejects.toThrow(new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.PAYMENT_NOT_FOUND));
        expect(paymentServiceMock).toHaveBeenCalledTimes(1);
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});
