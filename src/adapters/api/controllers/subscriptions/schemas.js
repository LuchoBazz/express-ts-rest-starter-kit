"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentSchema = exports.createPaymentSchema = exports.paymentKeyParamsSchema = exports.updateSubscriptionPlanSchema = exports.createSubscriptionPlanSchema = exports.subscriptionPlanKeyParamsSchema = exports.updateSubscriptionSchema = exports.createSubscriptionSchema = exports.subscriptionKeyParamsSchema = void 0;
const express_validator_1 = require("express-validator");
// SUBSCRIPTIONS
exports.subscriptionKeyParamsSchema = (0, express_validator_1.checkSchema)({
    id: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing subscription ID.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "subscription ID cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "subscription ID is not a string.",
        },
    },
});
exports.createSubscriptionSchema = (0, express_validator_1.checkSchema)({
    user_id: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing user_id.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "user_id cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "user_id is not a string.",
        },
    },
    subscription_plan_id: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing subscription_plan_id.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "subscription_plan_id cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "subscription_plan_id is not a string.",
        },
    },
    external_subscription_id: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "external_subscription_id is not a string.",
        },
    },
    billing_cycle: {
        in: ["body"],
        isString: {
            errorMessage: "billing_cycle is not a string.",
        },
    },
    status: {
        in: ["body"],
        isString: {
            errorMessage: "status is not a string.",
        },
    },
    is_active: {
        in: ["body"],
        isBoolean: {
            errorMessage: "is_active is not a boolean.",
        },
    },
    renews_at: {
        in: ["body"],
        isISO8601: {
            errorMessage: "renews_at is not a valid date.",
        },
        toDate: true,
    },
    starts_at: {
        in: ["body"],
        isISO8601: {
            errorMessage: "starts_at is not a valid date.",
        },
        toDate: true,
    },
    ends_at: {
        in: ["body"],
        isISO8601: {
            errorMessage: "ends_at is not a valid date.",
        },
        toDate: true,
    },
});
exports.updateSubscriptionSchema = (0, express_validator_1.checkSchema)({
    user_id: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "user ID is not a string.",
        },
    },
    subscription_plan_id: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "subscription plan ID is not a string.",
        },
    },
    external_subscription_id: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "external subscription ID is not a string.",
        },
    },
    billing_cycle: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "billing cycle is not a string.",
        },
    },
    status: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "status is not a string.",
        },
    },
    is_active: {
        in: ["body"],
        optional: true,
        isBoolean: {
            errorMessage: "is_active is not a boolean.",
        },
    },
    renews_at: {
        in: ["body"],
        optional: true,
        isISO8601: {
            errorMessage: "renews_at is not a valid date.",
        },
        toDate: true,
    },
    starts_at: {
        in: ["body"],
        optional: true,
        isISO8601: {
            errorMessage: "starts_at is not a valid date.",
        },
        toDate: true,
    },
    ends_at: {
        in: ["body"],
        optional: true,
        isISO8601: {
            errorMessage: "ends_at is not a valid date.",
        },
        toDate: true,
    },
});
// SUBSCRIPTION PLAN
exports.subscriptionPlanKeyParamsSchema = (0, express_validator_1.checkSchema)({
    slug: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing slug.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "slug cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "slug is not a string.",
        },
    },
});
exports.createSubscriptionPlanSchema = (0, express_validator_1.checkSchema)({
    name: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing name.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "name cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "name is not a string.",
        },
    },
    productId: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing productId.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "productId cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "productId is not a string.",
        },
    },
    variants: {
        in: ["body"],
        isArray: {
            errorMessage: "variants should be an array.",
        },
    },
    price: {
        in: ["body"],
        isFloat: {
            errorMessage: "price is not a valid number.",
        },
        toFloat: true,
    },
    billingCycle: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing billingCycle.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "billingCycle cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "billingCycle is not a string.",
        },
    },
    nodeQuota: {
        in: ["body"],
        isInt: {
            errorMessage: "nodeQuota is not a valid integer.",
        },
        toInt: true,
    },
    mostPopular: {
        in: ["body"],
        isBoolean: {
            errorMessage: "mostPopular is not a boolean.",
        },
    },
    tier: {
        in: ["body"],
        isInt: {
            errorMessage: "tier is not a valid integer.",
        },
        toInt: true,
    },
});
exports.updateSubscriptionPlanSchema = (0, express_validator_1.checkSchema)({
    price: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isFloat: {
            errorMessage: "price is not a valid number.",
        },
        toFloat: true,
    },
    billingCycle: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isString: {
            errorMessage: "billingCycle is not a string.",
        },
    },
    description: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isString: {
            errorMessage: "description is not a string.",
        },
    },
    nodeQuota: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isInt: {
            errorMessage: "nodeQuota is not a valid integer.",
        },
        toInt: true,
    },
    mostPopular: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isBoolean: {
            errorMessage: "mostPopular is not a boolean.",
        },
    },
    tier: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isInt: {
            errorMessage: "tier is not a valid integer.",
        },
        toInt: true,
    },
    isActive: {
        in: ["body"],
        optional: {
            options: { nullable: true },
        },
        isBoolean: {
            errorMessage: "isActive is not a boolean.",
        },
    },
});
// PAYMENT
exports.paymentKeyParamsSchema = (0, express_validator_1.checkSchema)({
    payment_id: {
        in: ["params"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing payment_id.",
        },
        exists: {
            options: {
                checkFalsy: true,
            },
            errorMessage: "payment_id cannot be null.",
            bail: true,
        },
        isString: {
            errorMessage: "payment_id is not a string.",
        },
    },
});
exports.createPaymentSchema = (0, express_validator_1.checkSchema)({
    subscriptionId: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing subscriptionId.",
        },
        isString: {
            errorMessage: "subscriptionId is not a string.",
        },
    },
    amount: {
        in: ["body"],
        isFloat: {
            errorMessage: "amount is not a valid number.",
        },
        toFloat: true,
    },
    currency: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing currency.",
        },
        isString: {
            errorMessage: "currency is not a string.",
        },
    },
    externalPaymentId: {
        in: ["body"],
        isString: {
            errorMessage: "externalPaymentId is not a string.",
        },
    },
    status: {
        in: ["body"],
        isString: {
            errorMessage: "status is not a string.",
        },
    },
    organizationClientId: {
        in: ["body"],
        isEmpty: {
            options: { ignore_whitespace: true },
            negated: true,
            errorMessage: "Missing organizationClientId.",
        },
        isString: {
            errorMessage: "organizationClientId is not a string.",
        },
    },
});
exports.updatePaymentSchema = (0, express_validator_1.checkSchema)({
    subscriptionId: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "subscriptionId is not a string.",
        },
    },
    amount: {
        in: ["body"],
        optional: true,
        isFloat: {
            errorMessage: "amount is not a valid number.",
        },
        toFloat: true,
    },
    currency: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "currency is not a string.",
        },
    },
    externalPaymentId: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "externalPaymentId is not a string.",
        },
    },
    status: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "status is not a string.",
        },
    },
    organizationClientId: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "organizationClientId is not a string.",
        },
    },
});
