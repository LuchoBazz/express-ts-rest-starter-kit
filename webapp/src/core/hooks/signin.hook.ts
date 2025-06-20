import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsSignIn {
  email: string;
  accessToken: string;
}

interface AuthSignUpResponse {
  token: string;
}

interface PropsResponse {
  signIn: (props: PropsSignIn) => Promise<void>;
  data: AuthSignUpResponse | null;
  loading: boolean;
  error?: Error;
}

const clientId = "DEMO";

export const useSignIn = (): PropsResponse => {
  const [data, setData] = React.useState<AuthSignUpResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  const handleSignIn = async ({ email, accessToken }: PropsSignIn) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<AuthSignUpResponse>("POST", `/organizations/${clientId}/sign-in`, {
        email,
        access_token: accessToken,
      });

      setData(response);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn: handleSignIn,
    data,
    loading,
    error,
  };
};
