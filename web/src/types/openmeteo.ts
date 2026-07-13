export interface OmGeocodeResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

export interface OmGeocodeResponse {
  results?: OmGeocodeResult[];
}

/** All time fields are local ISO strings ("2026-07-13T15:30") thanks to timezone=auto. */
export interface OmForecastResponse {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    surface_pressure: number;
    cloud_cover: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    is_day: number[];
    visibility: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: Array<number | null>;
    sunrise: string[];
    sunset: string[];
    uv_index_max: Array<number | null>;
  };
}

export interface OmAirQualityResponse {
  current: {
    us_aqi: number | null;
  };
}
