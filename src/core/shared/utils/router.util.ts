export const getClientIdFromHeaders = (headers: any): string => {
  return headers["client-id"]?.toString() ?? "";
};

export const getAuthorizationTokenFromHeaders = (headers: any): string => {
  const authorization = (headers.authorization ?? headers.Authorization ?? "").toString();
  return authorization.replace("Bearer ", "");
};
