import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import UploadPage from "@/pages/UploadPage";
import ReportPage from "@/pages/ReportPage";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}
