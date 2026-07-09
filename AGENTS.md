# AGENTS.md

## Project overview
This is a React prototype repo mirroring our iOS app for user testing and design exploration.
It uses Next.js Pages Router, Tailwind CSS, Zustand, and React Compiler.

## Ground rules — read before touching anything

### Never touch these files without asking k first
- `src/pages/_app.tsx`
- `src/pages/_document.tsx`
- `src/design-system/**`
- `tailwind.config.ts`
- `next.config.js`
- `AGENTS.md`

These are shared foundations. Breaking them breaks every experiment.

### Your sandbox
You own your experiment folder entirely:
- `src/pages/your-experiment/` — your route entry point
- `src/experiments/your-experiment/` — your components and store
- `public/images/your-experiment/` — your assets

### How to add a new experiment
1. Create `src/experiments/my-test/` with your components and store
2. Create `src/pages/my-test/index.tsx` that just imports and renders it
3. That's it — it's live at `/my-test`

## Code conventions
- No `getServerSideProps`, `getStaticProps`, or any server-side data fetching
- No `<a href>` for internal navigation — use `next/link` or in-experiment React state
- No `useMemo`, `useCallback` — React Compiler handles it, don't second-guess it
- Use `<img>` freely — `next/image` is disabled intentionally
- One Zustand store per experiment, in `src/experiments/your-experiment/store.ts`
- Use `persist` middleware so user testing sessions survive page reloads
- Use `useResetOnFlag` hook to clear store when `?reset` is in the URL

## Design system
- All tokens are in `tailwind.config.ts` — use the defined classes, don't use arbitrary values like `bg-[#ff0000]`
- Match the iOS app: spacing, typography, and color names mirror the native tokens
- Components in `src/design-system/components` are read-only — request changes, don't fork them

## When in doubt
Ask before assuming. State what you're trying to do and why —
especially before touching anything outside your experiment folder.
