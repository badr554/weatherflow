import axios from 'axios';

/**
 * Open-Meteo is fully free for non-commercial use and requires no API key.
 * Each product lives on its own host, so services pass absolute URLs.
 */
export const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
export const OPEN_METEO_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
export const OPEN_METEO_AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

export const httpClient = axios.create({
  timeout: 12000,
});
