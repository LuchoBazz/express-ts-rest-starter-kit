"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
const basics_1 = require("../../../infrastructure/http/basics");
const server_error_1 = require("./server.error");
class ConflictError extends server_error_1.ServerError {
    constructor(message, errors) {
        super(message, basics_1.HttpStatusCode.CONFLICT, errors);
    }
}
exports.ConflictError = ConflictError;
