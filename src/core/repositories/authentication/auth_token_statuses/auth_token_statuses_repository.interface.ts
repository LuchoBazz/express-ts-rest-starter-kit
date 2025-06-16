import { AuthTokenStatusEntity } from "../../../entities/users/auth_token_statuses.entity";
import {
  AuthTokenStatusesSearchCriteriaInput,
  UpdateAuthTokenStatusesInput,
} from "../../../types/users/auth_token_statuses.types";

export interface AuthTokenStatusesRepository {
  findOne(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity | null>;
  find(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity[]>;
  create(client: unknown, featureFlag: AuthTokenStatusEntity): Promise<AuthTokenStatusEntity>;
  update(client: unknown, featureFlag: UpdateAuthTokenStatusesInput): Promise<AuthTokenStatusEntity>;
  delete(client: unknown, searchCriteria: AuthTokenStatusesSearchCriteriaInput): Promise<AuthTokenStatusEntity>;
}
