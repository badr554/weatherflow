# WeatherFlow

A premium weather dashboard built in React 19 + TypeScript, implementing the
[Premium Weather Dashboard Design](../Premium%20Weather%20Dashboard%20Design)
pixel-for-pixel: glass-card layout, condition-based backgrounds, animated
weather icons, and dark/light theming.

**Live data, no API key required.** Weather comes from
[Open-Meteo](https://open-meteo.com/) (forecast, sunrise/sunset, UV, air
quality) and [BigDataCloud](https://www.bigdatacloud.com/) (reverse
geocoding for "use my location") — both free, keyless, no signup.

## Features

- Search any city, with debounced live prefetching and Enter-to-search
- Automatic location detection on first visit (falls back gracefully if denied)
- Recent searches (last 5) and favorites, persisted in `localStorage`
- Current conditions, feels-like, hi/lo, humidity, wind, pressure, visibility,
  UV index, cloudiness
- Air quality gauge (US EPA AQI) and animated sunrise/sunset progress bar
- 24-hour and 5-day forecasts
- Dark/light theme with animated transition, remembered across visits
- Skeleton loading states, designed error cards (offline, not-found,
  rate-limited, timeout), and full keyboard/ARIA accessibility
- Responsive from 390px mobile up to 1440px desktop

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · TanStack Query · Axios ·
Framer Motion · React Router · Lucide/React Icons · react-hot-toast

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). No environment
variables or API keys are needed — the app works out of the box.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Project structure

```
src/
  api/          Axios client + error classification
  components/   layout, cards, forecast, weather, common
  constants/    theme tokens, quick cities, metric definitions
  contexts/     ThemeContext (light/dark)
  hooks/        useCityWeather, useRecentSearches, useFavorites, ...
  pages/        Dashboard, NotFound
  services/     weatherService, locationService, transformWeather
  types/        domain types + Open-Meteo response types
  utils/        WMO condition mapping, AQI classification, storage
```
