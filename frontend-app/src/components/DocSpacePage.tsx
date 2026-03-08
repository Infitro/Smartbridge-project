import React, { useEffect, useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import { getMyPapers, Paper } from "../api/papers";

const DocSpacePage: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
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
        setError(e.message || "Failed to load documents");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <DashboardLayout>
      <section>
        <h2 className="rh-section-title">Doc Space</h2>
        <p className="rh-section-subtitle">
          Browse all papers you&apos;ve imported into your account.
        </p>

        {loading ? (
          <p>Loading documents...</p>
        ) : error ? (
          <p style={{ color: "salmon", fontSize: 12 }}>{error}</p>
        ) : papers.length === 0 ? (
          <p style={{ fontSize: 13, color: "#9ca3af" }}>
            No documents yet. Import papers from the Search page.
          </p>
        ) : (
          <div className="rh-card">
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #1e293b" }}>
                  <th style={{ padding: "8px 4px" }}>Title</th>
                  <th style={{ padding: "8px 4px" }}>Authors</th>
                  <th style={{ padding: "8px 4px" }}>ID</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #020617" }}>
                    <td style={{ padding: "8px 4px" }}>{p.title}</td>
                    <td style={{ padding: "8px 4px", color: "#9ca3af" }}>
                      {Array.isArray(p.authors) ? p.authors.join(", ") : p.authors}
                    </td>
                    <td style={{ padding: "8px 4px", color: "#9ca3af" }}>{p.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
};

export default DocSpacePage;
