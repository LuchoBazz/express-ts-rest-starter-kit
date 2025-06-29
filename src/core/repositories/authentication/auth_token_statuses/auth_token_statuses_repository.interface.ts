import { AuthTokenStatusEntity } from "../../../entities/users/auth_token_statuses.entity";
import {
  AuthTokenStatusesSearchCriteriaInput,
  LogOutSearchCriteriaInput,
  RevokeSearchCriteriaInput,
  UpdateAuthTokenStatusesInput,
} from "../../../types/users/auth_token_statuses.types";

export interface AuthTokenStatusesRepository {
  findOne(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity | null>;
  find(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity[]>;
  create(client: unknown, authTokenStatus: AuthTokenStatusEntity): Promise<AuthTokenStatusEntity>;
  update(client: unknown, authTokenStatus: UpdateAuthTokenStatusesInput): Promise<AuthTokenStatusEntity>;
  logOut(client: unknown, searchCriteria: LogOutSearchCriteriaInput): Promise<AuthTokenStatusEntity>;
  revokeBySession(client: unknown, searchCriteria: RevokeSearchCriteriaInput): Promise<AuthTokenStatusEntity>;
  revokeAllByUserId(client: unknown, clientId: string, email: string): Promise<number>;
  revokeAllExcept(client: unknown, searchCriteria: RevokeSearchCriteriaInput): Promise<number>;
}
