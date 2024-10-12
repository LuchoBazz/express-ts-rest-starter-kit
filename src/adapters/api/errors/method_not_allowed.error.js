"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotAllowedError = void 0;
const basics_1 = require("../../../infrastructure/http/basics");
const server_error_1 = require("./server.error");
class MethodNotAllowedError extends server_error_1.ServerError {
    constructor(message, errors) {
        super(message, basics_1.HttpStatusCode.METHOD_NOT_ALLOWED, errors);
    }
}
exports.MethodNotAllowedError = MethodNotAllowedError;
