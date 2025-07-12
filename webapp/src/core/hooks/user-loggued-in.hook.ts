import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";
import type { StandardUser } from "../entities/standard_user.entity";

interface PropsCustomerLoggedInResponse {
  data: {
    user: StandardUser;
  };
}

interface PropsToolsResponse {
  fetchUser: (token: string) => Promise<StandardUser | null>;
  loading: boolean;
  error?: Error;
}

export const useUserLoggedIn = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const fetchUser = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsCustomerLoggedInResponse>(
        "POST",
        `/authentication/user-logged-in`,
      );
      return response.data.user;
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

  return { fetchUser, loading, error };
};

export default useUserLoggedIn;
