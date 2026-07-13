import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';
import type { CurrentWeather } from '@/types/weather';

interface SunriseSunsetCardProps {
  current: Pick<CurrentWeather, 'sunrise' | 'sunset' | 'sunPct'>;
}

export function SunriseSunsetCard({ current }: SunriseSunsetCardProps) {
  const { tokens } = useTheme();

  return (
    <GlassCard padding="26px 28px" style={{ flex: 1 }} delay={0.2}>
      <div style={{ fontSize: 14, fontWeight: 600, color: tokens.textSecondary, marginBottom: 16 }}>
        SUNRISE &amp; SUNSET
      </div>
      <div
        style={{
          position: 'relative',
          height: 6,
          borderRadius: 999,
          background: tokens.gaugeTrack,
          margin: '18px 4px',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${current.sunPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: tokens.accentGradient,
            borderRadius: 999,
          }}
        />
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${current.sunPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#FFD24A',
            boxShadow: '0 0 12px rgba(255,210,74,0.8)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: tokens.textSecondary, marginTop: 6 }}>
        <div>
          <span style={{ fontWeight: 600, color: tokens.text }}>{current.sunrise}</span> Sunrise
        </div>
        <div>
          <span style={{ fontWeight: 600, color: tokens.text }}>{current.sunset}</span> Sunset
        </div>
      </div>
    </GlassCard>
  );
}
