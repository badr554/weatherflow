import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, LocateFixed } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '@/contexts/ThemeContext';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { geocodeCity } from '@/services/weatherService';
import { detectCurrentLocation, GeolocationDeniedError } from '@/services/locationService';
import { toWeatherError } from '@/api/errors';
import type { GeoLocation } from '@/types/weather';

interface SearchBarProps {
  onSelectCity: (location: GeoLocation) => void;
}

function geocodeKey(query: string) {
  return ['geocode', query.trim().toLowerCase()] as const;
}

export function SearchBar({ onSelectCity }: SearchBarProps) {
  const { tokens } = useTheme();
  const queryClient = useQueryClient();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const debounced = useDebouncedValue(value, 450);
  const inputRef = useRef<HTMLInputElement>(null);

  // Warm the query cache while the user pauses typing, so pressing Enter
  // right after typing usually resolves instantly.
  useEffect(() => {
    const trimmed = debounced.trim();
    if (trimmed.length < 2) return;
    queryClient.prefetchQuery({
      queryKey: geocodeKey(trimmed),
      queryFn: () => geocodeCity(trimmed),
      staleTime: 5 * 60 * 1000,
    });
  }, [debounced, queryClient]);

  const runSearch = async () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setError(null);
    setIsSearching(true);
    try {
      const location = await queryClient.fetchQuery({
        queryKey: geocodeKey(trimmed),
        queryFn: () => geocodeCity(trimmed),
        staleTime: 5 * 60 * 1000,
      });
      onSelectCity(location);
      setValue('');
    } catch (err) {
      const weatherError = toWeatherError(err, trimmed);
      setError(weatherError.message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runSearch();
  };

  const runLocate = async () => {
    setError(null);
    setIsLocating(true);
    try {
      const location = await detectCurrentLocation();
      onSelectCity(location);
      setValue('');
    } catch (err) {
      setError(
        err instanceof GeolocationDeniedError
          ? 'Location access is blocked. Allow it in your browser settings to use this feature.'
          : 'Could not detect your location. Please search for a city instead.',
      );
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 560 }}>
      <div style={{ display: 'flex', gap: 12, width: '100%' }}>
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: tokens.surface,
            border: `1px solid ${tokens.borderStrong}`,
            borderRadius: 18,
            padding: '0 18px',
            height: 58,
            backdropFilter: 'blur(16px)',
            boxShadow: tokens.shadowSoft,
          }}
        >
          <Search size={18} color={tokens.textSecondary} style={{ marginRight: 10, flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder='Try "Tokyo" or "Reykjavik"…'
            aria-label="Search for a city"
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 16,
              fontFamily: "'Inter', sans-serif",
              color: tokens.text,
              width: '100%',
            }}
          />
        </div>
        <motion.button
          type="button"
          onClick={runSearch}
          disabled={isSearching}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Search"
          style={{
            height: 58,
            padding: '0 26px',
            border: 'none',
            borderRadius: 18,
            background: tokens.accentGradient,
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isSearching ? 'default' : 'pointer',
            boxShadow: `0 8px 20px ${tokens.accentShadow}`,
            flexShrink: 0,
          }}
        >
          {isSearching ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex' }}
            >
              <Loader2 size={18} />
            </motion.span>
          ) : (
            'Search'
          )}
        </motion.button>
        <motion.button
          type="button"
          onClick={runLocate}
          disabled={isLocating}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Use my location"
          title="Use my location"
          style={{
            width: 58,
            height: 58,
            borderRadius: 18,
            background: tokens.surface,
            border: `1px solid ${tokens.borderStrong}`,
            color: tokens.textSecondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isLocating ? 'default' : 'pointer',
            backdropFilter: 'blur(16px)',
            boxShadow: tokens.shadowSoft,
            flexShrink: 0,
            padding: 0,
          }}
        >
          {isLocating ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'flex' }}
            >
              <Loader2 size={18} />
            </motion.span>
          ) : (
            <LocateFixed size={18} />
          )}
        </motion.button>
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
          style={{ fontSize: 14, color: tokens.danger }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
