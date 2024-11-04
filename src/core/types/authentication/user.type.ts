export interface SignUpUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  identificationNumber: string | null;
  phoneNumber: string | null;
  terms: boolean;
  notifications: boolean;
  clientId: string;
}
