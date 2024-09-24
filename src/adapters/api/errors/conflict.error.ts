import { HttpStatusCode } from "../../../infrastructure/http/basics";
import { ServerError } from "./server.error";

export class ConflictError extends ServerError {
  constructor(message: string, errors?: any[]) {
    super(message, HttpStatusCode.CONFLICT, errors);
  }
}
