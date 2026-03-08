import { apiPost } from "./client";

export interface ChatMessageRequest {
  content: string;
}

export interface ChatResponse {
  response: string;
}

export async function chatWithWorkspace(
  token: string,
  workspaceId: number,
  content: string
): Promise<ChatResponse> {
  const payload: ChatMessageRequest = { content };
  return apiPost<ChatMessageRequest, ChatResponse>(
    `/chat/workspace?workspace_id=${workspaceId}`,
    payload,
    token
  );
}
