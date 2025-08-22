import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";
import type { AuthTokenStatusBackend } from "../entities/auth_token_statuses.entity";

interface GetAuthTokenStatusesResponse {
  tokens: AuthTokenStatusBackend[];
  should_revoke_tokens: boolean;
  number_of_tokens_to_revoke: boolean;
}

interface PropsGetAuthTokenStatusesResponse {
  data: GetAuthTokenStatusesResponse;
}

interface PropsToolsResponse {
  getAuthTokenStatuses: () => Promise<GetAuthTokenStatusesResponse | null>;
  loading: boolean;
  error?: Error;
}

export const useGetAuthTokenStatuses = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const getAuthTokenStatuses = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsGetAuthTokenStatusesResponse>("GET", `/authentication/tokens`);
      return response.data;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getAuthTokenStatuses, loading, error };
};

export default useGetAuthTokenStatuses;
