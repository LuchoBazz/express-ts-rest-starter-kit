export interface StandardUserBackend {
  id: string;
  auth_id: string;
  auth_provider: string;
  auth_token_status_id: string;
  auth_type: string;
  client_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
}
