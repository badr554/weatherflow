import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { PageBackground } from '@/components/layout/PageBackground';
import { Navbar } from '@/components/layout/Navbar';
import { SearchHero } from '@/components/layout/SearchHero';
import { Footer } from '@/components/layout/Footer';
import { CurrentWeatherCard } from '@/components/cards/CurrentWeatherCard';
import { AirQualityCard } from '@/components/cards/AirQualityCard';
import { SunriseSunsetCard } from '@/components/cards/SunriseSunsetCard';
import { MetricsGrid } from '@/components/cards/MetricsGrid';
import { HourlyForecast } from '@/components/forecast/HourlyForecast';
import { DailyForecast } from '@/components/forecast/DailyForecast';
import { ErrorCard } from '@/components/common/ErrorCard';
import { DashboardSkeleton } from '@/components/common/DashboardSkeleton';
import { useCityWeather } from '@/hooks/useCityWeather';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { useFavorites } from '@/hooks/useFavorites';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { detectCurrentLocation } from '@/services/locationService';
import { DEFAULT_CITY } from '@/constants/cities';
import { toWeatherError } from '@/api/errors';
import type { GeoLocation, RecentCity } from '@/types/weather';

function toRecentCity(location: GeoLocation): RecentCity {
  return { name: location.name, country: location.country, lat: location.lat, lon: location.lon };
}

export default function Dashboard() {
  const [lastCity, setLastCity] = useLocalStorageState<RecentCity | null>('atmos:last-city', null);
  const [activeLocation, setActiveLocation] = useState<GeoLocation>(lastCity ?? DEFAULT_CITY);
  // Only auto-detect on a true first visit — returning users get their last city.
  const isFirstVisit = useRef(lastCity === null);

  const { recent, addRecent, removeRecent } = useRecentSearches();
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites();

  const { data, isLoading, isError, error, refetch, isFetching } = useCityWeather(activeLocation);

  const selectLocation = (location: GeoLocation) => {
    setActiveLocation(location);
    setLastCity(toRecentCity(location));
  };

  useEffect(() => {
    if (!isFirstVisit.current) return;
    isFirstVisit.current = false;
    let cancelled = false;
    detectCurrentLocation()
      .then((location) => {
        if (cancelled) return;
        setActiveLocation(location);
        setLastCity(toRecentCity(location));
        toast.success(`Showing weather for your location: ${location.name}`, { duration: 3000 });
      })
      .catch(() => {
        // Permission denied or unavailable — stay on the default city.
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dateStr = useMemo(
    () => new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }),
    [],
  );

  const handleSearchSelect = (location: GeoLocation) => {
    selectLocation(location);
    addRecent(toRecentCity(location));
    toast.success(`Showing weather for ${location.name}`, { duration: 2500 });
  };

  const handleChipSelect = (location: GeoLocation) => {
    selectLocation(location);
  };

  const handleToggleFavorite = () => {
    const city = toRecentCity(activeLocation);
    const wasFavorite = isFavorite(city);
    toggleFavorite(city);
    toast.success(wasFavorite ? `Removed ${city.name} from favorites` : `Added ${city.name} to favorites`);
  };

  const weatherError = isError ? toWeatherError(error) : null;
  const activeCityAsRecent = toRecentCity(activeLocation);

  return (
    <PageBackground condition={data?.current.condition ?? 'cloudy'}>
      <Navbar />

      <div className="page-container" style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SearchHero
          activeLocation={activeLocation}
          recent={recent}
          favorites={favorites}
          onSearchSelect={handleSearchSelect}
          onChipSelect={handleChipSelect}
          onRemoveRecent={removeRecent}
          onRemoveFavorite={removeFavorite}
        />

        {isLoading && <DashboardSkeleton />}

        {weatherError && !isLoading && (
          <div style={{ marginBottom: 24 }}>
            <ErrorCard kind={weatherError.kind} message={weatherError.message} onRetry={refetch} />
          </div>
        )}

        {data && !isLoading && (
          <>
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24, marginBottom: 24 }}>
              <CurrentWeatherCard
                current={data.current}
                dateStr={dateStr}
                isFavorite={isFavorite(activeCityAsRecent)}
                onToggleFavorite={handleToggleFavorite}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {data.airQuality && <AirQualityCard airQuality={data.airQuality} />}
                <SunriseSunsetCard current={data.current} />
              </div>
            </div>

            <MetricsGrid current={data.current} />
            <HourlyForecast hourly={data.hourly} />
            <DailyForecast daily={data.daily} />
          </>
        )}

        <Footer />
      </div>

      {isFetching && !isLoading && (
        <div
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            fontSize: 12,
            padding: '6px 12px',
            borderRadius: 999,
            background: 'rgba(0,0,0,0.6)',
            color: '#fff',
          }}
        >
          Refreshing…
        </div>
      )}
    </PageBackground>
  );
}
