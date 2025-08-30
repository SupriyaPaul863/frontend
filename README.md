# Welcome Dashboard

A React + Vite app that reproduces the attached landing page layout.

- Sidebar with navigation, dropdowns, and an Upgrade to Pro prompt
- Top bar with location and profile button
- KPI cards row (15% height)
- Greeting section with action cards (30% height)
- Contact area chart and searchable contacts table (40% height)

## Folder structure

```
frontend/welcome-dashboard/
  ├─ index.html
  ├─ package.json
  ├─ vite.config.ts
  ├─ public/
  │   └─ data_set.txt
  └─ src/
      ├─ main.jsx
      ├─ App.jsx
      ├─ styles.css
      └─ components/
          ├─ Sidebar.jsx
          ├─ Topbar.jsx
          ├─ StatsRow.jsx
          ├─ GreetingActions.jsx
          ├─ ChartPanel.jsx
          └─ ContactsTable.jsx
```

## Prerequisites

- Node.js LTS (version 18 or newer). 

## Run locally

1. Open the `frontend-main/welcome-dashboard`.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the URL shown in the terminal (usually `http://localhost:5173`).


## Data source

The contacts table fetches `public/data_set.txt`. 
