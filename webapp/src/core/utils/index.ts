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

export const formatDate = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${date.getFullYear()} ${months[date.getMonth()]} ${pad(date.getDate())}, ${pad(hours)}:${pad(date.getMinutes())} ${ampm}`;
};
