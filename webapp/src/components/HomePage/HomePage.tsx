import { use, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useCustomerLoggedIn from "../../core/hooks/customer-loggued-in.hook";
import { removeAuthStorage } from "../../core/utils";
import type { StandardUser } from "../../core/entities/standard_user.entity";
import MainHeader from "../MainHeader/MainHeader";

const HomePage = () => {
  const { fetchUser, error } = useCustomerLoggedIn();
  const [user, setUser] = useState<StandardUser | null>(null);
  const [hasUserBeenValidated, setHasUserBeenValidated] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  if (!token || error) {
    return <Navigate to="/log-in" replace />;
  }

  const getUser = async (): Promise<void> => {
    try {
      const fetchedUser = await fetchUser(token);
      setUser(fetchedUser);
    } catch (err) {
      removeAuthStorage();
    }
    setHasUserBeenValidated(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  console.log({ hasUserBeenValidated, user });

  if (hasUserBeenValidated && !user) {
    removeAuthStorage();
    // redirect to log-in
  }

  return (
    <div>
      <MainHeader />
    </div>
  );
};

export default HomePage;
