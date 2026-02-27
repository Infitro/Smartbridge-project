import os
from groq import Groq
from dotenv import load_dotenv

# Load variables from .env into environment
load_dotenv()

# Initialize Groq client with API key from environment
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Central model configuration for the app
MODEL_CONFIG = {
    "model": "llama-3.3-70b-versatile",
    "temperature": 0.3,
    "max_tokens": 2000,
    "top_p": 0.9,
}

def generate_research_response(user_message: str) -> str:
    """
    Call Groq LLM with standardized config for research queries.
    """
    completion = client.chat.completions.create(
        model=MODEL_CONFIG["model"],
        messages=[
            {
                "role": "system",
                "content": (
                    "You are ResearchHub AI, an assistant that helps analyze and "
                    "summarize research papers in a precise, non-creative way."
                ),
            },
            {"role": "user", "content": user_message},
        ],
        temperature=MODEL_CONFIG["temperature"],
        max_tokens=MODEL_CONFIG["max_tokens"],
        top_p=MODEL_CONFIG["top_p"],
    )

    return completion.choices[0].message.content
