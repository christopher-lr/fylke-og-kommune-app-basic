# Fylke og Kommune App — Basic

A small React + TypeScript app (Vite) for selecting Norwegian counties (`fylke`) and municipalities (`kommune`) and submitting a simple form. This repository provides example hooks, mock handlers, and a minimal UI to demonstrate fetching and submitting location data.

## Features
- Select a `fylke` (county) and load corresponding `kommuner` (municipalities)
- Simple form submission flow
- Local mocks for API responses (MSW)

## Tech Stack
- Vite
- React + TypeScript
- Mock Service Worker (MSW) for local API mocks

## Requirements
- Node.js 16+ or compatible
- npm or yarn

## Install
```bash
npm install
# or
yarn
```

## Run (development)
```bash
npm run dev
# open http://localhost:5173
```

## Build / Preview
```bash
npm run build
npm run preview
```

## Project Structure
- [src/App.tsx](src/App.tsx) — App entry and layout
- [src/main.tsx](src/main.tsx) — Vite / React entry
- [src/components](src/components) — UI components
- [src/hooks/useFylker.ts](src/hooks/useFylker.ts) — Hook to load counties
- [src/hooks/useKommuner.ts](src/hooks/useKommuner.ts) — Hook to load municipalities
- [src/hooks/useSubmitForm.ts](src/hooks/useSubmitForm.ts) — Form submission helper
- [src/mocks/browser.ts](src/mocks/browser.ts) — MSW browser setup
- [src/mocks/handlers.ts](src/mocks/handlers.ts) — Mock request handlers

## Usage
The app demonstrates selecting a county and then a municipality. The hooks in `src/hooks` encapsulate fetch logic — swap the mocks for real endpoints by removing or adjusting MSW in `src/mocks`.

## Development notes
- MSW is configured for local development; to use a real backend, disable or remove the mock service worker.
- Keep hooks small and side-effect free; they currently return loading/error states and data.

## Contributing
PRs welcome for improvements, accessibility, and tests.

## License
This project is provided as-is. Add a LICENSE file if you wish to specify terms.
