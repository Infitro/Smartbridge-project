from fastapi import APIRouter, Depends, UploadFile, File, Form

from app.models.user import User
from app.models.papers import PaperImport, PaperSearchResponse, PaperSearchResult, Paper
from app.routers.auth import get_current_user

router = APIRouter(prefix="/papers", tags=["papers"])

# Temporary in-memory storage
fake_papers_db: list[dict] = []


async def query_academic_databases(query: str) -> list[PaperSearchResult]:
    # TODO: Integrate real external academic APIs (e.g., Semantic Scholar)
    # For now, return a dummy example
    return [
        PaperSearchResult(
            title=f"Example paper for '{query}'",
            abstract="This is a placeholder abstract for demonstration.",
            authors="Doe et al.",
            source_id="example-123",
        )
    ]


async def store_paper(paper_data: PaperImport, owner_id: int) -> Paper:
    paper_id = len(fake_papers_db) + 1
    record = {
        "id": paper_id,
        "title": paper_data.title,
        "abstract": paper_data.abstract,
        "authors": paper_data.authors,
        "owner_id": owner_id,
    }
    fake_papers_db.append(record)
    return Paper(**record)


@router.get("/search", response_model=PaperSearchResponse)
async def search_papers(query: str, current_user: User = Depends(get_current_user)):
    search_results = await query_academic_databases(query)
    return PaperSearchResponse(papers=search_results)


@router.post("/import")
async def import_paper(paper_data: PaperImport, current_user: User = Depends(get_current_user)):
    imported_paper = await store_paper(paper_data, current_user.id)
    return {"message": "Paper imported successfully", "paper": imported_paper}

@router.get("/", response_model=list[Paper])
async def list_my_papers(current_user: User = Depends(get_current_user)):
    """
    Return all papers imported by the current user.
    Later you can add pagination or 'recent only' logic.
    """
    user_papers = [
        Paper(**p) for p in fake_papers_db
        if p["owner_id"] == current_user.id
    ]
    return user_papers

@router.post("/upload")
async def upload_paper(
    file: UploadFile = File(...),
    title: str = Form(...),
    abstract: str = Form(""),
    authors: str = Form(""),
    current_user: User = Depends(get_current_user),
):
    """
    Very simple upload: we ignore actual file contents for now and
    just store the metadata in fake_papers_db.
    """
    paper_data = PaperImport(
        title=title,
        abstract=abstract or f"Uploaded file: {file.filename}",
        authors=authors or "Unknown",
    )
    imported_paper = await store_paper(paper_data, current_user.id)
    return {"message": "Paper uploaded successfully", "paper": imported_paper}

