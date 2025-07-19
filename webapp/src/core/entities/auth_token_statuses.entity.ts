export interface AuthTokenStatusResponse {
  id: string;
  email: string;
  organization_client_id: string;
  issued_at: string;
  expiration_time: string;
  ip_address?: string | null;
  user_agent?: string | null;
  revoked: boolean;
  created_at: string;
  updated_at: string;
}
