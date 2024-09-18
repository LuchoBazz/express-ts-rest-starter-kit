import { HttpStatusCode } from "../gateways/basics";
import { ServerError } from "./server.error";

export class InternalServerError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.INTERNAL_ERROR, errors);
  }
}
