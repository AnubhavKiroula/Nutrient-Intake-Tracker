# NutriTrack AI

> A premium SaaS nutrition-tracking dashboard — track macros, micros, meals, and reach your health goals.

---

## 📦 Repository Structure

```
nutritrack-ai/
├── frontend/          # Next.js 14 App Router (TypeScript, Tailwind, shadcn/ui)
├── backend/           # FastAPI Python service (Phase 2+)
├── .github/           # CI/CD workflows
├── .gitignore
├── .editorconfig
└── README.md          (you are here)
```

---

## 🗺️ Project Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 0** | Project Planning & Architecture | ✅ Done |
| **Phase 1** | Frontend Foundation + Complete UI (mock data) | 🚧 In Progress |
| **Phase 2** | Backend Foundation (FastAPI skeleton) | ⏳ Pending |
| **Phase 3** | Database (PostgreSQL + SQLAlchemy + Alembic, Redis) | ⏳ Pending |
| **Phase 4** | Authentication (JWT, refresh tokens, email verification) | ⏳ Pending |
| **Phase 5** | API Integration (wire frontend → real backend, replace mock data) | ⏳ Pending |
| **Phase 6** | Testing (unit, integration, e2e) | ⏳ Pending |
| **Phase 7** | CI/CD | ⏳ Pending |
| **Phase 8** | Deployment (Vercel + Railway/Render + Supabase) | ⏳ Pending |
| **Phase 9** | Documentation | ⏳ Pending |

---

## 🚀 Quick Start

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the app runs on **mock data only** until Phase 5.

### Backend (Phase 2+)

See [`backend/README.md`](./backend/README.md) for setup instructions when Phase 2 begins.

---

## 🌿 Branch Strategy

```
main          ← protected, always deployable
  └── develop ← integration branch
        └── phase-1/<slug>  ← feature branches (short-lived)
```

- All feature branches are branched off `develop`
- PRs go: `phase-1/<slug>` → `develop`
- `develop` → `main` at phase completion milestones

---

## 🧑‍💻 Contributing

1. Pull latest `develop` before starting
2. Branch off `develop`: `git checkout -b phase-1/<your-slug>`
3. Commit early, commit often using [Conventional Commits](https://www.conventionalcommits.org/)
4. Open a PR against `develop` — never directly to `main`

---

## 📄 Links

- [Frontend README](./frontend/README.md) — setup, folder structure, mock-api docs
- [Backend README](./backend/README.md) — Phase 2 ownership stub
