import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getMe, MeResponse } from "./api/user";

import HomePage from "./components/HomePage";
import DashboardPage from "./components/DashboardPage";
import SearchPapersPage from "./components/SearchPapersPage";
import WorkspacePage from "./components/WorkspacePage";
import AIToolsPage from "./components/AIToolsPage";
import UploadPDFPage from "./components/UploadPDFPage";
import DocSpacePage from "./components/DocSpacePage";
import LoginPage from "./components/LoginPage";

function App() {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("access_token")
  );
  const [me, setMe] = useState<MeResponse | null>(null);
  const [meError, setMeError] = useState<string | null>(null);
  const isAuthenticated = !!token;

  const handleLoginSuccess = (accessToken: string) => {
    setToken(accessToken);
    localStorage.setItem("access_token", accessToken);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setToken(null);
    setMe(null);
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  // When token changes (user logged in), load /auth/me
  useEffect(() => {
    if (!token) return;

    const loadMe = async () => {
      try {
        setMeError(null);
        const data = await getMe(token);
        setMe(data);
      } catch (err: any) {
        setMeError(err.message || "Failed to load profile");
      }
    };

    loadMe();
  }, [token]);

  // Simple wrapper to protect routes
  const PrivateRoute = (element: React.ReactElement) =>
    isAuthenticated ? element : <Navigate to="/login" />;

  return (
    <>
      {/* Tiny profile + logout banner */}
      {isAuthenticated && (
        <div
          style={{
            position: "fixed",
            top: 8,
            right: 8,
            zIndex: 9999,
            fontSize: 12,
            padding: "6px 10px",
            borderRadius: 999,
            background: "rgba(15,23,42,0.85)",
            color: "#e5e7eb",
          }}
        >
          {meError && <span style={{ color: "red" }}>{meError}</span>}
          {me && (
            <span>
              {me.email} &nbsp;|&nbsp;
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#60a5fa",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Logout
              </button>
            </span>
          )}
        </div>
      )}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Protected routes */}
        <Route path="/dashboard" element={PrivateRoute(<DashboardPage />)} />
        <Route path="/search" element={PrivateRoute(<SearchPapersPage />)} />
        <Route
          path="/workspaces/:id"
          element={PrivateRoute(<WorkspacePage />)}
        />
        <Route path="/ai-tools" element={PrivateRoute(<AIToolsPage />)} />
        <Route path="/upload" element={PrivateRoute(<UploadPDFPage />)} />
        <Route path="/doc-space" element={PrivateRoute(<DocSpacePage />)} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
