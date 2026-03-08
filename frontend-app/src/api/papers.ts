import { apiGet, apiPost } from "./client";

// For dashboard and imports
export interface Paper {
  id: number;
  title: string;
  abstract: string;
  authors: string | string[];
  owner_id?: number;
}

export async function getMyPapers(token: string): Promise<Paper[]> {
  return apiGet<Paper[]>("/papers", token);
}

// For search results
export interface PaperSearchResult {
  title: string;
  abstract: string;
  authors: string;      // backend returns authors as a single string
  source_id: string;
}

export interface PaperSearchResponse {
  papers: PaperSearchResult[];
}

export async function searchPapers(
  token: string,
  query: string
): Promise<PaperSearchResponse> {
  return apiGet<PaperSearchResponse>(
    `/papers/search?query=${encodeURIComponent(query)}`,
    token
  );
}

// For importing a paper
export interface PaperImportRequest {
  title: string;
  abstract: string;
  authors: string;      // send as string, backend expects string
}

export async function importPaper(
  token: string,
  payload: PaperImportRequest
): Promise<Paper> {
  const res = await apiPost<PaperImportRequest, { message: string; paper: Paper }>(
    "/papers/import",
    payload,
    token
  );
  return res.paper;
}

export interface UploadPaperPayload {
  file: File;
  title: string;
  abstract?: string;
  authors?: string;
}

export async function uploadPaper(
  token: string,
  payload: UploadPaperPayload
): Promise<Paper> {
  const formData = new FormData();
  formData.append("file", payload.file);
  formData.append("title", payload.title);
  formData.append("abstract", payload.abstract || "");
  formData.append("authors", payload.authors || "");

  const res = await fetch("http://127.0.0.1:8000/papers/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // do NOT set Content-Type; browser sets correct multipart boundary
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { message: string; paper: Paper };
  return data.paper;
}
