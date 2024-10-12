"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentInteractor = exports.updatePaymentInteractor = exports.createPaymentInteractor = exports.findPaymentInteractor = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const not_found_error_1 = require("../../../adapters/api/errors/not_found.error");
const prisma_1 = require("../../../infrastructure/database/prisma");
const payment_service_1 = require("../../services/subscriptions/payment.service");
const findPaymentInteractor = async (searchCriteria) => {
    const paymentFound = await (0, prisma_1.onSession)(async (client) => {
        return (0, payment_service_1.findPaymentService)(client, searchCriteria);
    });
    if (!paymentFound) {
        throw new not_found_error_1.NotFoundError(errors_enum_1.ErrorMessage.PAYMENT_NOT_FOUND);
    }
    return paymentFound;
};
exports.findPaymentInteractor = findPaymentInteractor;
const createPaymentInteractor = async (payment) => {
    const paymentCreated = await (0, prisma_1.onSession)(async (client) => {
        return (0, payment_service_1.createPaymentService)(client, payment);
    });
    return paymentCreated;
};
exports.createPaymentInteractor = createPaymentInteractor;
const updatePaymentInteractor = async (searchCriteria, payment) => {
    const paymentUpdated = await (0, prisma_1.onSession)(async (client) => {
        return (0, payment_service_1.updatePaymentService)(client, searchCriteria, payment);
    });
    return paymentUpdated;
};
exports.updatePaymentInteractor = updatePaymentInteractor;
const deletePaymentInteractor = async (searchCriteria) => {
    const paymentDeleted = await (0, prisma_1.onSession)(async (client) => {
        return (0, payment_service_1.deletePaymentService)(client, searchCriteria);
    });
    return paymentDeleted;
};
exports.deletePaymentInteractor = deletePaymentInteractor;
