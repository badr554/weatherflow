import axios from 'axios';
import { WeatherError } from '@/types/errors';

export function toWeatherError(err: unknown, cityQuery?: string): WeatherError {
  if (err instanceof WeatherError) return err;

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return new WeatherError('no-internet', 'You appear to be offline. Check your internet connection.');
  }

  if (axios.isAxiosError(err)) {
    if (err.code === 'ECONNABORTED') {
      return new WeatherError('timeout', 'The request timed out. Please try again.');
    }
    const status = err.response?.status;
    if (status === 404) {
      return new WeatherError(
        'not-found',
        cityQuery ? `No city found for "${cityQuery}".` : 'City not found.',
      );
    }
    if (status === 429) {
      return new WeatherError('rate-limit', 'API rate limit reached. Please wait a moment and try again.');
    }
    if (!err.response) {
      return new WeatherError('no-internet', 'Could not reach the weather service. Check your connection.');
    }
  }

  return new WeatherError('unknown', 'Something went wrong while fetching weather data.');
}
