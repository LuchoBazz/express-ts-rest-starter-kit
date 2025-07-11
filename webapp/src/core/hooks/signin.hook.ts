import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsSignIn {
  email: string;
  accessToken: string;
}

interface AuthSignUpResponse {
  data: {
    token: string;
  };
}

interface PropsResponse {
  signIn: (props: PropsSignIn) => Promise<AuthSignUpResponse | null>;
  loading: boolean;
  error?: Error;
}

export const useSignIn = (): PropsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  const handleSignIn = async ({ email, accessToken }: PropsSignIn) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<AuthSignUpResponse>("POST", `authentication/sign-in`, {
        email,
        access_token: accessToken,
      });

      return response;
    } catch (err) {
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

  return { signIn: handleSignIn, loading, error };
};
