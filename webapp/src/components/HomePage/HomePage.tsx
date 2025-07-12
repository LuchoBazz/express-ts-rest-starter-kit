import { Navigate } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";

const HomePage = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/log-in" replace />;
  }

  return (
    <div>
      <MainHeader />
    </div>
  );
};

export default HomePage;
