import type { CurrentWeather } from '@/types/weather';

export interface MetricDef {
  key: keyof Pick<CurrentWeather, 'humidity' | 'wind' | 'pressure' | 'visibility' | 'uv' | 'cloud'>;
  label: string;
  desc: string;
}

export const METRIC_DEFS: MetricDef[] = [
  { key: 'humidity', label: 'Humidity', desc: 'Relative humidity' },
  { key: 'wind', label: 'Wind Speed', desc: 'Sustained winds' },
  { key: 'pressure', label: 'Pressure', desc: 'Sea level' },
  { key: 'visibility', label: 'Visibility', desc: 'Clear range' },
  { key: 'uv', label: 'UV Index', desc: 'Peak exposure' },
  { key: 'cloud', label: 'Cloudiness', desc: 'Sky coverage' },
];
