import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface GlassCardProps {
  children: ReactNode;
  padding?: string | number;
  radius?: number;
  style?: CSSProperties;
  className?: string;
  delay?: number;
  hoverLift?: boolean;
}

export function GlassCard({
  children,
  padding = 28,
  radius = 28,
  style,
  className,
  delay = 0,
  hoverLift,
}: GlassCardProps) {
  const { tokens } = useTheme();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hoverLift ? { y: -4 } : undefined}
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.border}`,
        borderRadius: radius,
        padding,
        backdropFilter: 'blur(24px)',
        boxShadow: tokens.shadowCard,
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
