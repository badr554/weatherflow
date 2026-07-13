import type { RecentCity } from '@/types/weather';

export const DEFAULT_CITY: RecentCity = {
  name: 'San Francisco',
  country: 'United States',
  lat: 37.7749,
  lon: -122.4194,
};

export const QUICK_CITIES: RecentCity[] = [
  DEFAULT_CITY,
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
  { name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lon: -21.9426 },
];

export const MAX_RECENT_SEARCHES = 5;
