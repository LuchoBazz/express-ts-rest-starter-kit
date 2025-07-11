import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";

interface PropsSignUpBody {
  access_token: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  identification_number: string | null;
  phone_number: string | null;
  terms: boolean;
  notifications: boolean;
}

export interface AuthSignUpResponse {
  data: {
    token: string;
  };
}

interface PropsToolsResponse {
  signUp: (props: PropsSignUpBody) => Promise<AuthSignUpResponse | null>;
  loading: boolean;
  error?: Error;
}

export const useSignUp = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const signUp = async (body: PropsSignUpBody) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<AuthSignUpResponse>("POST", `/authentication/sign-up`, body);
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

  return { signUp, loading, error };
};

export default useSignUp;
