import { UserLoggedInPayload } from "../../../types/authentication/base.types";

export interface TokenRepository {
  decode(clientId: string, token: string): Promise<UserLoggedInPayload>;
}
