"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentController = exports.updatePaymentController = exports.createPaymentController = exports.findPaymentController = void 0;
const payment_entity_1 = require("../../../../core/entities/subscriptions/payment.entity");
const payment_interactor_1 = require("../../../../core/interactors/subscriptions/payment.interactor");
const basics_1 = require("../../../../infrastructure/http/basics");
const payment_presenter_1 = require("../../../presenters/subscriptions/payment.presenter");
const validator_1 = require("../../validator");
const schemas_1 = require("./schemas");
exports.findPaymentController = [
    (0, validator_1.validateSchema)(schemas_1.paymentKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { payment_id: id } = request.params;
            const paymentFound = await (0, payment_interactor_1.findPaymentInteractor)({ id });
            const responsePayment = (0, payment_presenter_1.presentPayment)(paymentFound);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePayment });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.createPaymentController = [
    (0, validator_1.validateSchema)(schemas_1.createPaymentSchema),
    async (request, response, next) => {
        try {
            const { subscriptionId, amount, currency, externalPaymentId, status, organizationClientId } = request.body;
            const payment = new payment_entity_1.PaymentEntity(subscriptionId, amount, currency, new Date(), externalPaymentId, status, organizationClientId, new Date(), new Date());
            const paymentCreated = await (0, payment_interactor_1.createPaymentInteractor)(payment);
            const responsePayment = (0, payment_presenter_1.presentPayment)(paymentCreated);
            response.status(basics_1.HttpStatusCode.CREATED).json({ data: responsePayment });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.updatePaymentController = [
    (0, validator_1.validateSchema)(schemas_1.paymentKeyParamsSchema),
    (0, validator_1.validateSchema)(schemas_1.updatePaymentSchema),
    async (request, response, next) => {
        try {
            const { payment_id: id } = request.params;
            const { subscriptionId, amount, currency, externalPaymentId, status, organizationClientId } = request.body;
            const searchCriteria = { id };
            const payment = {
                subscriptionId: subscriptionId !== null && subscriptionId !== void 0 ? subscriptionId : undefined,
                amount: amount !== null && amount !== void 0 ? amount : undefined,
                currency: currency !== null && currency !== void 0 ? currency : undefined,
                externalPaymentId: externalPaymentId !== null && externalPaymentId !== void 0 ? externalPaymentId : undefined,
                status: status !== null && status !== void 0 ? status : undefined,
                organizationClientId: organizationClientId !== null && organizationClientId !== void 0 ? organizationClientId : undefined,
            };
            const paymentUpdated = await (0, payment_interactor_1.updatePaymentInteractor)(searchCriteria, payment);
            const responsePayment = (0, payment_presenter_1.presentPayment)(paymentUpdated);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePayment });
        }
        catch (error) {
            next(error);
        }
    },
];
exports.deletePaymentController = [
    (0, validator_1.validateSchema)(schemas_1.paymentKeyParamsSchema),
    async (request, response, next) => {
        try {
            const { payment_id: id } = request.params;
            const paymentDeleted = await (0, payment_interactor_1.deletePaymentInteractor)({ id });
            const responsePayment = (0, payment_presenter_1.presentPayment)(paymentDeleted);
            response.status(basics_1.HttpStatusCode.OK).json({ data: responsePayment });
        }
        catch (error) {
            next(error);
        }
    },
];
