import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/search", label: "Search Papers" },
  { path: "/ai-tools", label: "AI Tools" },
  { path: "/upload", label: "Upload PDF" },
  { path: "/doc-space", label: "Doc Space" },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="rh-root">
      <aside className="rh-sidebar">
        <div className="rh-logo">ResearchHub AI</div>
        <nav className="rh-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={
                location.pathname.startsWith(item.path)
                  ? "rh-nav-item rh-nav-item-active"
                  : "rh-nav-item"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="rh-main">
        <header className="rh-topbar">
          <div className="rh-topbar-left">
            {/* Placeholder – later: workspace selector, breadcrumbs */}
          </div>
          <div className="rh-topbar-right">
            {/* Placeholder – later: user menu, status */}
            <span className="rh-user-pill">Researcher</span>
          </div>
        </header>

        <main className="rh-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
