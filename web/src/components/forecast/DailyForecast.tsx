import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';
import { WeatherIcon } from '@/components/weather/WeatherIcon';
import type { DailyItem } from '@/types/weather';

interface DailyForecastProps {
  daily: DailyItem[];
}

export function DailyForecast({ daily }: DailyForecastProps) {
  const { tokens } = useTheme();

  return (
    <GlassCard style={{ marginBottom: 40 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: tokens.textSecondary, marginBottom: 10 }}>
        5-DAY FORECAST
      </div>
      {daily.map((day, index) => (
        <motion.div
          key={`${day.day}-${index}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          whileHover={{ backgroundColor: tokens.surfaceHover }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '16px 6px',
            borderBottom: index === daily.length - 1 ? 'none' : `1px solid ${tokens.border}`,
          }}
        >
          <div style={{ width: 80, fontSize: 15, fontWeight: 600 }}>{day.day}</div>
          <WeatherIcon condition={day.condition} size={30} />
          <div className="daily-row-label" style={{ width: 70, fontSize: 13, color: tokens.textSecondary }}>
            {day.conditionLabel}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              color: tokens.textSecondary,
              justifyContent: 'flex-end',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: tokens.accent, opacity: 0.6 }} />
            {day.rain}%
          </div>
          <div style={{ width: 90, textAlign: 'right', fontSize: 15, fontWeight: 600 }}>
            {day.high}° <span style={{ color: tokens.textTertiary, fontWeight: 500 }}>{day.low}°</span>
          </div>
        </motion.div>
      ))}
    </GlassCard>
  );
}
