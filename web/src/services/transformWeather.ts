import type { OmAirQualityResponse, OmForecastResponse } from '@/types/openmeteo';
import type { AirQuality, CityWeather, DailyItem, GeoLocation, HourlyItem } from '@/types/weather';
import {
  classifyAqi,
  formatIsoDayLabel,
  formatIsoHourLabel,
  formatIsoTime,
  mapWmoToCondition,
  metersToMiles,
  sunProgressPct,
  wmoLabel,
  wmoShortLabel,
} from '@/utils/weatherMapping';

/** Index of the first hourly slot after the current observation time. */
function nextHourIndex(forecast: OmForecastResponse): number {
  const idx = forecast.hourly.time.findIndex((t) => t > forecast.current.time);
  return idx === -1 ? 0 : idx;
}

function buildHourly(forecast: OmForecastResponse): HourlyItem[] {
  const { current, hourly } = forecast;
  const start = nextHourIndex(forecast);

  const nowItem: HourlyItem = {
    time: 'Now',
    temp: Math.round(current.temperature_2m),
    condition: mapWmoToCondition(current.weather_code, current.is_day === 1),
  };

  const upcoming = hourly.time.slice(start, start + 7).map((time, offset) => {
    const i = start + offset;
    return {
      time: formatIsoHourLabel(time),
      temp: Math.round(hourly.temperature_2m[i]),
      condition: mapWmoToCondition(hourly.weather_code[i], hourly.is_day[i] === 1),
    };
  });

  return [nowItem, ...upcoming];
}

function buildDaily(forecast: OmForecastResponse): DailyItem[] {
  const { daily } = forecast;
  return daily.time.slice(0, 5).map((date, i) => ({
    day: formatIsoDayLabel(date, i),
    condition: mapWmoToCondition(daily.weather_code[i], true),
    conditionLabel: wmoShortLabel(daily.weather_code[i]),
    high: Math.round(daily.temperature_2m_max[i]),
    low: Math.round(daily.temperature_2m_min[i]),
    rain: Math.round(daily.precipitation_probability_max[i] ?? 0),
  }));
}

function buildAirQuality(airQuality: OmAirQualityResponse | null): AirQuality | null {
  const rawAqi = airQuality?.current.us_aqi;
  if (rawAqi == null) return null;
  const info = classifyAqi(rawAqi);
  return { aqi: info.aqi, aqiLabel: info.label, aqiColor: info.color, aqiPct: info.pct, aqiTip: info.tip };
}

export function buildCityWeather(
  location: GeoLocation,
  forecast: OmForecastResponse,
  airQuality: OmAirQualityResponse | null,
): CityWeather {
  const { current, hourly, daily } = forecast;
  const start = nextHourIndex(forecast);
  const visibilityMeters = hourly.visibility[Math.max(0, start - 1)] ?? hourly.visibility[0];
  const uvMax = daily.uv_index_max[0];

  return {
    current: {
      ...location,
      condition: mapWmoToCondition(current.weather_code, current.is_day === 1),
      conditionLabel: wmoLabel(current.weather_code),
      temp: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      high: Math.round(daily.temperature_2m_max[0]),
      low: Math.round(daily.temperature_2m_min[0]),
      humidity: `${Math.round(current.relative_humidity_2m)}%`,
      wind: `${Math.round(current.wind_speed_10m)} mph`,
      pressure: `${Math.round(current.surface_pressure)} hPa`,
      visibility: visibilityMeters != null ? `${metersToMiles(visibilityMeters)} mi` : 'N/A',
      uv: uvMax != null ? `${Math.round(uvMax)}` : 'N/A',
      cloud: `${Math.round(current.cloud_cover)}%`,
      sunrise: formatIsoTime(daily.sunrise[0]),
      sunset: formatIsoTime(daily.sunset[0]),
      sunPct: sunProgressPct(current.time, daily.sunrise[0], daily.sunset[0]),
    },
    airQuality: buildAirQuality(airQuality),
    hourly: buildHourly(forecast),
    daily: buildDaily(forecast),
  };
}
