import React, { useState } from "react";
import { apiFetch } from "./api";

export default function ImportPaper() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [sourceId, setSourceId] = useState("");

  const submit = async () => {
    const res = await apiFetch("/papers/import", {
      method: "POST",
      body: JSON.stringify({
        title,
        abstract,
        authors,
        source_id: sourceId
      })
    });

    alert(res.message || "Imported!");
  };

  return (
    <div>
      <h3>Import Paper</h3>
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <textarea
        placeholder="Abstract"
        onChange={(e) => setAbstract(e.target.value)}
      />
      <br />
      <input
        placeholder="Authors"
        onChange={(e) => setAuthors(e.target.value)}
      />
      <br />
      <input
        placeholder="Source ID"
        onChange={(e) => setSourceId(e.target.value)}
      />
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
