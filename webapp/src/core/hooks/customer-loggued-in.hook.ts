import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface User {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface PropsCustomerLoggedInResponse {
  user: User;
}

interface PropsToolsResponse {
  fetchUser: (token: string) => Promise<void>;
  loading: boolean;
  error?: Error;
  user: User | null;
}

const clientId = "DEMO";

export const useCustomerLoggedIn = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();
  const [user, setUser] = React.useState<User | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsCustomerLoggedInResponse>(
        "GET",
        `/organizations/${clientId}/customer-logged-in`,
        {},
      );
      setUser(response.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, loading, error, user };
};

export default useCustomerLoggedIn;
