import axios from "axios";
import React from "react";

import { httpBackendRequest } from "../../infrastructure/rest/backend/api";
import type { SubscriptionPlanBackend } from "../entities/subscription_plans.entity";

interface PropsSubscriptionPlansResponse {
  data: SubscriptionPlanBackend[];
}

interface PropsToolsResponse {
  fetchSubscriptionPlan: () => Promise<SubscriptionPlanBackend[]>;
  loading: boolean;
  error?: Error;
}

export const useSubscriptionPlans = (): PropsToolsResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>();

  const fetchSubscriptionPlan = async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await httpBackendRequest<PropsSubscriptionPlansResponse>("GET", `/subscription-plans`);
      return response.data;
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchSubscriptionPlan, loading, error };
};

export default useSubscriptionPlans;
