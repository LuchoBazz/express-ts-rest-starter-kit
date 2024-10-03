import { HttpStatusCode } from "../../../infrastructure/http/basics";

export class ServerError extends Error {
  status: number;
  errors: any;

  constructor(message: string, statusCode: number = HttpStatusCode.INTERNAL_ERROR, errors?: any) {
    super(message);
    this.status = statusCode;
    this.errors = errors;
  }
}
