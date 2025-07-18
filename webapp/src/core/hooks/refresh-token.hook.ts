import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsRefreshTokenResponse {
  data: {
    token: string;
  };
}

interface PropsToolsResponse {
  refreshToken: (token: string) => Promise<string | null>;
  loading: boolean;
  error?: Error;
}

export const useRefreshToken = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const refreshToken = async (token: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsRefreshTokenResponse>(
        "POST",
        `/authentication/refresh-token`,
        { refresh_token: token },
      );
      return response.data.token;
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

  return { refreshToken, loading, error };
};

export default useRefreshToken;
