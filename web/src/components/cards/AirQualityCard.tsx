import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';
import type { AirQuality } from '@/types/weather';

interface AirQualityCardProps {
  airQuality: AirQuality;
}

export function AirQualityCard({ airQuality }: AirQualityCardProps) {
  const { tokens } = useTheme();

  return (
    <GlassCard padding="26px 28px" style={{ flex: 1 }} delay={0.1}>
      <div style={{ fontSize: 14, fontWeight: 600, color: tokens.textSecondary, marginBottom: 14 }}>
        AIR QUALITY
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: `conic-gradient(${airQuality.aqiColor} ${airQuality.aqiPct}%, ${tokens.gaugeTrack} 0)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: tokens.card2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {airQuality.aqi}
          </div>
        </motion.div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: airQuality.aqiColor }}>{airQuality.aqiLabel}</div>
          <div style={{ fontSize: 13, color: tokens.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
            {airQuality.aqiTip}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
