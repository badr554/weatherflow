import { useCallback } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { MAX_RECENT_SEARCHES } from '@/constants/cities';
import type { RecentCity } from '@/types/weather';

const STORAGE_KEY = 'atmos:recent-searches';

function sameCity(a: RecentCity, b: RecentCity) {
  return a.lat === b.lat && a.lon === b.lon;
}

export function useRecentSearches() {
  const [recent, setRecent] = useLocalStorageState<RecentCity[]>(STORAGE_KEY, []);

  const addRecent = useCallback(
    (city: RecentCity) => {
      setRecent((prev) => [city, ...prev.filter((c) => !sameCity(c, city))].slice(0, MAX_RECENT_SEARCHES));
    },
    [setRecent],
  );

  const removeRecent = useCallback(
    (city: RecentCity) => {
      setRecent((prev) => prev.filter((c) => !sameCity(c, city)));
    },
    [setRecent],
  );

  const clearRecent = useCallback(() => setRecent([]), [setRecent]);

  return { recent, addRecent, removeRecent, clearRecent };
}
