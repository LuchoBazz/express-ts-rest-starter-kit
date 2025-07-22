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
      setIsAllowed(response?.should_revoke_tokens ?? false);
    };

    checkAuth();
  }, []);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }

  return isAllowed ? element : <Navigate to="/log-in" />;
};

export default ProtectedSessionLimit;
