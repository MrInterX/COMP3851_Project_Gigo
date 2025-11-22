# AI Coding Agent Brief

## Overview

- This is an Expo-managed React Native app (`App.js`) backed by Supabase; mobile screens live in `screens/`, UI atoms in `components/`, data access in `services/`.
- Navigation is a single native stack declared in `navigation/AuthStack.js`; every route name used across the app must exist there (e.g., `JobDetail`, `Profile`).
- Business logic flows through Supabase helpers: screens never call `createClient` directly—reuse the wrappers in `services/` to keep auth/session handling consistent.

## Environment & Runbook

- Copy `.env.example` to `.env` and keep `EXPO_PUBLIC_SUPABASE_URL` + `EXPO_PUBLIC_SUPABASE_ANON_KEY`; Expo auto-injects `process.env.EXPO_PUBLIC_*` into the bundle.
- Install deps with `npm install`, then run `npm run start` (alias for `expo start`); platform-specific scripts (`npm run ios/android/web`) delegate to Expo as well.
- To inspect Supabase data shapes use `docs/db-schema.md`; table/column names there are the single source of truth and must match every query.

## Data & Service Layer

- `services/supabaseClient.js` centralizes the client; never hardcode keys or instantiate another client.
- `services/jobService.js` exposes `getJobs({ search, category, jobType, limit })` with chained filters (uses `.or` for ilike searches) plus `getJobById`; replicate this pattern for any new queries so pagination/error handling stays uniform.
- `services/applicationService.js` wraps all user-specific operations: `applyToJob` checks duplicates before insert, `getApplicationCount` uses `{ count: 'exact', head: true }`, and `getMyApplications` returns the sentinel `'NOT_LOGGED_IN'`—screens rely on that exact string.
- `services/userService.js` limits profile fields to `id, full_name, location, about_me, skills`; add columns only after updating both this file and `docs/db-schema.md`.

## Screen Patterns

- Screens are functional components with `useState/useEffect`; data fetch happens inside a memoized `load()` (see `screens/JobListScreen.js`, `screens/MainHomeScreen.js`). Keep the `loading` guards + `ActivityIndicator` UX when adding new calls.
- Navigation params are passed explicitly (`navigation.navigate('JobDetail', { jobId })`); destructure them from `route.params` at the top of the target screen.
- Alerts are the default user feedback mechanism for network/auth failures (`LoginScreen`, `JobDetailScreen`, `applicationService`); stay consistent unless UX explicitly changes.
- `ProfileScreen` and `MyApplicationsScreen` gate content on Supabase auth via `supabase.auth.getUser()`; reuse this gate instead of duplicating session state elsewhere.

## UI & Styling

- Shared presentation resides under `components/` (e.g., `JobCard`, `SearchBar`, `FilterButton`); prefer extending these before creating duplicate inline layouts.
- Styling uses `StyleSheet.create` with hard-coded palette constants (see `MainHomeScreen.js`); define new palette entries at the top of the file when reusing brand colors.
- `FilterScreen` demonstrates the pattern for collapsible sections and slider-based filters; follow its approach for additional filter categories.

## Collaboration Notes

- Follow the branch naming rule (`feature/...`) and keep Supabase secrets out of git; never commit actual keys—`.env` stays local.
- When introducing new data interactions, update `docs/db-schema.md` and the relevant service before touching screens to avoid divergent field names.
- Tests are not configured; manual verification goes through `expo start` + Expo Go, so keep changes incremental and easy to smoke-test.
- If you add new routes or change existing names, update `navigation/AuthStack.js`, any `navigation.navigate` callers, and onboard screens in the same PR to stay coherent.
