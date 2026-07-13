import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import type { HourlyItem } from '@/types/weather';

interface HourlyForecastProps {
  hourly: HourlyItem[];
}

export function HourlyForecast({ hourly }: HourlyForecastProps) {
  const { tokens } = useTheme();

  return (
    <GlassCard style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: tokens.textSecondary, marginBottom: 18 }}>
        HOURLY FORECAST
      </div>
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }}>
        {hourly.map((hour, index) => (
          <motion.div
            key={`${hour.time}-${index}`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -4 }}
            style={{
              flexShrink: 0,
              width: 92,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '18px 10px',
              borderRadius: 18,
              background: tokens.card2,
              border: `1px solid ${tokens.border}`,
            }}
          >
            <div style={{ fontSize: 13, color: tokens.textSecondary, fontWeight: 500 }}>{hour.time}</div>
            <WeatherIcon condition={hour.condition} size={34} />
            <div style={{ fontSize: 17, fontWeight: 700 }}>{hour.temp}°</div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
