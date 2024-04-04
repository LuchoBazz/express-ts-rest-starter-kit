import { HttpStatusCode } from "../gateways/basics";
import { ServerError } from "./server.error";

export class MethodNotAllowedError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.METHOD_NOT_ALLOWED, errors);
  }
}
