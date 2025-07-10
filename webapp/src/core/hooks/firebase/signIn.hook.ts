import axios from "axios";
import React from "react";

import { httpFirebaseRequest } from "../../../infrastructure/rest/firebase/api";

interface PropsSignInFirebase {
  email: string;
  password: string;
}

export interface FirebaseVerifyPasswordResponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}

interface PropsResponse {
  signInFirebase: (props: PropsSignInFirebase) => Promise<void>;
  data: FirebaseVerifyPasswordResponse | null;
  loading: boolean;
  error?: Error;
}

export const useSignInFirebase = (): PropsResponse => {
  const [data, setData] = React.useState<FirebaseVerifyPasswordResponse | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error>();

  const handleSignIn = async ({ email, password }: PropsSignInFirebase) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpFirebaseRequest<FirebaseVerifyPasswordResponse>(
        "POST",
        `/accounts:signInWithPassword`,
        {
          email,
          password,
        },
      );

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
    signInFirebase: handleSignIn,
    data,
    loading,
    error,
  };
};
