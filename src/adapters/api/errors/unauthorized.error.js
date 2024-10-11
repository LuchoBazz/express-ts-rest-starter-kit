"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const basics_1 = require("../../../infrastructure/http/basics");
const server_error_1 = require("./server.error");
class UnauthorizedError extends server_error_1.ServerError {
    constructor(message, errors) {
        super(message, basics_1.HttpStatusCode.UNAUTHORIZED, errors);
    }
}
exports.UnauthorizedError = UnauthorizedError;
