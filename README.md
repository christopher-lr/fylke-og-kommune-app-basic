# Fylke og Kommune App (Basic)

Small demo app that fetches Norwegian counties (fylker) and their municipalities (kommuner) from Kartverket and displays them using the Digdir design system.

## Features
- Fetch and list `fylker` from the Kartverket API
- Select a `fylke` and fetch its `kommuner`
- Render `kommuner` as a radio group (single selection)

## Prerequisites
- Node.js 18+ (or current LTS)
- npm or yarn

## Install
Clone the repo and install dependencies:

```bash
npm install
# or
yarn
```

## Run (development)

```bash
npm run dev
```

Open http://localhost:5173 (or the terminal-provided address).

## Build / Preview

```bash
npm run build
npm run preview
```

## Usage
- Select a county from the dropdown.
- Click "Hent detaljer" to fetch municipalities for the selected county.
- Choose one municipality from the radio list.

API endpoints used
- GET https://api.kartverket.no/kommuneinfo/v1/fylker
- GET https://api.kartverket.no/kommuneinfo/v1/fylker/{fylkesnummer}/kommuner

Development notes
- `src/App.tsx` contains the main logic: fetching `fylker`, storing `selectedFylke`, fetching and rendering `kommuner`.
- Important state variables: `fylker`, `selectedFylke`, `kommuner`, `selectedKommune`.
- The Select `onChange` in some design systems passes the raw value rather than an event; handler should accept both.
- CSS helpers: add `.fylke-select` and `.kommuner-fieldset` to `src/App.css` to cap `max-width`/`max-height` and enable scrolling for long lists.

If you want, I can update `src/App.css` and `src/App.tsx` with the recommended handlers and CSS now.

## License
MIT
