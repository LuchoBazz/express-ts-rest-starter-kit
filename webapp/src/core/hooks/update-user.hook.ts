import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";
import type { StandardUser } from "../entities/standard_user.entity";

interface PropsUpdateUserResponse {
  data: {
    user: StandardUser;
  };
}

interface PropsUpdateUserBody {
  email: string;
  first_name?: string;
  last_name?: string;
  identification_number?: string | null;
  phone_number?: string | null;
  terms?: boolean;
  notifications?: boolean;
}

interface PropsToolsResponse {
  updateUser: (body: PropsUpdateUserBody) => Promise<StandardUser | null>;
  loading: boolean;
  error?: Error;
}

export const useUpdateUser = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const updateUser = async (body: PropsUpdateUserBody) => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsUpdateUserResponse>("PUT", `/users`, body);
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

  return { updateUser, loading, error };
};

export default useUpdateUser;
