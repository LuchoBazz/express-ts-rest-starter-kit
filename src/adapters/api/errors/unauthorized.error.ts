import { HttpStatusCode } from "../../../infrastructure/http/basics";
import { ServerError } from "./server.error";

export class UnauthorizedError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.UNAUTHORIZED, errors);
  }
}
