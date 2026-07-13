export type WeatherCondition = 'sunny' | 'cloudy' | 'rain' | 'snow' | 'storm' | 'fog' | 'night';

export interface GeoLocation {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

export interface HourlyItem {
  time: string;
  temp: number;
  condition: WeatherCondition;
}

export interface DailyItem {
  day: string;
  condition: WeatherCondition;
  conditionLabel: string;
  high: number;
  low: number;
  rain: number;
}

export interface AirQuality {
  aqi: number;
  aqiLabel: string;
  aqiColor: string;
  aqiPct: number;
  aqiTip: string;
}

export interface CurrentWeather extends GeoLocation {
  condition: WeatherCondition;
  conditionLabel: string;
  temp: number;
  feelsLike: number;
  high: number;
  low: number;
  humidity: string;
  wind: string;
  pressure: string;
  visibility: string;
  uv: string;
  cloud: string;
  sunrise: string;
  sunset: string;
  sunPct: number;
}

export interface CityWeather {
  current: CurrentWeather;
  /** Null when the air-quality service has no data for this location. */
  airQuality: AirQuality | null;
  hourly: HourlyItem[];
  daily: DailyItem[];
}

export interface RecentCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}
