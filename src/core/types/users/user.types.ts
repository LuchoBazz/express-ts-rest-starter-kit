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
}
