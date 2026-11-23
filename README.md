# FocusBoard
Responsive task dashboard built with React + Vite (JavaScript, plain CSS, lucide-react).

**Hosted URL:** _add after deploying_ · **GitHub:** _add repo URL_

## Features
Create / edit / delete (with confirmation) tasks, three statuses, case-insensitive title search, status tabs + priority filter (combined), derived statistics, 3-slide Focus Notes carousel, localStorage persistence, responsive (390 / 768 / 1440), keyboard-accessible.

## Run locally
```
npm install
npm run dev      # development
npm run build    # production build -> dist
```

## State management
Plain React hooks (no library) because the app is a single-screen, single-user dashboard.
- `App` owns one `tasks` array (single source of truth) via `useLocalStorage('focusboard_tasks', sampleTasks)`.
- Add/edit/delete/status use immutable updates (`map`, `filter`, spread) — state is never mutated.
- Stats (total, in progress, completed, %) and the visible list (search + status + priority) are derived on every render from `tasks`; nothing is stored twice. Zero tasks gives 0% (no divide-by-zero).
- `useLocalStorage` reads once on start (sample data is used only if nothing valid is saved) and writes on every change; parse/storage errors are caught.
- Carousel index lives in `FocusNotes` state with circular navigation; dots reflect the index.
- One `TaskForm` handles create and edit (edit when a task is passed in).

## Known limitations / pending work
- Focus Notes slide text is placeholder copy; replace it with the exact Figma text (see `FocusNotes.jsx`).
- Visual values (colors, fonts, spacing) are approximations and must be tuned against the Figma frames.
- Sidebar items other than Dashboard are visual placeholders (no extra screens, per the brief).
- Add screenshots to `/screenshots` (one desktop, one mobile).
