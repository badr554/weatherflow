import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { SearchBar } from '@/components/common/SearchBar';
import { CityChip } from '@/components/common/CityChip';
import { QUICK_CITIES } from '@/constants/cities';
import type { GeoLocation, RecentCity } from '@/types/weather';

interface SearchHeroProps {
  activeLocation: GeoLocation;
  recent: RecentCity[];
  favorites: RecentCity[];
  onSearchSelect: (location: GeoLocation) => void;
  onChipSelect: (location: GeoLocation) => void;
  onRemoveRecent: (city: RecentCity) => void;
  onRemoveFavorite: (city: RecentCity) => void;
}

function isSameCity(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  return a.lat === b.lat && a.lon === b.lon;
}

function ChipRow({
  label,
  cities,
  activeLocation,
  onSelectCity,
  onRemove,
}: {
  label: string;
  cities: RecentCity[];
  activeLocation: GeoLocation;
  onSelectCity: (location: GeoLocation) => void;
  onRemove?: (city: RecentCity) => void;
}) {
  const { tokens } = useTheme();
  if (!cities.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: tokens.textTertiary,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {cities.map((city) => (
          <CityChip
            key={`${label}-${city.lat}-${city.lon}`}
            label={city.name}
            active={isSameCity(city, activeLocation)}
            onClick={() => onSelectCity({ ...city })}
            onRemove={onRemove ? () => onRemove(city) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function SearchHero({
  activeLocation,
  recent,
  favorites,
  onSearchSelect,
  onChipSelect,
  onRemoveRecent,
  onRemoveFavorite,
}: SearchHeroProps) {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 22,
        marginBottom: 44,
      }}
    >
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="hero-title" style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Search for any city
        </div>
        <div style={{ fontSize: 16, color: tokens.textSecondary }}>
          Get accurate real-time weather information anywhere in the world.
        </div>
      </motion.div>

      <SearchBar onSelectCity={onSearchSelect} />

      <ChipRow label="Quick access" cities={QUICK_CITIES} activeLocation={activeLocation} onSelectCity={onChipSelect} />
      <ChipRow
        label="Recent"
        cities={recent}
        activeLocation={activeLocation}
        onSelectCity={onChipSelect}
        onRemove={onRemoveRecent}
      />
      <ChipRow
        label="Favorites"
        cities={favorites}
        activeLocation={activeLocation}
        onSelectCity={onChipSelect}
        onRemove={onRemoveFavorite}
      />
    </div>
  );
}
