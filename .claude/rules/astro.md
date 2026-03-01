# Astro Naming Standards

## Component Files
- Astro components: **PascalCase** with `.astro` extension — `Hero.astro`, `ArticleCard.astro`, `CallToAction.astro`
- Framework components (Vue) within Astro follow their own framework conventions

## Pages
- Page files: **kebab-case** — `about.astro`, `getting-started.astro`, `trail-map.astro`
- Dynamic route segments: `[slug].astro`, `[...path].astro`
- Index pages: `index.astro`
- Pages map 1:1 to URLs — the filename is the URL

## Layouts
- PascalCase with `Layout` suffix: `BaseLayout.astro`, `BlogLayout.astro`, `LandingLayout.astro`

## Content Collections
- Collection directory names: **kebab-case**, plural — `blog/`, `docs/`, `release-notes/`
- Collection schema variable: `defineCollection(...)` — referenced by directory name in `config.ts`

**Frontmatter fields** (in Markdown/MDX files):
- camelCase: `publishedAt`, `featuredImage`, `isDraft`, `readingTime`
- Standard fields kept consistent across all collections: `title`, `description`, `publishedAt`, `updatedAt`, `tags`

## Markdown / MDX Files
- Filenames: **kebab-case** — `getting-started.md`, `orcafit-overview.mdx`, `api-reference.md`
- Slugs derive from filename unless overridden in frontmatter
- Use `.mdx` only when the file contains JSX/component imports; otherwise use `.md`

## Utilities and Helpers
- camelCase filenames: `src/utils/formatDate.ts`, `src/utils/readingTime.ts`
- Helper functions: camelCase — `getPublishedPosts()`, `sortByDate()`

## Static Assets
- kebab-case for all static files in `public/` and `src/assets/`: `hero-image.webp`, `og-default.png`
- Subdirectories: kebab-case — `public/images/`, `src/assets/icons/`

## Environment Variables
- SCREAMING_SNAKE_CASE for all env vars: `PUBLIC_SITE_URL`, `CONTENT_API_KEY`
- Public (client-exposed) vars prefixed with `PUBLIC_` as required by Astro
