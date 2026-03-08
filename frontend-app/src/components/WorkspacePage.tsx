import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import { chatWithWorkspace } from "../api/chat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const useQuery = () => new URLSearchParams(useLocation().search);

const getModeInfo = (mode: string | null) => {
  switch (mode) {
    case "summarize":
      return {
        title: "Summarize Papers",
        subtitle: "Generate concise summaries of your imported papers.",
        helper:
          "Ask me to summarize a specific paper or all papers in this workspace.",
        placeholder: "Summarize the main contributions of these papers...",
      };
    case "compare":
      return {
        title: "Compare Papers",
        subtitle: "Contrast methodologies, datasets, and findings.",
        helper:
          "Ask me to compare two or more papers on a specific dimension (methods, results, limitations).",
        placeholder: "Compare the methodologies used in these papers...",
      };
    default:
      return {
        title: "Ask Research Question",
        subtitle: "Chat with the AI assistant about your research.",
        helper: "Ask any question that these papers can help answer.",
        placeholder: "What are the key ideas or open problems in this topic?",
      };
  }
};

const WorkspacePage: React.FC = () => {
  const { id } = useParams();
  const query = useQuery();
  const mode = query.get("mode"); // 'summarize' | 'compare' | 'qa' | null

  const workspaceId = Number(id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("access_token") || "";
  const modeInfo = getModeInfo(mode);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !workspaceId) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await chatWithWorkspace(token, workspaceId, userMsg.content);
      const aiMsg: ChatMessage = { role: "assistant", content: res.response };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setError(err.message || "Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <section>
        <h2 className="rh-section-title">
          Workspace {workspaceId} · {modeInfo.title}
        </h2>
        <p className="rh-section-subtitle">{modeInfo.subtitle}</p>

        <div className="rh-card-grid">
          {/* Papers placeholder for now */}
          <div className="rh-card">
            <div className="rh-card-title">Papers</div>
            <div className="rh-card-subtitle">
              All papers associated with this workspace.
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af" }}>
              We will list real workspace papers here later.
            </p>
          </div>

          {/* Chat with AI */}
          <div
            className="rh-card"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="rh-card-title">Chat with AI</div>
            <div className="rh-card-subtitle">{modeInfo.helper}</div>

            <div
              style={{
                flex: 1,
                minHeight: 200,
                maxHeight: 320,
                overflowY: "auto",
                padding: "8px 4px",
                marginBottom: 12,
                borderRadius: 8,
                background: "rgba(15,23,42,0.7)",
              }}
            >
              {messages.length === 0 ? (
                <p style={{ fontSize: 13, color: "#9ca3af" }}>
                  Start the conversation by using the input below.
                </p>
              ) : (
                messages.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: 8,
                      textAlign: m.role === "user" ? "right" : "left",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        borderRadius: 12,
                        background:
                          m.role === "user"
                            ? "#4f46e5"
                            : "rgba(15,23,42,0.95)",
                        color: "#e5e7eb",
                        fontSize: 13,
                      }}
                    >
                      {m.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {error && (
              <p style={{ color: "salmon", fontSize: 12, marginBottom: 8 }}>
                {error}
              </p>
            )}

            <form onSubmit={handleSend} style={{ display: "flex", gap: 8 }}>
              <input
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #1e293b",
                  fontSize: 13,
                  background: "#020617",
                  color: "#e5e7eb",
                }}
                placeholder={modeInfo.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="rh-button-primary"
                disabled={loading || !input.trim()}
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default WorkspacePage;
