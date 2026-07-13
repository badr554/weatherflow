import { AlertTriangle, WifiOff, Clock, Ban, RefreshCw } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';
import type { WeatherErrorKind } from '@/types/errors';

interface ErrorCardProps {
  kind: WeatherErrorKind;
  message: string;
  onRetry?: () => void;
}

const ICONS: Record<WeatherErrorKind, LucideIcon> = {
  'no-internet': WifiOff,
  'not-found': AlertTriangle,
  'rate-limit': Ban,
  timeout: Clock,
  unknown: AlertTriangle,
};

const TITLES: Record<WeatherErrorKind, string> = {
  'no-internet': "You're offline",
  'not-found': 'City not found',
  'rate-limit': 'Too many requests',
  timeout: 'Request timed out',
  unknown: 'Something went wrong',
};

export function ErrorCard({ kind, message, onRetry }: ErrorCardProps) {
  const { tokens } = useTheme();
  const Icon = ICONS[kind];

  return (
    <GlassCard
      padding={40}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: `${tokens.danger}1A`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={26} color={tokens.danger} />
      </motion.div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{TITLES[kind]}</div>
      <div style={{ fontSize: 14, color: tokens.textSecondary, maxWidth: 380, lineHeight: 1.5 }}>{message}</div>
      {onRetry && (
        <motion.button
          type="button"
          onClick={onRetry}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 14,
            border: 'none',
            background: tokens.accentGradient,
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: `0 8px 20px ${tokens.accentShadow}`,
          }}
        >
          <RefreshCw size={15} /> Try again
        </motion.button>
      )}
    </GlassCard>
  );
}
