ResearchHub AI – Intelligent Research Assistant
ResearchHub AI is a full‑stack web application that helps students, researchers, and professionals manage research papers and use an AI assistant to summarise, compare, and ask questions based on their own library of documents.

1. Features
JWT‑based authentication

User registration and login with secure token handling.

Protected routes for all paper and AI operations.

Paper library (Doc Space)

Search and import papers from a search interface.

Upload local PDF files with metadata (title, authors, abstract).

View all imported and uploaded papers in a unified Doc Space.

AI Tools (LLM‑powered)

Summarize Papers – generate concise summaries of selected or relevant papers.

Compare Papers – contrast methodologies, datasets, and findings across papers.

Ask Research Question – ask broader questions answered using the user’s library as context.

Clean dashboard

Shows recent papers and entry points to the AI tools.

2. Project Structure
text
project-root/
├── backend/           # FastAPI backend code
├── frontend-app/      # React + TypeScript frontend code
├── documentation/     # All project documents required by mentors
└── README.md
The backend/ folder contains the complete backend implementation (FastAPI app, routers for auth/papers/chat, models, and configuration).

The frontend-app/ folder contains the React + TypeScript single‑page application (pages, components, API client, routing, and styling).

The documentation/ folder contains all the templates and filled‑in documents requested by mentors, including problem statements, planning, architecture, testing, and UAT reports.

3. Technology Stack
Frontend

React, TypeScript

React Router, fetch/axios for API calls

HTML, CSS (or a component library)

Backend

FastAPI (Python)

Pydantic for data models

JWT for authentication

HTTP client library for calling the LLM API

Other

Git & GitHub for version control

External LLM provider (for AI summaries, comparisons, and Q&A)

4. Getting Started
4.1. Prerequisites
Node.js (LTS)

Python 3.11+

Git

An LLM API key (if required, configured via environment variables)

4.2. Backend setup (backend/)
bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS / Linux

pip install -r requirements.txt
uvicorn main:app --reload
The backend will start on http://localhost:8000 (or the port configured in main.py / settings).

4.3. Frontend setup (frontend-app/)
bash
cd frontend-app
npm install
npm start
The frontend will start on http://localhost:3000 and communicate with the backend via the configured API base URL (e.g. http://localhost:8000).

5. Environment Configuration
Create environment files as needed (examples):

Backend – .env in backend/

API base URL

JWT secret and expiry settings

LLM API key and endpoint

Frontend – .env in frontend-app/

REACT_APP_API_BASE_URL=http://localhost:8000

6. Typical Workflow
Start backend and frontend as described above.

Register a new user and log in.

Use Search Papers to find a topic and Import a paper.

Use Upload PDF to add your own paper.

Open Doc Space to see all saved papers.

Navigate to AI Tools and use Summarize / Compare / Ask Question to interact with the AI assistant.

7. Documentation
All non‑code artefacts requested by mentors (problem statements, brainstorming, empathy maps, requirement analysis, solution architecture, technology stack, planning, testing, UAT reports, etc.) are stored in the documentation/ folder, organised by phase. You can open these files directly to review the design and process behind the project.

8. Contributing
Create a new branch for any feature or fix.

Follow consistent coding style for React and FastAPI.

Update documentation if you change architecture, endpoints, or core flows.

## Demo

You can watch the demo video of this project here:  
[Project demo video](https://drive.google.com/file/d/1VQYivKoxEEcKyGoNQGZzbnWo8lAxclaB/view)