import { HttpStatusCode } from "../gateways/basics";
import { ServerError } from "./server.error";

export class UnauthorizedError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.UNAUTHORIZED, errors);
  }
}
