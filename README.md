ResearchHub AI – Intelligent Research Assistant
ResearchHub AI is a full‑stack web application that helps students, researchers, and professionals manage research papers and use an AI assistant to summarise, compare, and ask questions based on their own library.

1. Overview
Secure user authentication (JWT).

Personal library for research papers (import + upload).

AI tools to summarise and compare papers and answer research questions.

Clean dashboard and dark‑themed UI suitable for demos and presentations.

👉 Demo video: (https://drive.google.com/file/d/1VQYivKoxEEcKyGoNQGZzbnWo8lAxclaB/view)

2. Project Structure
text
project-root/
├── backend/           # FastAPI backend (APIs, auth, AI orchestration)
├── frontend-app/      # React + TypeScript frontend (UI & client logic)
├── documentation/     # All mentor-required documents & templates
└── README.md
backend/ – Contains the complete backend service: FastAPI app, routers for auth/papers/chat, data models, configuration, and integration with the LLM API.

frontend-app/ – Contains the React single‑page application: pages (Dashboard, Search, Upload PDF, Doc Space, AI Tools), reusable components, routing, and API client code.

documentation/ – Contains all project documentation requested by mentors (problem statements, brainstorming, empathy maps, solution architecture, planning, testing, UAT, etc.).

3. Features
Authentication & Security

Email‑based registration and login.

JWT token‑based authentication for protected routes.

Logout and basic session handling.

Paper Management (Doc Space)

Search papers by keyword and import selected results into the user’s library.

Upload local PDF files with metadata (title, authors, abstract).

Unified Doc Space view listing all imported and uploaded papers.

AI Tools

Summarize Papers – Generate concise summaries of selected/relevant papers.

Compare Papers – Highlight similarities and differences across multiple papers.

Ask Research Question – Ask open‑ended questions answered using the user’s library as context.

Dashboard

Shows recent papers and quick access to AI Tools, Search, Upload, and Doc Space.

4. Technology Stack
Frontend

React

TypeScript

React Router

Fetch/axios for REST API calls

HTML, CSS (and/or UI component library)

Backend

FastAPI (Python)

Pydantic for data validation

JWT library for authentication

HTTP client library for LLM API calls

Other

Git & GitHub for version control

External LLM provider (for summarisation, comparison, and Q&A)

5. Getting Started
5.1 Prerequisites
Node.js (LTS)

Python 3.11+

Git

LLM API key (if required)

5.2 Backend Setup (backend/)
bash
cd backend

# Create and activate virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run backend
uvicorn main:app --reload
Backend default URL: http://localhost:8000 (or as configured).

5.3 Frontend Setup (frontend-app/)
bash
cd frontend-app

# Install dependencies
npm install

# Run frontend
npm start
Frontend default URL: http://localhost:3000.

6. Environment Configuration
6.1 Backend .env (example)
text
JWT_SECRET=your_jwt_secret_here
JWT_ALGORITHM=HS256
LLM_API_KEY=your_llm_api_key_here
LLM_API_BASE_URL=https://api.llm-provider.com
6.2 Frontend .env (example)
text
REACT_APP_API_BASE_URL=http://localhost:8000
Make sure to restart the dev servers after changing environment variables.

7. Typical User Flow
Register & Login

User signs up and logs in to obtain a JWT token.

Dashboard

Dashboard loads user‑specific data (recent papers, quick links).

Search & Import

User searches for a topic, inspects results, and imports relevant papers into their library.

Upload PDFs

User uploads local PDFs and adds/edit metadata.

Doc Space

User views all imported and uploaded papers in a unified table.

AI Tools

User opens Summarize / Compare / Ask Question and interacts with the AI assistant using their library as context.

8. Documentation
All process and design documents (problem statements, brainstorming, empathy maps, architecture, technology stack, planning, testing, UAT, etc.) are stored under:

documentation/

These files follow the formats and templates requested by mentors and can be used for evaluation and review.
