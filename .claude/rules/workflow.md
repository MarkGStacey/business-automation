# Workflow Rules

## Planning Before Execution

For any non-trivial task (more than one file changed, or more than one logical step), Claude must:

1. **Write a plan first** — use Plan mode to produce a step-by-step breakdown before touching any files
2. **Check for an existing plan** — before starting work, inspect the current todo list and any in-progress tasks; if a partial plan exists, resume from where it left off rather than starting over
3. **Keep the plan updated** — mark tasks `completed` as they finish so the plan always reflects current progress; batching updates is fine when steps run together, but the plan must be accurate enough to resume from if interrupted

## When a Plan Is Required

| Situation | Action |
|-----------|--------|
| Task touches more than one file | Write a plan |
| Task has more than one logical step | Write a plan |
| Task was interrupted and is being resumed | Check existing plan first, then continue |
| Simple single-file, single-step change | Plan optional — proceed directly |

## Resuming Interrupted Tasks

Before executing any work, check whether there is an existing plan or todo list from a prior session:

- If tasks are `in_progress`, assume the session was interrupted — review what was done and continue from the correct step
- Do not restart completed steps; pick up from the first incomplete item
- If the state is ambiguous, summarise what appears to have been completed and ask for confirmation before proceeding

## Plan Quality

A good plan:
- Lists concrete, atomic steps (one file or one command per step)
- Identifies dependencies between steps (step 3 requires step 2's output)
- Notes any risky or irreversible actions so the user can review them before they run
- Is short enough to read in under a minute — not a design document

## Example

```
Task: Add PowerSync schema for a new `receipts` table

Plan:
1. Add `receipts` table definition to AppSchema in schema.ts
2. Add bucket definition for receipt sync in sync-rules.yaml
3. Create useReceiptsQuery composable
4. Update CLAUDE.md rules table if new conventions are introduced
```
