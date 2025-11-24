      # AI Coding Agent Brief

      ## Architecture & Responsibilities

      - Expo-managed React Native app (`App.js`) that boots a single native stack (`navigation/AuthStack.js`). If you add a screen, declare it there and keep route names synchronized with every `navigation.navigate` call.
      - Screens live in `screens/`, shared UI atoms in `components/`, and every data fetch/helper in `services/`; `MainHomeScreen` also renders a custom bottom nav, so reuse its handlers when adding tabs.
      - Supabase is the only backend. `services/supabaseClient.js` reads keys from `app.config.js -> extra` (populated via `EXPO_PUBLIC_SUPABASE_*` env vars); never create another client or access `process.env` inside screens.

      ## Environment & Runbook

      - Duplicate `.env.example` into `.env` and fill `EXPO_PUBLIC_SUPABASE_URL/ANON_KEY`. Expo injects these for both native and web targets.
      - Local loop: `npm install` then `npm run start` (alias for `expo start`). Platform shortcuts (`npm run ios/android/web`) still route through Expo.
      - Supabase schema is locked to `docs/db-schema.md`. Anytime you add/remove columns, update that doc before touching `services/` or SQL.

      ## Data & Service Layer

      - Write new queries beside `jobService`, `applicationService`, or `userService`; most screens call helpers via `load()` to keep auth handling consistent. Only legacy screens (e.g., `JobListScreen`) talk to `supabase` directly—prefer the service pattern going forward.
      - `jobService.getJobs({ search, category, jobType, limit })` orders by `posted_at DESC`, chains `.eq` filters, and uses `.or` with `%${search}%` for title/company/location ilike searches. Mirror this approach for any new filters/pagination so UX expectations stay aligned.
      - `applicationService.applyToJob(jobId)` guards duplicates before inserting into `applications`, surfaces errors via `alert`, and triggers `getApplicationCount(jobId)` which relies on `{ count: 'exact', head: true }`. `getMyApplications()` returns `'NOT_LOGGED_IN'` when Supabase auth is missing—`MyApplicationsScreen` depends on that sentinel.
      - `userService` only exposes `id, full_name, location, about_me, skills`. Extending profile fields requires updating the Supabase table **and** this select/upsert list.

      ## Screen & UX Patterns

      - Screens are simple function components with `useState/useEffect`. Fetch logic usually lives in a `load`/`fetchJobs` function invoked inside `useEffect` and guarded by `loading`/`ActivityIndicator`. Keep that pairing to avoid blank screens on slow networks.
      - Navigation params are always explicit (e.g., `navigation.navigate('JobDetail', { jobId })`); destructure `route.params` immediately at the top of the destination screen.
      - Auth-gated flows call `supabase.auth.getUser()` on demand instead of caching session state. See `ProfileScreen` (edit gating) and `MyApplicationsScreen` (read gating) for the pattern.
      - User feedback defaults to `alert(...)` for both success and error states (`applicationService`, `ProfileScreen`, auth screens). Reuse alerts unless the product team specifies a different UX.

      ## UI & Styling

      - Shared presentation primitives live in `components/`. `JobCard` expects `title/company/location`, a `type` label, and a pre-formatted `salary` string (e.g., ``${job.salary_min} / ${job.salary_unit}``).
      - Styling sticks to `StyleSheet.create` with inline palette constants near the top of each file (`MainHomeScreen` defines `PRIMARY`, etc.). If you need new brand colors, declare them once per file to keep them obvious.
      - `FilterScreen` houses the collapsible section + slider UX; clone that approach for future filters instead of ad-hoc UI.

      ## Collaboration Notes

      - Branch naming is `feature/...`; never push secrets or `.env` to git.
      - Manual verification happens through Expo Go—there is no automated test harness. Keep increments small and runnable via `npm run start`.
      - When you introduce schema changes or new Supabase queries, update both `docs/db-schema.md` and the corresponding service in the same PR to avoid field drift.

`
