import {
  httpClient,
  OPEN_METEO_AIR_QUALITY_URL,
  OPEN_METEO_FORECAST_URL,
  OPEN_METEO_GEOCODING_URL,
} from '@/api/client';
import { toWeatherError } from '@/api/errors';
import { WeatherError } from '@/types/errors';
import type { OmAirQualityResponse, OmForecastResponse, OmGeocodeResponse } from '@/types/openmeteo';
import type { GeoLocation } from '@/types/weather';

export async function geocodeCity(query: string): Promise<GeoLocation> {
  try {
    const { data } = await httpClient.get<OmGeocodeResponse>(OPEN_METEO_GEOCODING_URL, {
      params: { name: query, count: 1, language: 'en', format: 'json' },
    });
    const result = data.results?.[0];
    if (!result) {
      throw new WeatherError('not-found', `No city found for "${query}".`);
    }
    return {
      name: result.name,
      country: result.country ?? '',
      state: result.admin1,
      lat: result.latitude,
      lon: result.longitude,
    };
  } catch (err) {
    throw toWeatherError(err, query);
  }
}

export async function fetchForecast(lat: number, lon: number): Promise<OmForecastResponse> {
  try {
    const { data } = await httpClient.get<OmForecastResponse>(OPEN_METEO_FORECAST_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        current:
          'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure,cloud_cover,is_day',
        hourly: 'temperature_2m,weather_code,is_day,visibility',
        daily:
          'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max',
        timezone: 'auto',
        wind_speed_unit: 'mph',
        forecast_days: 6,
      },
    });
    return data;
  } catch (err) {
    throw toWeatherError(err);
  }
}

/** Air quality is best-effort: a failure should not block the whole dashboard. */
export async function fetchAirQuality(lat: number, lon: number): Promise<OmAirQualityResponse | null> {
  try {
    const { data } = await httpClient.get<OmAirQualityResponse>(OPEN_METEO_AIR_QUALITY_URL, {
      params: { latitude: lat, longitude: lon, current: 'us_aqi', timezone: 'auto' },
    });
    return data;
  } catch {
    return null;
  }
}
