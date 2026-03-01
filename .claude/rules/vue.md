# Vue Naming Standards

## Components

Component names follow **PascalCase** in filenames and scripts (e.g., `UserCard.vue`). Names must be multi-word to prevent conflicts with HTML elements, so use `AppHeader.vue` rather than `Header.vue`. Components are co-located with related files.

**Prefixes used:**
- `Base` for reusable UI primitives like `BaseButton.vue`
- `The` for single-instance layouts like `TheHeader.vue`
- No prefix for feature-specific components like `TrailCard.vue`
- Parent names prefix tightly-coupled children: `TrailListItem.vue`

## Composables

Use the `use` prefix in camelCase: `useAuth`, `useTrailSearch`. Filenames match composable names (`useAuth.ts`), with one per file.

## Props

Props are declared in camelCase in scripts (`isActive`, `userProfile`) but passed in kebab-case in templates (`:is-active="true"`).

## Events

Events use kebab-case naming: `@click-outside`, `@trail-selected`. Two-way binding follows the `update:propName` pattern.

## Template Refs

References use camelCase: `inputRef`, `mapContainer`.

## Pinia Stores

Store composables follow `useXxxStore` naming. Store files are lowercase snake_case (`auth.ts`). State uses camelCase (`isLoading`), actions are camelCase verbs (`fetchTrails()`), and getters are camelCase nouns (`filteredTrails`).

## Router

Route names are camelCase (`trailDetail`), paths are kebab-case (`/trail-detail/:id`), and route files are kebab-case (`trail-detail.ts`).

## Files and Directories

Components use PascalCase, composables use camelCase, utilities use camelCase, and type files use camelCase filenames with PascalCase type names.

## CSS / Styles

Scoped styles use kebab-case (`.trail-card`), with BEM conventions for complexity (`.trail-card__title`).
