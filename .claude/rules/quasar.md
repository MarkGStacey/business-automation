# Quasar Naming Standards

## Components

- Custom components follow Vue conventions: **PascalCase** filename and name — `TrailCard.vue`, `BudgetRow.vue`
- Quasar built-in components use the `Q` prefix: `QBtn`, `QInput`, `QTable`, `QCard` — never rename or alias these

## Pages

- PascalCase with `Page` suffix: `HomePage.vue`, `TrailDetailPage.vue`, `BudgetOverviewPage.vue`
- Stored in `src/pages/`

## Layouts

- PascalCase with `Layout` suffix: `MainLayout.vue`, `AuthLayout.vue`, `MobileLayout.vue`
- Stored in `src/layouts/`

## Pinia Stores

- Store composable: `useXxxStore` — `useAuthStore`, `useTrailStore`, `useBudgetStore`
- Store file: lowercase, domain-named — `stores/auth.ts`, `stores/trail.ts`, `stores/budget.ts`
- State: camelCase — `isLoading`, `currentUser`, `trailList`
- Actions: camelCase verbs — `fetchTrails()`, `syncTransactions()`, `clearSession()`
- Getters: camelCase noun/adjective — `filteredTrails`, `isAuthenticated`, `totalMonthlySpend`

## Routes

- Route name: camelCase — `home`, `trailDetail`, `budgetOverview`
- Route path: kebab-case — `/trail-detail/:id`, `/budget-overview`
- Route file (if split): kebab-case — `src/router/routes/trail.ts`

## Boot Files

- kebab-case filenames: `src/boot/supabase.ts`, `src/boot/powersync.ts`, `src/boot/i18n.ts`

## CSS / Styles

- Custom CSS classes: kebab-case — `.trail-card`, `.budget-row`
- Use Quasar's utility classes directly (`q-pa-md`, `text-primary`) — do not create duplicates of existing Quasar utilities
- Component-level styles: scoped to the component, kebab-case class names

## Capacitor (Mobile Targets)

- Capacitor config kept in `src-capacitor/`
- Platform-specific utilities: suffix with `.native.ts` for native-only code, `.web.ts` for web-only fallbacks
- Plugin wrappers: camelCase — `useCamera()`, `useGeolocation()`, `usePushNotifications()`

## Environment Variables

- SCREAMING_SNAKE_CASE: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_POWERSYNC_URL`
- All client-side Quasar env vars prefixed with `VITE_` as required by Vite

## TypeScript Types

- Interface and type names: PascalCase — `Trail`, `BudgetTransaction`, `UserProfile`
- Type files: camelCase filename — `types/trail.ts`, `types/budget.ts`
- Avoid `I` prefix for interfaces — use plain PascalCase
