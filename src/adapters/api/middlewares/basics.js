"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.notFound = exports.logRequest = exports.healthCheck = void 0;
const logger_1 = __importDefault(require("@open-syk/common/logger"));
const basics_1 = require("../../../infrastructure/http/basics");
const errors_enum_1 = require("../errors/errors.enum");
const log = (0, logger_1.default)("EXPRESS_STARTER_KIT");
const healthCheck = (_, response) => {
    response.status(basics_1.HttpStatusCode.OK).json({ status: "APP_IS_HEALTHY" });
};
exports.healthCheck = healthCheck;
const logRequest = (request, _, next) => {
    const { url, method, body } = request;
    log.info("REQUEST_RECEIVED", { url, method, body });
    next();
};
exports.logRequest = logRequest;
const notFound = (_, response, __) => {
    response.status(basics_1.HttpStatusCode.NOT_FOUND).json({ error: errors_enum_1.ErrorMessage.NOT_FOUND });
};
exports.notFound = notFound;
const logError = (error, _, res, __) => {
    var _a, _b, _c;
    const httpCode = ((_a = error === null || error === void 0 ? void 0 : error.status) !== null && _a !== void 0 ? _a : basics_1.HttpStatusCode.INTERNAL_ERROR);
    const message = (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : errors_enum_1.ErrorMessage.INTERNAL_SERVER_ERROR;
    const errors = ((_c = error === null || error === void 0 ? void 0 : error.errors) === null || _c === void 0 ? void 0 : _c.length) ? error.errors : undefined;
    res.status(httpCode).json({ message, errors });
};
exports.logError = logError;
