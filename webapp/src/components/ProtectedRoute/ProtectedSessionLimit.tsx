import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import useGetAuthTokenStatuses from "../../core/hooks/auth-token-statuses.hook";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedSessionLimit: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const { getAuthTokenStatuses } = useGetAuthTokenStatuses();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getAuthTokenStatuses();
      const shouldRevokeTokens = response?.should_revoke_tokens ?? false;
      setIsAllowed(!shouldRevokeTokens);
    };

    checkAuth();
  }, []);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  if (!isAllowed) {
    return <Navigate to="/session-limit" replace />;
  }
  return element;
};

export default ProtectedSessionLimit;
