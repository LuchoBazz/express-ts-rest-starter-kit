export const getClientIdFromHeaders = (headers: any): string => {
  return headers["client-id"]?.toString() ?? "";
};
