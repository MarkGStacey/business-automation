# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a dotfiles/conventions repository — there is no application to build, no tests to run, and no dependencies to install. It contains shared naming standards and workflow rules referenced across three projects:

| Project | Stack |
|---------|-------|
| **OrcaFit** | Vue, Astro, Markdown |
| **OpenTrail** | Quasar, Supabase, PowerSync, FastAPI, FastMCP, OpenStreetMap |
| **Family Budget** | Quasar, Supabase, PowerSync, FastAPI, FastMCP, UK Open Banking |

## Rules Directory

All conventions live in `.claude/rules/`. Naming standard files cover only what things are called and how they are cased — not architecture or structure. The workflow file covers how Claude should approach and execute tasks.

| File | Governs |
|------|---------|
| `.claude/rules/workflow.md` | Planning before execution, resuming interrupted tasks, todo list discipline |
| `.claude/rules/git.md` | Branch names, Conventional Commits format, PR/MR process, tags |
| `.claude/rules/vue.md` | Component prefixes (`Base`, `The`), composables (`useXxx`), props, events, Pinia stores |
| `.claude/rules/astro.md` | `.astro` components, pages, layouts, content collections, frontmatter fields |
| `.claude/rules/quasar.md` | Pages (`XxxPage`), layouts (`XxxLayout`), boot files, Capacitor conventions |
| `.claude/rules/supabase.md` | Tables (snake_case plural), columns, FK patterns, RLS policy names, edge functions |
| `.claude/rules/powersync.md` | Schema variables, YAML bucket definition names, TypeScript integration |
| `.claude/rules/fastapi.md` | Route handlers (`get_`, `list_`, `create_`), Pydantic model suffixes, dependencies |
| `.claude/rules/fastmcp.md` | Tools (snake_case verb-first), resource URI schemes, prompt names |

## Git Conventions

All commits in this repo follow Conventional Commits (`<type>(<scope>): <description>`). See `rules/git.md` for the full specification — that file is the authoritative source and applies to all projects in this ecosystem.

## Modifying Rules

- Edit the relevant file in `rules/` directly
- Rules files are markdown — keep them concise and example-driven
- Naming rules cover naming only — do not add architectural guidance to them
- Workflow rules (`workflow.md`) cover how Claude executes tasks — keep them process-focused, not technology-specific
- When a technology spans multiple projects (e.g. Supabase, FastAPI), the rule in this repo is the single source of truth
