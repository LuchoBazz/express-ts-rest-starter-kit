import { HttpStatusCode } from "../gateways/basics";
import { ServerError } from "./server.error";

export class NotFoundError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.NOT_FOUND, errors);
  }
}
