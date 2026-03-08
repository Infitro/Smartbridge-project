import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="rh-home-root">
      <div className="rh-home-inner">
        <h1>ResearchHub AI</h1>
        <p>
          Intelligent research paper management and analysis using agentic AI.
          Organize workspaces, search literature, and chat with an expert
          assistant.
        </p>
        <div className="rh-home-actions">
          <Link to="/login" className="rh-home-button-primary">
            Sign in
          </Link>
          <Link to="/dashboard" className="rh-home-button-secondary">
            View dashboard (if signed in)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
