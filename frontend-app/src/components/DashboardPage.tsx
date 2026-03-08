import React, { useEffect, useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import { getMyPapers, Paper } from "../api/papers";

const DashboardPage: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await getMyPapers(token);
        setPapers(data);
      } catch (e: any) {
        setError(e.message || "Failed to load papers");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const recentPapers = papers.slice(-5).reverse(); // last 5 as "recent"

  return (
    <DashboardLayout>
      <section>
        <h2 className="rh-section-title">Dashboard</h2>
        <p className="rh-section-subtitle">
          Overview of your recent research activity and workspaces.
        </p>

        <div className="rh-card-grid">
          {/* Recent Papers */}
          <div className="rh-card">
            <div className="rh-card-title">Recent Papers</div>
            <div className="rh-card-subtitle">
              Quickly access papers you imported recently.
            </div>

            {loading ? (
              <p>Loading papers...</p>
            ) : error ? (
              <p style={{ color: "salmon", fontSize: 12 }}>{error}</p>
            ) : recentPapers.length === 0 ? (
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                No papers yet. Try importing one from the Search or Upload
                sections.
              </p>
            ) : (
              <ul>
                {recentPapers.map((p) => (
                  <li key={p.id}>
                    <strong>{p.title}</strong>
                    <br />
                    <span style={{ fontSize: 12, color: "#9ca3af" }}>
                      {Array.isArray(p.authors)
                        ? p.authors.join(", ")
                        : p.authors}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Active Workspaces – still placeholder for now */}
          <div className="rh-card">
            <div className="rh-card-title">Active Workspaces</div>
            <div className="rh-card-subtitle">
              Manage ongoing research projects.
            </div>
            <ul>

  <li>
    <a href="/workspaces/1" style={{ color: "#60a5fa" }}>
      Workspace: Graph Learning
    </a>
  </li>
  <li>
    <a href="/workspaces/2" style={{ color: "#60a5fa" }}>
      Workspace: Medical Imaging
    </a>
  </li>
</ul>

          </div>

          {/* AI Insights – placeholder */}
          <div className="rh-card">
            <div className="rh-card-title">AI Insights</div>
            <div className="rh-card-subtitle">
              Recent summaries and AI conversations.
            </div>
            <button
  className="rh-button-primary"
  onClick={() => (window.location.href = "/workspaces/1")}
>
  Open AI assistant
</button>

          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
