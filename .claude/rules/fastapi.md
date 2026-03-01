# FastAPI Naming Standards

## Files and Modules

- All filenames: **snake_case** — `main.py`, `user_router.py`, `auth_service.py`, `osm_client.py`
- One router per domain in its own file: `trails_router.py`, `accounts_router.py`, `auth_router.py`
- Service layer: `<domain>_service.py` — `trail_service.py`, `open_banking_service.py`
- Data access layer: `<domain>_repository.py` — `trail_repository.py`, `user_repository.py`
- Utility/helper modules: `<purpose>_utils.py` — `geo_utils.py`, `date_utils.py`

## Routers

- Router variable: `router` within its own file, or `<domain>_router` when imported elsewhere
- Route prefix: kebab-case — `/trails`, `/trail-segments`, `/open-banking/accounts`
- OpenAPI tags: Title Case strings — `["Trails"]`, `["Open Banking"]`, `["Authentication"]`

## Route Handler Functions

- **snake_case**, leading HTTP verb — `get_trail()`, `list_trails()`, `create_trail()`, `update_trail()`, `delete_trail()`
- Collection endpoints: `list_<resource>` — `list_trails()`, `list_accounts()`
- Single resource: `get_<resource>` — `get_trail()`, `get_account()`
- Mutation verbs: `create_`, `update_`, `delete_`, `patch_`

## Pydantic Models

- **PascalCase** with a descriptive suffix:

| Suffix | Purpose | Example |
|--------|---------|---------|
| `Base` | Shared fields, not used directly | `TrailBase`, `AccountBase` |
| `Create` | POST request body | `TrailCreate`, `AccountCreate` |
| `Update` | PUT/PATCH request body | `TrailUpdate`, `AccountUpdate` |
| `Response` | API response schema | `TrailResponse`, `AccountResponse` |
| `InDB` | Internal DB representation | `TrailInDB`, `UserInDB` |

- Group models by domain in `schemas/` or `models/`: `schemas/trail.py`, `schemas/account.py`

## Parameters

- Path parameters: snake_case — `trail_id`, `account_id`, `segment_id`
- Query parameters: snake_case — `page_size`, `sort_by`, `is_active`
- Request body parameter: descriptive snake_case — `trail_data`, `account_create`

## Dependencies

- Dependency functions: snake_case, verb-first — `get_current_user()`, `get_db()`, `verify_token()`
- Declared in `dependencies.py` or per-domain `<domain>_deps.py`

## Settings and Configuration

- Settings class: `Settings` (Pydantic BaseSettings)
- Instance: `settings` (lowercase singleton)
- Individual settings: SCREAMING_SNAKE_CASE in `.env`, accessed as `settings.database_url` in Python (auto-lowercased by Pydantic)

## Environment Variables

- SCREAMING_SNAKE_CASE: `DATABASE_URL`, `SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `OSM_API_BASE_URL`, `OPEN_BANKING_CLIENT_ID`

## Exceptions

- Custom exception classes: PascalCase with `Error` or `Exception` suffix — `TrailNotFoundError`, `AuthenticationError`, `OpenBankingError`
- Exception handlers: `<error_type>_handler()` in snake_case

## Tests

- Test files: `test_<module>.py` — `test_trail_router.py`, `test_auth_service.py`
- Test functions: `test_<behaviour>()` — `test_get_trail_returns_404_when_not_found()`
- Fixtures: snake_case — `db_session`, `authenticated_client`, `sample_trail`
