import { Entity } from "../entity";

export interface AuthTokenStatusPrisma {
  auth_token_id: string;
  auth_token_email: string;
  auth_token_organization_client_id: string;
  auth_token_issued_at: Date;
  auth_token_expiration_time: Date;
  auth_token_ip_address?: string | null;
  auth_token_user_agent?: string | null;
  auth_token_revoked: boolean;
  auth_token_created_at: Date;
  auth_token_updated_at: Date;
}

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

export class AuthTokenStatusEntity extends Entity {
  protected email: string;
  protected organizationClientId: string;
  protected issuedAt: Date;
  protected expirationTime: Date;
  protected ipAddress: string | null;
  protected userAgent: string | null;
  protected revoked: boolean;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(
    email: string,
    organizationClientId: string,
    issuedAt: Date,
    expirationTime: Date,
    ipAddress: string | null,
    userAgent: string | null,
    revoked: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    super();
    this.email = email;
    this.organizationClientId = organizationClientId;
    this.issuedAt = issuedAt;
    this.expirationTime = expirationTime;
    this.revoked = revoked;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromPrisma(payload: AuthTokenStatusPrisma): AuthTokenStatusEntity {
    const authTokenStatus = new AuthTokenStatusEntity(
      payload.auth_token_email,
      payload.auth_token_organization_client_id,
      payload.auth_token_issued_at,
      payload.auth_token_expiration_time,
      payload.auth_token_ip_address ?? null,
      payload.auth_token_user_agent ?? null,
      payload.auth_token_revoked,
      payload.auth_token_created_at,
      payload.auth_token_updated_at,
    );
    authTokenStatus.setId(payload.auth_token_id);
    return authTokenStatus;
  }

  public toResponse(): AuthTokenStatusResponse {
    return {
      id: this.getId(),
      email: this.getEmail(),
      organization_client_id: this.getOrganizationClientId(),
      issued_at: this.getIssuedAt(),
      expiration_time: this.getExpirationTime(),
      revoked: this.isRevoked(),
      ip_address: this.getIpAddress(),
      user_agent: this.getUserAgent(),
      created_at: this.getCreatedAt(),
      updated_at: this.getUpdatedAt(),
    };
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(email: string): void {
    this.email = email;
  }

  public getOrganizationClientId(): string {
    return this.organizationClientId;
  }
  public setOrganizationClientId(id: string): void {
    this.organizationClientId = id;
  }

  public getIssuedAt(): Date {
    return this.issuedAt;
  }
  public setIssuedAt(issuedAt: Date): void {
    this.issuedAt = issuedAt;
  }

  public getExpirationTime(): Date {
    return this.expirationTime;
  }
  public setExpirationTime(expirationTime: Date): void {
    this.expirationTime = expirationTime;
  }

  public getIpAddress(): string | null {
    return this.ipAddress;
  }
  public setIpAddress(ipAddress: string | null): void {
    this.ipAddress = ipAddress;
  }

  public getUserAgent(): string | null {
    return this.userAgent;
  }
  public setUserAgent(userAgent: string | null): void {
    this.userAgent = userAgent;
  }

  public isRevoked(): boolean {
    return this.revoked;
  }
  public setRevoked(revoked: boolean): void {
    this.revoked = revoked;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
