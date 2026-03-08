import React, { useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import {
  searchPapers,
  importPaper,
  PaperSearchResult,
} from "../api/papers";

const SearchPapersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PaperSearchResult[]>([]);
  const [selected, setSelected] = useState<PaperSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token") || "";

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      setSelected(null);

      const data = await searchPapers(token, query.trim());
      setResults(data.papers);
      if (data.papers.length > 0) {
        setSelected(data.papers[0]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to search papers");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!selected) return;

    try {
      setImporting(true);
      setError(null);
      setMessage(null);

      const payload = {
        title: selected.title,
        abstract: selected.abstract,
        authors: selected.authors, // send as string
      };

      const paper = await importPaper(token, payload);
      setMessage(`Imported paper: ${paper.title}`);
    } catch (err: any) {
      setError(err.message || "Failed to import paper");
    } finally {
      setImporting(false);
    }
  };

  return (
    <DashboardLayout>
      <section>
        <h2 className="rh-section-title">Search Papers</h2>
        <p className="rh-section-subtitle">
          Query academic databases and import relevant papers into your library.
        </p>

        <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
          <input
            style={{
              padding: 8,
              borderRadius: 8,
              border: "1px solid #1e293b",
              width: "60%",
              marginRight: 8,
            }}
            placeholder="Search by keyword, author, or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="rh-button-primary" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p style={{ color: "salmon", fontSize: 12, marginBottom: 8 }}>{error}</p>
        )}
        {message && (
          <p style={{ color: "#22c55e", fontSize: 12, marginBottom: 8 }}>{message}</p>
        )}

        <div className="rh-card-grid">
          {/* Results list */}
          <div className="rh-card">
            <div className="rh-card-title">Results</div>
            <div className="rh-card-subtitle">
              Click a result to see details and import it.
            </div>
            {results.length === 0 ? (
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                No results yet. Try a search above.
              </p>
            ) : (
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {results.map((r) => (
                  <li
                    key={r.source_id}
                    onClick={() => setSelected(r)}
                    style={{
                      padding: "8px 0",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(15,23,42,0.6)",
                      color:
                        selected && selected.source_id === r.source_id
                          ? "#e5e7eb"
                          : "#9ca3af",
                    }}
                  >
                    <strong style={{ display: "block", color: "#e5e7eb" }}>
                      {r.title}
                    </strong>
                    <span style={{ fontSize: 12 }}>
                      {r.authors} — {r.source_id}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Selected paper preview */}
          <div className="rh-card">
            <div className="rh-card-title">Selected Paper</div>
            <div className="rh-card-subtitle">
              Preview metadata and import into your library.
            </div>

            {!selected ? (
              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                Select a paper from the results list.
              </p>
            ) : (
              <>
                <h3 style={{ fontSize: 14, marginBottom: 4 }}>{selected.title}</h3>
                <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>
                  {selected.authors}
                </p>
                <p style={{ fontSize: 13, marginBottom: 12 }}>
                  {selected.abstract}
                </p>
                <button
                  className="rh-button-primary"
                  onClick={handleImport}
                  disabled={importing}
                >
                  {importing ? "Importing..." : "Import to library"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default SearchPapersPage;
