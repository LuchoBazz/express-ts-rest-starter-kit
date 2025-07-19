import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../core/context/AuthContext";
import { AuthType, AuthTypeProvider } from "../../core/entities/auth.entity";
import { GoogleButtom } from "../../core/pages/authentication/providers/google";
import useSignUp from "../../core/hooks/signup.hook";
import { getusernameFromEmail } from "../../core/utils";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/home" replace />;
  }

  const { signUp } = useSignUp();
  const navigate = useNavigate();

  const auth = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response: any = await auth?.register(email, password);
    const user: any = response?.user;

    const accessToken = user?.stsTokenManager?.accessToken;
    const refreshToken = user?.stsTokenManager?.refreshToken;
    const username = getusernameFromEmail(email);
    // const photoURL = user?.photoURL; // TODO: Add Optional Photo Upload When Registering a New User

    const signUpResponse = await signUp({
      access_token: accessToken,
      email,
      username,
      first_name: firstName,
      last_name: lastName,
      terms: true, // TODO: Add Placeholder for Dynamically Setting a Variable
      notifications: false, // TODO: Add Placeholder for Dynamically Setting a Variable
      auth_type: AuthTypeProvider.EMAIL_AND_PASSWORD,
    });

    const token = signUpResponse?.data?.token ?? null;

    if (token) {
      localStorage.setItem("refresh-token-firebase", refreshToken);
      localStorage.setItem("token", token);
      navigate("/home");
    }
  };

  return (
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
            className="w-32 mx-auto"
            alt="Logo"
          />
        </div>
        <div className="mt-12 flex flex-col items-center">
          <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
          <div className="w-full flex-1 mt-8">
            <div className="flex flex-col items-center">
              <GoogleButtom type={AuthType.SIGN_UP} />
            </div>

            <div className="my-12 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or sign up with e-mail
              </div>
            </div>

            {/* 🟦 Formulario con handleSubmit */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="mt-5 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Sign Up</span>
              </button>
            </form>

            <p className="mt-6 text-xs text-gray-600 text-center">
              I agree to abide by Templatana's{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Terms of Service
              </a>{" "}
              and its{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default SignUp;
