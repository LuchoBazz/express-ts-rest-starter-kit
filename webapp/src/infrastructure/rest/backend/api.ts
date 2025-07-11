import type { Method } from "axios";

import { getTokenWithOutRedirect } from "../../../core/hooks/token.hook";
import { backendApiInstance } from ".";
import { getClientId } from "../../../core/utils";

const clientId = getClientId();

export const httpBackendRequest = async <T>(method: Method, url: string, body: {} = {}, query: {} = {}): Promise<T> => {
  try {
    const authentication = getTokenWithOutRedirect();
    const { data } = await backendApiInstance.request<T>({
      method,
      url,
      data: body,
      params: query,
      headers: { ...authentication, "client-id": clientId },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
};
