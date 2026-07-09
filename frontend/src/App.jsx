import { Route, Routes } from "react-router";
import "./App.css";
import RegisterPage from "./pages/auth/RegisterPage";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
