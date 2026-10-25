# CareerFlow

A job-search tracker: log applications, move them through a pipeline, schedule
interviews and see how your search is performing. Everything runs in the
browser and is saved to `localStorage` — no account or backend needed.

## Features

- **Dashboard** – totals, status breakdown, funnel rates, upcoming interviews and recent activity
- **Applications** – add / edit / delete with validation, search, status filter, sorting, CSV export
- **Application details** – change status (logged to a timeline), notes, interviews, contact & job link
- **Pipeline** – drag-and-drop kanban board (Applied → Assessment → Interview → Offer / Rejected)
- **Calendar** – all interviews on a month view; click a day to schedule, click an event to edit
- **Analytics** – applications per month, funnel, status and work-type charts with a time-range filter
- **Profile & Settings** – profile with photo and skills, dark mode, interview reminders (bell icon),
  JSON backup / import, sample data and reset

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run lint
```

Use **Settings → Load samples** to fill the app with example data.

## Tech stack

React 19 · Vite · React Router · Material UI · dnd-kit · FullCalendar · Recharts · date-fns · react-hot-toast

## Project structure

```
src/
  components/   common/ dashboard/ jobs/ layout/ pipeline/
  constants/    statuses, priorities, storage keys, default settings
  context/      JobContext (applications), SettingsContext (profile, theme)
  hooks/        useJobs, useSettings, useLocalStorage
  pages/        one file per route
  utils/        helpers, stats calculations, sample data
```

## Data

Applications live under the `careerflow-jobs` key and profile/preferences under
`careerflow-settings`. Clearing site data removes them, so export a JSON backup
from Settings if you want to keep a copy.
