from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.models.user import User
from app.models.chat import ChatMessage
from app.routers.auth import get_current_user
from app.utils.groq_client import client, MODEL_CONFIG
from app.models.papers import Paper
from app.routers.papers import fake_papers_db

router = APIRouter(prefix="/chat", tags=["chat"])


async def get_workspace_papers(workspace_id: int, owner_id: int) -> list[Paper]:
    # TODO: Replace with real DB query filtered by workspace_id and owner_id
    # For now, just return all papers belonging to the user
    return [
        Paper(**p) for p in fake_papers_db
        if p["owner_id"] == owner_id
    ]


def create_research_context(papers: List[Paper], user_query: str) -> str:
    """
    Aggregate paper information (titles, authors, abstracts) into a structured
    context string that will be sent to the LLM.
    """
    snippets: List[str] = []
    for p in papers:
        snippet = (
            f"Title: {p.title}\n"
            f"Authors: {', '.join(p.authors) if isinstance(p.authors, list) else p.authors}\n"
            f"Abstract: {p.abstract}"
        )
        snippets.append(snippet)

    papers_context = "\n\n---\n\n".join(snippets) if snippets else "No papers available in this workspace."
    return f"Research Papers Context:\n{papers_context}\n\nUser Query: {user_query}"


async def store_conversation(workspace_id: int, user_msg: str, ai_msg: str) -> None:
    # TODO: Persist conversation to DB; for now, this is a no-op
    return None


@router.post("/workspace")
async def chat_with_papers(
    message: ChatMessage,
    workspace_id: int,
    current_user: User = Depends(get_current_user),
):
    """
    Multi-turn research chat using papers from a given workspace as context.
    """
    if not message.content:
        raise HTTPException(status_code=400, detail="Message content is required")

    workspace_papers = await get_workspace_papers(workspace_id, current_user.id)
    context = create_research_context(workspace_papers, message.content)

    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an expert research assistant.",
            },
            {
                "role": "user",
                "content": f"Context: {context}\n\nQuestion: {message.content}",
            },
        ],
        **MODEL_CONFIG,
    )

    answer = response.choices[0].message.content
    await store_conversation(workspace_id, message.content, answer)

    return {"response": answer}
