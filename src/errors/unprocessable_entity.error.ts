import { HttpStatusCode } from "../gateways/basic";
import { ServerError } from "./server.error";

export class UnprocessableEntityError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.UNPROCESSABLE_ENTITY, errors);
  }
}
