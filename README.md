# WeatherFlow

A premium weather dashboard — search any city (or use your current location)
for real-time conditions, air quality, and forecasts, with a glassy dark/light
UI and no API key required.

Built in React 19 + TypeScript from the included Claude design source, using
the free, keyless [Open-Meteo](https://open-meteo.com/) API for weather data
and [BigDataCloud](https://www.bigdatacloud.com/) for reverse geocoding.

## Repo layout

- **[`web/`](./web)** — the app. See [`web/README.md`](./web/README.md) for
  setup, scripts, features, and project structure.
- **[`Premium Weather Dashboard Design/`](./Premium%20Weather%20Dashboard%20Design)**
  — the original design source (`.dc.html` files) the app was implemented
  from, kept as the design record.

## Quick start

```bash
cd web
npm install
npm run dev
```

No `.env` or API keys needed — open `http://localhost:5173` and it works.
