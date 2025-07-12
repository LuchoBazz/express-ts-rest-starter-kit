import SignIn from "../../../../components/SignIn/SignIn";
import { AuthProvider } from "../../../context/AuthContext";

const SignInPage = () => {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
};

export default SignInPage;
