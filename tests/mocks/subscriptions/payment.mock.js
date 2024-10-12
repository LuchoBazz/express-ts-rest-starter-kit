"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomPaymentPrisma = void 0;
const faker_1 = require("@faker-js/faker");
const genRandomPaymentPrisma = ({ payment_id = faker_1.faker.string.uuid(), payment_subscription_id = faker_1.faker.string.uuid(), payment_amount = faker_1.faker.number.float({ min: 0, max: 1000, multipleOf: 0.01 }), payment_currency = faker_1.faker.finance.currencyCode(), payment_date = faker_1.faker.date.recent(), payment_external_payment_id = faker_1.faker.string.alpha(10), payment_status = faker_1.faker.helpers.arrayElement(["completed", "failed", "pending"]), payment_organization_client_id = faker_1.faker.string.alpha(10), payment_created_at = new Date(), payment_updated_at = new Date(), } = {}) => {
    return {
        payment_id,
        payment_subscription_id,
        payment_amount,
        payment_currency,
        payment_date,
        payment_external_payment_id,
        payment_status,
        payment_organization_client_id,
        payment_created_at,
        payment_updated_at,
    };
};
exports.genRandomPaymentPrisma = genRandomPaymentPrisma;
