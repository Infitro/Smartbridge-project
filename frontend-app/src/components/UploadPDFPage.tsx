import React, { useState } from "react";
import DashboardLayout from "./layout/DashboardLayout";
import { uploadPaper } from "../api/papers";

const UploadPDFPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token") || "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f && !title) {
      setTitle(f.name.replace(/\.[^/.]+$/, "")); // default title from filename
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    try {
      setUploading(true);
      setError(null);
      setMessage(null);

      const paper = await uploadPaper(token, {
        file,
        title: title.trim(),
        abstract: abstract.trim(),
        authors: authors.trim(),
      });

      setMessage(`Uploaded paper: ${paper.title}`);
      setFile(null);
      setAbstract("");
      setAuthors("");
    } catch (err: any) {
      setError(err.message || "Failed to upload paper");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <section>
        <h2 className="rh-section-title">Upload PDF</h2>
        <p className="rh-section-subtitle">
          Upload research papers as PDF files and add them to your library.
        </p>

        <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#e5e7eb", display: "block", marginBottom: 4 }}>
              PDF file
            </label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#e5e7eb", display: "block", marginBottom: 4 }}>
              Title
            </label>
            <input
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #1e293b",
                background: "#020617",
                color: "#e5e7eb",
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Paper title"
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#e5e7eb", display: "block", marginBottom: 4 }}>
              Authors (optional)
            </label>
            <input
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #1e293b",
                background: "#020617",
                color: "#e5e7eb",
              }}
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="e.g. Doe et al."
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, color: "#e5e7eb", display: "block", marginBottom: 4 }}>
              Abstract (optional)
            </label>
            <textarea
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 8,
                border: "1px solid #1e293b",
                background: "#020617",
                color: "#e5e7eb",
                minHeight: 80,
              }}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Short description of the paper..."
            />
          </div>

          {error && (
            <p style={{ color: "salmon", fontSize: 12, marginBottom: 8 }}>{error}</p>
          )}
          {message && (
            <p style={{ color: "#22c55e", fontSize: 12, marginBottom: 8 }}>{message}</p>
          )}

          <button
            type="submit"
            className="rh-button-primary"
            disabled={uploading || !file || !title.trim()}
          >
            {uploading ? "Uploading..." : "Upload paper"}
          </button>
        </form>
      </section>
    </DashboardLayout>
  );
};

export default UploadPDFPage;
