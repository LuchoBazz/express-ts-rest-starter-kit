import { AuthProvider, AuthType } from "@prisma/client";

import { UserRole } from "../../entities/users/role.enum";

export interface UserSearchCriteriaInput {
  clientId: string;
  email: string;
}

export interface UpdateUserInput {
  clientId: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  identificationNumber?: string | null;
  phoneNumber?: string | null;
  terms?: boolean;
  notifications?: boolean;
  isActive?: boolean;
  uid?: string;
  role?: UserRole;
  authProvider?: AuthProvider;
  authType?: AuthType;
}
