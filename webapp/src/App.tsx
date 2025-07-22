import { Route, Routes } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import SessionLimitList from "./components/SessionLimitList/SessionLimitList";
import NotFound from "./components/NotFound/NotFound";
import PricingTable from "./components/PricingTable/PricingTable";
import SignUpPage from "./core/pages/authentication/sign-up/signUp";
import SignInPage from "./core/pages/authentication/sign-in/signIn";
import SettingsPage from "./core/pages/users/settings/settingsPage";
import ProtectedSessionLimit from "./components/ProtectedRoute/ProtectedSessionLimit";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignUpPage />} />
    <Route path="/log-in" element={<SignInPage />} />
    <Route path="/home" element={<ProtectedSessionLimit element={<HomePage />} />} />
    <Route path="/session-limit" element={<SessionLimitList />} />
    <Route path="/pricing" element={<PricingTable />} />
    <Route path="/settings" element={<ProtectedSessionLimit element={<SettingsPage />} />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
