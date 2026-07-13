import type { WeatherCondition } from '@/types/weather';

/**
 * Maps a WMO weather code (Open-Meteo) + day/night flag to the design's
 * icon-art condition set: sunny, cloudy, rain, snow, storm, fog, night.
 */
export function mapWmoToCondition(code: number, isDay: boolean): WeatherCondition {
  if (code === 0 || code === 1) return isDay ? 'sunny' : 'night';
  if (code === 2 || code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloudy';
}

const WMO_LABELS: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Icy Fog',
  51: 'Light Drizzle',
  53: 'Drizzle',
  55: 'Heavy Drizzle',
  56: 'Freezing Drizzle',
  57: 'Freezing Drizzle',
  61: 'Light Rain',
  63: 'Rain',
  65: 'Heavy Rain',
  66: 'Freezing Rain',
  67: 'Freezing Rain',
  71: 'Light Snow',
  73: 'Snow',
  75: 'Heavy Snow',
  77: 'Snow Grains',
  80: 'Light Showers',
  81: 'Showers',
  82: 'Heavy Showers',
  85: 'Snow Showers',
  86: 'Snow Showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm',
  99: 'Hailstorm',
};

export function wmoLabel(code: number): string {
  return WMO_LABELS[code] ?? 'Cloudy';
}

/** Short label for the 5-day list (fits the design's 70px column). */
export function wmoShortLabel(code: number): string {
  const condition = mapWmoToCondition(code, true);
  const short: Record<WeatherCondition, string> = {
    sunny: 'Sunny',
    cloudy: code === 3 ? 'Overcast' : 'Cloudy',
    rain: 'Rain',
    snow: 'Snow',
    storm: 'Storms',
    fog: 'Foggy',
    night: 'Clear',
  };
  return short[condition];
}

/** Minutes since local midnight for an ISO local string like "2026-07-13T15:30". */
function minutesOfDay(isoLocal: string): number {
  const time = isoLocal.slice(11, 16);
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/** "2026-07-13T06:12" → "6:12 AM" */
export function formatIsoTime(isoLocal: string): string {
  const total = minutesOfDay(isoLocal);
  const hours24 = Math.floor(total / 60);
  const minutes = total % 60;
  const suffix = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}

/** "2026-07-13T16:00" → "4PM" */
export function formatIsoHourLabel(isoLocal: string): string {
  const hours24 = Number(isoLocal.slice(11, 13));
  const suffix = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}${suffix}`;
}

/** "2026-07-14" → "Tue" (index 0 renders as "Today"). */
export function formatIsoDayLabel(isoDate: string, index: number): string {
  if (index === 0) return 'Today';
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'short' });
}

/** Sun-arc progress; all three arguments are same-day local ISO strings. */
export function sunProgressPct(nowIso: string, sunriseIso: string, sunsetIso: string): number {
  const now = minutesOfDay(nowIso);
  const sunrise = minutesOfDay(sunriseIso);
  const sunset = minutesOfDay(sunsetIso);
  if (sunset <= sunrise) return 50;
  const pct = ((now - sunrise) / (sunset - sunrise)) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}

export function metersToMiles(meters: number): number {
  return Math.round((meters / 1609.344) * 10) / 10;
}

export interface AqiResult {
  aqi: number;
  label: string;
  color: string;
  tip: string;
  pct: number;
}

/** Gauge fill scale: 175 AQI reads as a full-ish ring, matching the design's mock ratios. */
const AQI_GAUGE_SCALE = 175;

/** Classifies a US EPA AQI value (Open-Meteo returns this directly). */
export function classifyAqi(rawAqi: number): AqiResult {
  const aqi = Math.round(Math.max(0, rawAqi));
  const pct = Math.min(100, Math.round((aqi / AQI_GAUGE_SCALE) * 100));

  if (aqi <= 50) {
    return { aqi, pct, label: 'Good', color: '#34C759', tip: 'Air quality is ideal for outdoor activity.' };
  }
  if (aqi <= 100) {
    return { aqi, pct, label: 'Moderate', color: '#FFB020', tip: 'Air quality is acceptable for most individuals.' };
  }
  if (aqi <= 150) {
    return {
      aqi,
      pct,
      label: 'Unhealthy for Sensitive Groups',
      color: '#FF8A3D',
      tip: 'Sensitive groups should limit prolonged exertion outdoors.',
    };
  }
  if (aqi <= 200) {
    return { aqi, pct, label: 'Unhealthy', color: '#E5484D', tip: 'Everyone may begin to experience health effects.' };
  }
  if (aqi <= 300) {
    return { aqi, pct, label: 'Very Unhealthy', color: '#A644C7', tip: 'Health warnings of emergency conditions.' };
  }
  return {
    aqi,
    pct,
    label: 'Hazardous',
    color: '#7E0023',
    tip: 'Health alert: everyone may experience serious effects.',
  };
}
