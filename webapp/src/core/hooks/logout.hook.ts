import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsLogOutResponse {
  data: {
    success: boolean;
  };
}

interface PropsToolsResponse {
  logOut: () => Promise<boolean>;
  loading: boolean;
  error?: Error;
}

export const useLogOut = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const logOut = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsLogOutResponse>("POST", `/authentication/tokens/logout`);
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

  return { logOut, loading, error };
};

export default useLogOut;
