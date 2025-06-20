import { AuthTokenStatusEntity } from "../../../entities/users/auth_token_statuses.entity";
import {
  AuthTokenStatusesSearchCriteriaInput,
  UpdateAuthTokenStatusesInput,
} from "../../../types/users/auth_token_statuses.types";

export interface AuthTokenStatusesRepository {
  findOne(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity | null>;
  find(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity[]>;
  create(client: unknown, authTokenStatus: AuthTokenStatusEntity): Promise<AuthTokenStatusEntity>;
  update(client: unknown, authTokenStatus: UpdateAuthTokenStatusesInput): Promise<AuthTokenStatusEntity>;
  logOut(client: unknown, authTokenStatusId: string): Promise<AuthTokenStatusEntity>;
}
