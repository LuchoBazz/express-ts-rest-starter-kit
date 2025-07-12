import { Route, Routes } from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import HomePage from "./components/HomePage/HomePage";
import SessionLimitList from "./components/SessionLimitList/SessionLimitList";
import NotFound from "./components/NotFound/NotFound";
import PricingTable from "./components/PricingTable/PricingTable";
import SignUpPage from "./core/pages/authentication/sign-up/signUp";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignUpPage />} />
    <Route path="/log-in" element={<SignIn />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/session-limit" element={<SessionLimitList />} />
    <Route path="/pricing" element={<PricingTable />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
