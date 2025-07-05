import { Route, Routes } from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import HomePage from "./components/HomePage/HomePage";
import SessionLimitList from "./components/SessionLimitList/SessionLimitList";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignUp />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/session-limit" element={<SessionLimitList />} />
    <Route path="*" element={<SignIn />} />
  </Routes>
);

export default App;
