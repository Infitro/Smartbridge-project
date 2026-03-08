# ResearchHub AI – Intelligent Research Assistant

ResearchHub AI is a full‑stack web application that helps students, researchers, and professionals manage research papers and use an AI assistant to summarise, compare, and ask questions based on their own library.

---

## 1. Overview

- Secure user authentication (JWT).
- Personal library for research papers (import + upload).
- AI tools to summarise and compare papers and answer research questions.
- Clean dashboard and dark‑themed UI suitable for demos and presentations.

Demo video: (https://drive.google.com/file/d/1VQYivKoxEEcKyGoNQGZzbnWo8lAxclaB/view)

---

## 2. Project Structure

```text
project-root/
├── backend/        # FastAPI backend (APIs, auth, AI orchestration)
├── frontend-app/   # React + TypeScript frontend (UI & client logic)
├── documentation/  # All mentor-required documents & templates
└── README.md
```
- backend/ – Complete backend service: FastAPI app, routers for auth/papers/chat, data models, configuration, and LLM integration.
- frontend-app/ – React single‑page application: pages (Dashboard, Search, Upload PDF, Doc Space, AI Tools), components, routing, and API client.
- documentation/ – All project documentation requested by mentors (problem statements, brainstorming, empathy maps, architecture, planning, testing, UAT, etc.).

---

## 3. Features

3.1 Authentication & Security
- Email‑based registration and login.
- JWT token‑based authentication for protected routes.
- Logout and basic session handling.

3.2 Paper Management (Doc Space)
- Search papers by keyword and import selected results into the user’s library.
- Upload local PDF files with metadata (title, authors, abstract).
- Unified Doc Space view listing all imported and uploaded papers.

3.3 AI Tools
- Summarize Papers – Generate concise summaries of selected/relevant papers.
- Compare Papers – Highlight similarities and differences across multiple papers.
- Ask Research Question – Ask open‑ended questions answered using the user’s library as context.

3.4 Dashboard
- Shows recent papers and quick access to AI Tools, Search, Upload, and Doc Space.

---

## 4. Technology Stack

4.1 Frontend
- React
- TypeScript
- React Router
- Fetch/axios for REST API calls
- HTML, CSS (and/or UI component library)

4.2 Backend
- FastAPI (Python)
- Pydantic for data validation
- JWT library for authentication
- HTTP client library for LLM API calls

4.3 Other
- Git & GitHub for version control
- External LLM provider (for summarisation, comparison, and Q&A)

---

## 5. Getting Started

5.1 Prerequisites
- Node.js (LTS)
- Python 3.11+
- Git
- LLM API key (if required)

5.2 Backend Setup (backend/)

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

Backend default URL: http://localhost:8000

5.3 Frontend Setup (frontend-app/)

cd frontend-app

# Install dependencies
npm install

# Run frontend
npm start

Frontend default URL: http://localhost:3000

---

## 6. Environment Configuration

6.1 Backend .env (example)

JWT_SECRET=your_jwt_secret_here
JWT_ALGORITHM=HS256
LLM_API_KEY=your_llm_api_key_here
LLM_API_BASE_URL=https://api.llm-provider.com

6.2 Frontend .env (example)

REACT_APP_API_BASE_URL=http://localhost:8000

Restart dev servers after changing environment variables.

---

## 7. Typical User Flow

1. Register and log in to obtain a JWT token.
2. Land on the dashboard with recent papers and quick links.
3. Search for papers and import relevant ones into the library.
4. Upload local PDFs and add/edit metadata.
5. View all papers in Doc Space.
6. Use AI Tools (Summarize, Compare, Ask Question) to interact with the AI assistant using the user’s library as context.

---

## 8. Documentation

All non‑code artefacts are stored under:

documentation/

This includes problem statements, brainstorming, empathy maps, solution architecture, technology stack, project planning, testing documents, UAT reports, and other mentor‑required files.

---

## 9. Development & Contribution

- Create a new branch for each feature or bugfix:
  git checkout -b feature/xyz
- Keep commit messages clear and descriptive (mention milestones when relevant).
- Ensure backend and frontend both run locally and main flows work before pushing.
- Update documentation/ and this README if you make significant changes.

---

