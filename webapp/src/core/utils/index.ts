export const getClientId = (): string => {
  const clientId = process.env.REACT_APP_ORGANIZATION_CLIENT_ID;

  if (!clientId || typeof clientId !== "string" || clientId.trim() === "") {
    throw new Error("Expected REACT_APP_ORGANIZATION_CLIENT_ID to be a non-empty string.");
  }

  return clientId;
};
