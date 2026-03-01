# Git Rules

## Branches

Use the following naming scheme:

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feat/<short-description>` | `feat/add-trail-search` |
| Bug fix | `fix/<short-description>` | `fix/login-redirect-loop` |
| Hotfix | `hotfix/<short-description>` | `hotfix/null-pointer-crash` |
| Release | `release/<version>` | `release/1.4.0` |
| Chore | `chore/<short-description>` | `chore/upgrade-quasar-v2` |
| Docs | `docs/<short-description>` | `docs/update-api-readme` |

- Use `main` for production-ready code
- Use `develop` as the integration branch for completed features
- Branch names are lowercase kebab-case only — no spaces, no uppercase, no underscores
- Keep descriptions short (2-4 words)
- Delete branches after merging

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`, `ci`

**Rules:**
- Description is imperative mood: "add login" not "adds login" or "added login"
- Subject line max 72 characters
- Scope is the affected module or feature area (optional but encouraged)
- Body explains *why*, not *what* — the diff shows what changed
- Reference issues in the footer: `Closes #42`, `Fixes #17`
- One logical change per commit — do not bundle unrelated changes

**Examples:**
```
feat(auth): add OAuth2 login with Supabase
fix(trails): handle null geometry in OSM response
chore(deps): upgrade FastAPI to 0.110
docs(api): document PowerSync bucket definitions
refactor(budget): extract open banking client to service layer
```

## Tags

- Semantic versioning only: `v<major>.<minor>.<patch>`
- Pre-release: `v1.0.0-beta.1`, `v1.0.0-rc.2`
- Tag at merge to `main`, never on feature branches
- Annotated tags for releases: `git tag -a v1.0.0 -m "Release 1.0.0"`

## Pull Requests / Merge Requests

- One concern per PR — split unrelated changes into separate PRs
- PR title follows the same Conventional Commits format as commit messages
- Self-review your diff before requesting review
- Link to the issue being resolved in the description
- Squash merge feature branches into `develop`; use merge commits for `develop` → `main`
- Do not merge with failing CI checks
- Rebase feature branches onto `develop` before requesting review, do not merge `develop` into the feature branch

## General Hygiene

- Never force-push to `main` or `develop`
- Never commit secrets, credentials, or `.env` files — use `.env.example` for templates
- Keep `.gitignore` updated for all build artifacts, local config, and tooling caches
- Prefer small, frequent commits over large infrequent ones
- Do not commit commented-out code — delete it; version control has history
