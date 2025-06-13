import type { Method } from "axios";

import { getTokenWithOutRedirect } from "../../../core/hooks/token.hook";
import { backendApiInstance } from ".";

export const httpBackendRequest = async <T>(method: Method, url: string, body: {} = {}, query: {} = {}): Promise<T> => {
  try {
    const authentication = getTokenWithOutRedirect();
    const { data } = await backendApiInstance.request<T>({
      method,
      url,
      data: body,
      params: query,
      headers: { ...authentication },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
