import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsRevokeTokenByIdResponse {
  data: {
    success: boolean;
  };
}

interface PropsToolsResponse {
  revokeTokenById: (id: string) => Promise<boolean>;
  loading: boolean;
  error?: Error;
}

export const useRevokeTokenById = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const revokeTokenById = async (id: string) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsRevokeTokenByIdResponse>(
        "POST",
        `/authentication/tokens/revoke/${id}`,
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

  return { revokeTokenById, loading, error };
};

export default useRevokeTokenById;
