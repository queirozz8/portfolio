# AGENTS.md

## Project
Personal developer portfolio.

## Before working
1. Read this file.
2. Inspect the existing project structure.
3. Read relevant documentation in `/docs`.
4. Inspect existing components before creating new ones.
5. Understand the current implementation before proposing architectural changes.

## Engineering principles
- Prefer incremental changes.
- Preserve existing architecture unless there is a strong reason to change it.
- Avoid unnecessary dependencies.
- Reuse existing components and utilities.
- Keep accessibility and responsive behavior as first-class requirements.
- Never invent personal or professional information.
- Never expose secrets.

## Validation
Before considering a task complete:
- run lint;
- run typecheck;
- run tests, when available;
- run build;
- inspect the resulting UI when browser tooling is available.

## Git
- Work on a dedicated branch.
- Do not commit unless explicitly requested.
- Never push directly to main/master unless explicitly requested.