import { AuthTokenStatusEntity } from "../../../entities/users/auth_token_statuses.entity";
import {
  AuthTokenStatusesSearchCriteriaInput,
  RevokeSearchCriteriaInput,
  UpdateAuthTokenStatusesInput,
} from "../../../types/users/auth_token_statuses.types";

export interface AuthTokenStatusesRepository {
  findOne(client: unknown, id: string): Promise<AuthTokenStatusEntity | null>;
  find(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity[]>;
  create(client: unknown, authTokenStatus: AuthTokenStatusEntity): Promise<AuthTokenStatusEntity>;
  update(client: unknown, authTokenStatus: UpdateAuthTokenStatusesInput): Promise<AuthTokenStatusEntity>;
  revokeBySession(client: unknown, searchCriteria: RevokeSearchCriteriaInput): Promise<AuthTokenStatusEntity>;
  revokeAllByUserId(client: unknown, clientId: string, email: string): Promise<number>;
  revokeAllExcept(client: unknown, searchCriteria: RevokeSearchCriteriaInput): Promise<number>;
}
