import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsRevokeAllTokensExceptCurrentResponse {
  data: {
    success: boolean;
  };
}

interface PropsToolsResponse {
  revokeAllTokensExceptCurrent: () => Promise<boolean>;
  loading: boolean;
  error?: Error;
}

export const useRevokeAllTokensExceptCurrent = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const revokeAllTokensExceptCurrent = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsRevokeAllTokensExceptCurrentResponse>(
        "POST",
        `/authentication/tokens/revoke-all-except-current`,
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

  return { revokeAllTokensExceptCurrent, loading, error };
};

export default useRevokeAllTokensExceptCurrent;
