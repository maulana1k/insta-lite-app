# Sprint 4 — Docs & Cleanup

**Sprint Goal:** The project is documented and CLAUDE.md is accurate. Any developer can onboard from the docs.

---

## Tasks

### T4.1 — CLAUDE.md Update

Add to existing CLAUDE.md:
- Backend URL and API spec location
- Table of features: real vs mocked
- Token flow summary
- `NEXT_PUBLIC_API_URL` env var documentation

Keep unchanged:
- Existing commands
- Architecture overview
- State management pattern

- **DoD:** A new developer reading CLAUDE.md knows exactly which features call the real API and where to find the API spec

---

### T4.2 — `docs/development.md`

Sections to write:
- **Prerequisites** — Go backend, bun ≥ 1.x
- **Local setup** — step-by-step: clone, copy env, start backend, `bun dev`
- **Staging setup** — set `NEXT_PUBLIC_API_URL=https://api.jends.id/v1`
- **Feature status table** — real vs mocked
- **Token flow diagram** — plain text ASCII
- **How to add a new API-backed feature** — types → api → hooks → component

- **DoD:** A new developer can run the app locally against a real backend following only this document

---

### T4.3 — `docs/deployment.md`

Sections to write:
- **Production environment variables**
- **Build command** — `bun build`, output mode (server required — not static, due to Route Handlers)
- **Cookie/CORS alignment requirements**
- **GCS bucket CORS policy** — for signed URL uploads
- **Health check endpoint** — `GET /health`

- **DoD:** DevOps team can deploy the app to production following only this document

---

### T4.4 — Feature Folder Structure Audit

Ensure these feature folders exist with standard structure (`api/`, `hooks/`, `store/`, `types/`):
- `src/features/auth/`
- `src/features/users/` *(new)*
- `src/features/media/` *(new)*

- **DoD:** `bun lint` passes with no errors. All new feature folders follow the standard structure from CLAUDE.md.
