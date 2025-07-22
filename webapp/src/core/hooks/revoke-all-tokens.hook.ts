import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsRevokeAllTokensResponse {
  data: {
    success: boolean;
  };
}

interface PropsToolsResponse {
  revokeAllTokens: () => Promise<boolean>;
  loading: boolean;
  error?: Error;
}

export const useRevokeAllTokens = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const revokeAllTokens = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsRevokeAllTokensResponse>(
        "POST",
        `/authentication/tokens/revoke-all`,
      );
      return response.data.success;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { revokeAllTokens, loading, error };
};

export default useRevokeAllTokens;
