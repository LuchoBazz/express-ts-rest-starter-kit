import { Entity } from "../entity";

export interface AuthTokenStatusPrisma {
  auth_token_id: string;
  auth_token_user: string;
  auth_token_issued_at: bigint;
  auth_token_expiration_time: bigint;
  auth_token_created_at: Date;
  auth_token_updated_at: Date;
}

export interface AuthTokenStatusResponse {
  id: string;
  user_id: string;
  issued_at: bigint;
  expiration_time: bigint;
  created_at: Date;
  updated_at: Date;
}

export class AuthTokenStatusEntity extends Entity {
  protected userId: string;
  protected issuedAt: bigint;
  protected expirationTime: bigint;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(
    userId: string,
    issuedAt: bigint,
    expirationTime: bigint,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
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

  public getIssuedAt(): bigint {
    return this.issuedAt;
  }

  public setIssuedAt(issuedAt: bigint): void {
    this.issuedAt = issuedAt;
  }

  public getExpirationTime(): bigint {
    return this.expirationTime;
  }

  public setExpirationTime(expirationTime: bigint): void {
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
