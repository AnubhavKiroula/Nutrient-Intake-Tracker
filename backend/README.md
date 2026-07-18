# Backend — NutriTrack AI

> **⚠️ Phase 2 — This folder is a stub. Backend development begins in Phase 2.**

---

## Planned Tech Stack (Phase 2+)

| Layer | Technology |
|-------|-----------|
| Framework | FastAPI (Python 3.11+) |
| Database | PostgreSQL 16 |
| ORM | SQLAlchemy 2.x + Alembic (migrations) |
| Cache | Redis |
| Auth | JWT (access + refresh tokens), email verification |
| Validation | Pydantic v2 |
| Testing | pytest + httpx |

---

## Planned Folder Structure (Phase 2)

```
backend/
├── app/
│   ├── api/              # Route handlers
│   ├── core/             # Config, security, middleware
│   ├── db/               # SQLAlchemy models, sessions
│   ├── schemas/          # Pydantic request/response schemas
│   ├── services/         # Business logic layer
│   └── main.py           # FastAPI app entrypoint
├── alembic/              # DB migrations
├── tests/
├── requirements.txt
├── pyproject.toml
└── README.md             (this file)
```

---

## API Response Envelope (contract for Phase 5 frontend integration)

All API responses follow this shape — **the frontend mock-api layer already mirrors this contract**:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 100
  }
}
```

On error:
```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email already exists",
    "details": {}
  }
}
```

---

## Phase 2 Ownership

Phase 2 will build:
- FastAPI app skeleton with CORS, middleware, error handlers
- Health check endpoint
- Database connection setup
- Base model and schema patterns
- Docker Compose for local dev (PostgreSQL + Redis + API)

**Frontend integration (Phase 5):** Replace `frontend/lib/mock-api/` functions with real Axios calls to this backend. The response envelope and data shapes are already designed to match.
