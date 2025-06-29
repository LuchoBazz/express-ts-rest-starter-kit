import { StandardUserEntity } from "../../../entities/users/a_standard_user.entity";
import { UserLoggedInPayload } from "../../../types/authentication/base.types";
import { TokenEncodedResponse } from "../../../types/authentication/token.types";

export interface TokenRepository {
  decode(clientId: string, token: string): Promise<UserLoggedInPayload>;
  encoded(user: StandardUserEntity): Promise<TokenEncodedResponse>;
}
