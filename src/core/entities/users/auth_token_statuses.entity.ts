import { Entity } from "../entity";

export interface AuthTokenStatusPrisma {
  auth_token_id: string;
  auth_token_user: string;
  auth_token_issued_at: number;
  auth_token_expiration_time: number;
  auth_token_created_at: Date;
  auth_token_updated_at: Date;
}

export interface AuthTokenStatusResponse {
  id: string;
  user_id: string;
  issued_at: number;
  expiration_time: number;
  created_at: Date;
  updated_at: Date;
}

export class AuthTokenStatusEntity extends Entity {
  protected userId: string;
  protected issuedAt: number;
  protected expirationTime: number;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(userId: string, issuedAt: number, expirationTime: number, createdAt: Date, updatedAt: Date) {
    super();
    this.userId = userId;
    this.issuedAt = issuedAt;
    this.expirationTime = expirationTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromPrisma(payload: AuthTokenStatusPrisma): AuthTokenStatusEntity {
    const authTokenStatus = new AuthTokenStatusEntity(
      payload.auth_token_user,
      payload.auth_token_issued_at,
      payload.auth_token_expiration_time,
      payload.auth_token_created_at,
      payload.auth_token_updated_at,
    );
    authTokenStatus.setId(payload.auth_token_id);
    return authTokenStatus;
  }

  public toResponse(): AuthTokenStatusResponse {
    return {
      id: this.getId(),
      user_id: this.getUserId(),
      issued_at: this.getIssuedAt(),
      expiration_time: this.getExpirationTime(),
      created_at: this.getCreatedAt(),
      updated_at: this.getUpdatedAt(),
    };
  }

  public getUserId(): string {
    return this.userId;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getIssuedAt(): number {
    return this.issuedAt;
  }

  public setIssuedAt(issuedAt: number): void {
    this.issuedAt = issuedAt;
  }

  public getExpirationTime(): number {
    return this.expirationTime;
  }

  public setExpirationTime(expirationTime: number): void {
    this.expirationTime = expirationTime;
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
