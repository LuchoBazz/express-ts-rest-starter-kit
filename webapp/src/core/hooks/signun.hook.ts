import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsSignUp {
  email: string;
  accessToken: string;
}

interface AuthSignUpResponse {
  token: string;
}

interface PropsToolsResponse {
  signUp: (props: PropsSignUp) => Promise<void>;
  loading: boolean;
  error?: Error;
  data: AuthSignUpResponse | null;
}

const clientId = "DEMO";

export const useSignUp = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();
  const [data, setData] = React.useState<AuthSignUpResponse | null>(null);

  const signUp = async ({ email, accessToken }: PropsSignUp) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<AuthSignUpResponse>("POST", `organizations/${clientId}/sign-up`, {
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

  return { signUp, loading, error, data };
};

export default useSignUp;
