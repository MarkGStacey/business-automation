# FastMCP Naming Standards

## Server

- Server instance variable: **snake_case** matching the domain — `trail_server`, `budget_server`
- Server name string (passed to `FastMCP()`): Title Case or kebab-case human-readable — `"Trail API"`, `"Budget API"`
- Server file: `server.py` or `<domain>_server.py` — `trail_server.py`, `budget_server.py`

## Tools

- Tool function names: **snake_case**, verb-first describing the action — `search_trails()`, `get_trail_detail()`, `list_nearby_pois()`, `get_account_balance()`, `categorise_transaction()`
- Tool names registered with the MCP protocol: snake_case matching the function name — `search_trails`, `get_account_balance`
- Tool descriptions: plain English sentence describing what the tool does and what it returns
- Parameter names: snake_case — `trail_id`, `latitude`, `longitude`, `account_id`, `date_from`

```python
# Correct
@mcp.tool()
def search_trails(query: str, latitude: float, longitude: float, radius_km: float = 10.0) -> list[Trail]:
    """Search for trails near a given location. Returns a list of matching trails with summary data."""
    ...
```

## Resources

- Resource URI scheme: `<domain>://<path>` — `trail://segments/{segment_id}`, `budget://accounts/{account_id}`
- Resource name string: kebab-case, descriptive — `"trail-detail"`, `"account-summary"`, `"transaction-history"`
- Resource function names: snake_case, noun-first — `trail_detail()`, `account_summary()`, `transaction_history()`
- URI template parameters: snake_case — `{trail_id}`, `{account_id}`, `{transaction_id}`

```python
# Correct
@mcp.resource("trail://segments/{segment_id}")
def trail_segment(segment_id: str) -> TrailSegment:
    """Returns full detail for a single trail segment."""
    ...
```

## Prompts

- Prompt function names: snake_case, describing the use case — `trail_search_prompt()`, `budget_analysis_prompt()`, `spending_summary_prompt()`
- Prompt name string: kebab-case — `"trail-search"`, `"budget-analysis"`

```python
# Correct
@mcp.prompt("trail-search")
def trail_search_prompt(location: str) -> str:
    ...
```

## Pydantic Models (Input/Output Schemas)

- Follow FastAPI conventions: PascalCase with descriptive suffix — `TrailSearchResult`, `AccountSummary`, `TransactionList`
- Kept in `schemas/` alongside the server file or shared with the FastAPI layer

## Module and File Layout

- snake_case filenames throughout: `tools/trail_tools.py`, `tools/budget_tools.py`, `resources/trail_resources.py`
- Shared types: `schemas/trail.py`, `schemas/account.py`

## Environment Variables

- SCREAMING_SNAKE_CASE: `MCP_SERVER_HOST`, `MCP_SERVER_PORT`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
