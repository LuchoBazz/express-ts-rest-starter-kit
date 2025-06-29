import { RequestNetworkMetadata } from "../../types/authentication/request_network_metadata.types";

export const getClientIdFromHeaders = (headers: any): string => {
  return headers["client-id"]?.toString() ?? "";
};

export const getAuthorizationTokenFromHeaders = (headers: any): string => {
  const authorization = (headers.authorization ?? headers.Authorization ?? "").toString();
  return authorization.replace("Bearer ", "");
};

export const getNetworkMetadataFromHeaders = (headers: any): RequestNetworkMetadata => {
  const ipAddress = headers["x-forwarded-for"] ?? null;
  const userAgent = headers["user-agent"];
  return { ipAddress, userAgent };
};
