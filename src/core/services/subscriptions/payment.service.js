"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.findPaymentService = void 0;
const errors_enum_1 = require("../../../adapters/api/errors/errors.enum");
const internal_server_error_1 = require("../../../adapters/api/errors/internal_server.error");
const prisma_global_exception_filter_1 = require("../../../adapters/api/errors/prisma_global_exception_filter");
const payment_entity_1 = require("../../entities/subscriptions/payment.entity");
const findPaymentService = async (client, searchCriteria) => {
    try {
        const { id } = searchCriteria;
        const record = await client.payment.findUnique({ where: { payment_id: id } });
        return record ? payment_entity_1.PaymentEntity.fromPrisma(record) : null;
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.findPaymentService = findPaymentService;
const createPaymentService = async (client, payment) => {
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
        return payment_entity_1.PaymentEntity.fromPrisma(record);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.createPaymentService = createPaymentService;
const updatePaymentService = async (client, searchCriteria, payment) => {
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
        return payment_entity_1.PaymentEntity.fromPrisma(record);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.updatePaymentService = updatePaymentService;
const deletePaymentService = async (client, searchCriteria) => {
    try {
        const { id } = searchCriteria;
        const record = await client.payment.delete({ where: { payment_id: id } });
        return payment_entity_1.PaymentEntity.fromPrisma(record);
    }
    catch (error) {
        (0, prisma_global_exception_filter_1.prismaGlobalExceptionFilter)(error);
        throw new internal_server_error_1.InternalServerError(errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR);
    }
};
exports.deletePaymentService = deletePaymentService;
