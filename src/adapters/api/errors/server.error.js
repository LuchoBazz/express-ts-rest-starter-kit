"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = void 0;
const basics_1 = require("../../../infrastructure/http/basics");
class ServerError extends Error {
    constructor(message, statusCode = basics_1.HttpStatusCode.INTERNAL_ERROR, errors) {
        super(message);
        this.status = statusCode;
        this.errors = errors;
    }
}
exports.ServerError = ServerError;
