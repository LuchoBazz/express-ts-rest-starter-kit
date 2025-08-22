import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUserLoggedIn from "../../core/hooks/user-loggued-in.hook";
import { removeAuthStorage } from "../../core/utils";
import type { StandardUserBackend } from "../../core/entities/standard_user.entity";
import MainHeader from "../MainHeader/MainHeader";

const HomePage = () => {
  const { fetchUser, error } = useUserLoggedIn();
  const [user, setUser] = useState<StandardUserBackend | null>(null);
  const [hasUserBeenValidated, setHasUserBeenValidated] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  if (!token || error) {
    removeAuthStorage();

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

  if (hasUserBeenValidated && !user) {
    removeAuthStorage();
    return <Navigate to="/log-in" replace />;
  }

  return (
    <div>
      <MainHeader />
    </div>
  );
};

export default HomePage;
