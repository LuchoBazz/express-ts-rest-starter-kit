import { Route, Routes } from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp.tsx/SignUp";

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignUp />} />
    <Route path="*" element={<SignIn />} />
  </Routes>
);

export default App;
