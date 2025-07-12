import { v4 as uuidv4 } from "uuid";

export const getClientId = (): string => {
  const clientId = import.meta.env.VITE_ORGANIZATION_CLIENT_ID;

  if (!clientId || typeof clientId !== "string" || clientId.trim() === "") {
    throw new Error("Expected VITE_ORGANIZATION_CLIENT_ID to be a non-empty string.");
  }

  return clientId;
};

export const getusernameFromEmail = (email: string): string => {
  const username = email.split("@")?.[0];
  return username ? username : uuidv4();
};

export const removeAuthStorage = (): void => {
  localStorage.removeItem("refresh-token-firebase");
  localStorage.removeItem("token");
};
