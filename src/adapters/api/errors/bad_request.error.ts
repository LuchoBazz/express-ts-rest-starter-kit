import { HttpStatusCode } from "../../../infrastructure/http/basics";
import { ServerError } from "./server.error";

export class BadRequestError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.BAD_REQUEST, errors);
  }
}
