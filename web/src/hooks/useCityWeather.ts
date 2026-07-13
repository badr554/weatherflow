import { useQuery } from '@tanstack/react-query';
import { fetchAirQuality, fetchForecast } from '@/services/weatherService';
import { buildCityWeather } from '@/services/transformWeather';
import type { GeoLocation } from '@/types/weather';

export function useCityWeather(location: GeoLocation | null) {
  return useQuery({
    queryKey: ['cityWeather', location?.lat, location?.lon],
    queryFn: async () => {
      if (!location) throw new Error('No location selected');
      const [forecast, airQuality] = await Promise.all([
        fetchForecast(location.lat, location.lon),
        fetchAirQuality(location.lat, location.lon),
      ]);
      return buildCityWeather(location, forecast, airQuality);
    },
    enabled: Boolean(location),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    // No automatic retry: a retry's continuation is gated on the tab being
    // focused, so a backgrounded tab during backoff would hang silently.
    // The ErrorCard's "Try again" button gives the user explicit control instead.
    retry: false,
  });
}
