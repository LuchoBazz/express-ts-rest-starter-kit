import { useNavigate } from "react-router-dom";

export type AuthorizationOuput = { Authorization: string } | void;

export const getToken = ({ redirectTo = "/authentication/sign-in" } = {}): AuthorizationOuput => {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    const navigate = useNavigate();
    return navigate(redirectTo);
  }
  return { Authorization: `Bearer ${token}` };
};

export const getTokenWithOutRedirect = (): AuthorizationOuput | null => {
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  return { Authorization: `Bearer ${token}` };
};
