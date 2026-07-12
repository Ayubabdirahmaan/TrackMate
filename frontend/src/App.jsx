import { Navigate, replace, Route, Routes } from "react-router";
import "./App.css";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Dashbaord from "./pages/Dashbaord/Dashbaord";
import Admin from "./pages/Dashbaord/Admin";
import ProtectRoute from "./components/auth/ProtectRoute";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<ProtectRoute><Dashbaord /></ProtectRoute>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Navigate to='/login' replace />} />
    </Routes>
  );
}

export default App;
