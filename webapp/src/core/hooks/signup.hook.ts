import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";
import { getClientId } from "../utils";

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

interface AuthSignUpResponse {
  token: string;
}

interface PropsToolsResponse {
  signUp: (props: PropsSignUpBody) => Promise<void>;
  loading: boolean;
  error?: Error;
  data: AuthSignUpResponse | null;
}

const clientId = getClientId();

export const useSignUp = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();
  const [data, setData] = React.useState<AuthSignUpResponse | null>(null);

  const signUp = async (body: PropsSignUpBody) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<AuthSignUpResponse>("POST", `organizations/${clientId}/sign-up`, body);
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
