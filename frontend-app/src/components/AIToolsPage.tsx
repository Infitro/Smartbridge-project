import React from "react";
import DashboardLayout from "./layout/DashboardLayout";

const AIToolsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <section>
        <h2 className="rh-section-title">AI Tools</h2>
        <p className="rh-section-subtitle">
          Use AI to summarize papers, compare findings, and ask research questions.
        </p>

        <div className="rh-card-grid">
          {/* Summarize Papers */}
          <div className="rh-card">
            <div className="rh-card-title">Summarize Papers</div>
            <div className="rh-card-subtitle">
              Generate concise summaries from your imported papers.
            </div>
            <button
              className="rh-button-primary"
              style={{ marginTop: 16 }}
              onClick={() => (window.location.href = "/workspaces/1?mode=summarize")}
            >
              Open summarizer
            </button>
          </div>

          {/* Compare Papers */}
          <div className="rh-card">
            <div className="rh-card-title">Compare Papers</div>
            <div className="rh-card-subtitle">
              Contrast methodologies, datasets, and findings.
            </div>
            <button
              className="rh-button-primary"
              style={{ marginTop: 16 }}
              onClick={() => (window.location.href = "/workspaces/1?mode=compare")}
            >
              Open comparator
            </button>
          </div>

          {/* Ask Research Question */}
          <div className="rh-card">
            <div className="rh-card-title">Ask Research Question</div>
            <div className="rh-card-subtitle">
              Chat with the AI assistant using your papers as context.
            </div>
            <button
              className="rh-button-primary"
              style={{ marginTop: 16 }}
              onClick={() => (window.location.href = "/workspaces/1?mode=qa")}
            >
              Ask question
            </button>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AIToolsPage;
