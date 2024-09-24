import { HttpStatusCode } from "../../../infrastructure/http/basics";
import { ServerError } from "./server.error";

export class MethodNotAllowedError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.METHOD_NOT_ALLOWED, errors);
  }
}
