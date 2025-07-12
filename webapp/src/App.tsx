import { Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import SessionLimitList from "./components/SessionLimitList/SessionLimitList";
import NotFound from "./components/NotFound/NotFound";
import PricingTable from "./components/PricingTable/PricingTable";
import SignUpPage from "./core/pages/authentication/sign-up/signUp";
import SignInPage from "./core/pages/authentication/sign-in/signIn";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignUpPage />} />
    <Route path="/log-in" element={<SignInPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/session-limit" element={<SessionLimitList />} />
    <Route path="/pricing" element={<PricingTable />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
