import React from "react";
import "./LoginPage.css";
import LoginForm from "./LoginForm";

type LoginPageProps = {
  onLoginSuccess: (accessToken: string) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  return (
    <div className="rh-login-root">
      <div className="rh-login-panel">
        <div className="rh-login-header">
          <h1>ResearchHub AI</h1>
          <p>Sign in to manage and analyze your research papers intelligently.</p>
        </div>
        <LoginForm onLoginSuccess={onLoginSuccess} />
      </div>
      <div className="rh-login-hero">
        <div className="rh-login-hero-content">
          <h2>Intelligent Research Workspaces</h2>
          <p>
            Organize papers, maintain context across projects, and ask an AI
            assistant to synthesize findings in seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
