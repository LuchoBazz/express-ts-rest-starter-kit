import { JwtDecodedPayload } from "../../entities/users/jwt_user.entity";

export interface TokenEncodedResponse {
  token: string;
  payload: JwtDecodedPayload;
}
