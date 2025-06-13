import axios from "axios";
import React from "react";

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
      const response = await axios.post<AuthSignUpResponse>(
        `http://localhost:3000/organizations/${clientId}/sign-up`,
        { email, access_token: accessToken },
        { headers: { "Content-Type": "application/json" } },
      );
      setData(response.data);
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
