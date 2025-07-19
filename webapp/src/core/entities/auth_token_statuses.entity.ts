export interface AuthTokenStatusResponse {
  id: string;
  email: string;
  organization_client_id: string;
  issued_at: Date;
  expiration_time: Date;
  ip_address?: string | null;
  user_agent?: string | null;
  revoked: boolean;
  created_at: Date;
  updated_at: Date;
}
