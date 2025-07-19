import { AuthType } from "../../entities/users/a_standard_user.entity";

export interface SignUpUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  terms: boolean;
  notifications: boolean;
  clientId: string;
  authType: AuthType;
}
