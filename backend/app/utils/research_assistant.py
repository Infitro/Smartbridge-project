from typing import List, Dict
from .groq_client import client, MODEL_CONFIG

class ResearchAssistant:
    def __init__(self) -> None:
        self.conversation_history: List[Dict[str, str]] = []

    def create_research_context(self, papers: List[Dict], query: str) -> str:
        context_parts = []
        for paper in papers:
            paper_context = f"""
Title: {paper.get('title', '')}
Authors: {', '.join(paper.get('authors', []))}
Abstract: {paper.get('abstract', '')}
"""
            context_parts.append(paper_context.strip())

        full_context = "\n---\n".join(context_parts)
        return f"Research Papers Context:\n{full_context}\n\nUser Query: {query}"

    def generate_research_response(self, context: str, query: str) -> str:
        messages = [
            {"role": "system", "content": "You are an expert research assistant."},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {query}"},
        ]
        response = client.chat.completions.create(
            messages=messages,
            **MODEL_CONFIG,
        )
        return response.choices[0].message.content
