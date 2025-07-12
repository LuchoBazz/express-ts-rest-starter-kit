import SignUp from "../../../../components/SignUp/SignUp";
import { AuthProvider } from "../../../context/AuthContext";

const SignUpPage = () => {
  return (
    <AuthProvider>
      <SignUp />
    </AuthProvider>
  );
};

export default SignUpPage;
