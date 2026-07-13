import { useCallback } from 'react';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import type { RecentCity } from '@/types/weather';

const STORAGE_KEY = 'atmos:favorites';

function sameCity(a: RecentCity, b: RecentCity) {
  return a.lat === b.lat && a.lon === b.lon;
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorageState<RecentCity[]>(STORAGE_KEY, []);

  const isFavorite = useCallback(
    (city: RecentCity) => favorites.some((c) => sameCity(c, city)),
    [favorites],
  );

  const addFavorite = useCallback(
    (city: RecentCity) => {
      setFavorites((prev) => (prev.some((c) => sameCity(c, city)) ? prev : [...prev, city]));
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (city: RecentCity) => {
      setFavorites((prev) => prev.filter((c) => !sameCity(c, city)));
    },
    [setFavorites],
  );

  const toggleFavorite = useCallback(
    (city: RecentCity) => {
      if (isFavorite(city)) removeFavorite(city);
      else addFavorite(city);
    },
    [isFavorite, addFavorite, removeFavorite],
  );

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
