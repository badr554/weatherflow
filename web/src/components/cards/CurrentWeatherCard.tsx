import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import type { CurrentWeather } from '@/types/weather';

interface CurrentWeatherCardProps {
  current: CurrentWeather;
  dateStr: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CurrentWeatherCard({ current, dateStr, isFavorite, onToggleFavorite }: CurrentWeatherCardProps) {
  const { tokens } = useTheme();

  return (
    <GlassCard padding={40} style={{ height: '100%' }}>
      <button
        type="button"
        onClick={onToggleFavorite}
        aria-label={isFavorite ? `Remove ${current.name} from favorites` : `Add ${current.name} to favorites`}
        aria-pressed={isFavorite}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 34,
          height: 34,
          borderRadius: 10,
          background: tokens.surface,
          border: `1px solid ${tokens.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          zIndex: 1,
        }}
      >
        <Star
          size={16}
          fill={isFavorite ? '#FFB020' : 'none'}
          color={isFavorite ? '#FFB020' : tokens.textSecondary}
        />
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>{current.name}</div>
          <div style={{ fontSize: 15, color: tokens.textSecondary, marginTop: 2 }}>
            {current.country} · {dateStr}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.condition}
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <WeatherIcon condition={current.condition} size={88} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 18 }}>
        <div className="hero-temp" style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
          {current.temp}°
        </div>
        <div style={{ paddingBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 600 }}>{current.conditionLabel}</div>
          <div style={{ fontSize: 14, color: tokens.textSecondary, marginTop: 2 }}>
            Feels like {current.feelsLike}° · H:{current.high}° L:{current.low}°
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
