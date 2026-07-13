import type { LucideIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { GlassCard } from '@/components/common/GlassCard';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  desc: string;
  delay?: number;
}

export function MetricCard({ icon: Icon, label, value, desc, delay = 0 }: MetricCardProps) {
  const { tokens } = useTheme();

  return (
    <GlassCard padding={22} radius={22} delay={delay} hoverLift>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 11,
          background: tokens.iconBg,
          marginBottom: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={18} color={tokens.accent} />
      </div>
      <div style={{ fontSize: 13, color: tokens.textSecondary, fontWeight: 500, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontSize: 12, color: tokens.textTertiary, marginTop: 4 }}>{desc}</div>
    </GlassCard>
  );
}
