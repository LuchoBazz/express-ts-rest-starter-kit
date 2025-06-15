import { CommonUserEntity } from "../../../entities/users/common_user.entity";
import { UserLoggedInPayload } from "../../../types/authentication/base.types";

export interface TokenRepository {
  decode(clientId: string, token: string): Promise<UserLoggedInPayload>;
  encoded(user: CommonUserEntity): Promise<string>;
}
