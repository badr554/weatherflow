import { Droplets, Wind, Gauge, Eye, Sun, Cloud } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { METRIC_DEFS } from '@/constants/metrics';
import { MetricCard } from '@/components/cards/MetricCard';
import type { CurrentWeather } from '@/types/weather';

const ICONS: Record<string, LucideIcon> = {
  humidity: Droplets,
  wind: Wind,
  pressure: Gauge,
  visibility: Eye,
  uv: Sun,
  cloud: Cloud,
};

interface MetricsGridProps {
  current: CurrentWeather;
}

export function MetricsGrid({ current }: MetricsGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: 18,
        marginBottom: 24,
      }}
    >
      {METRIC_DEFS.map((metric, index) => (
        <MetricCard
          key={metric.key}
          icon={ICONS[metric.key]}
          label={metric.label}
          desc={metric.desc}
          value={current[metric.key]}
          delay={index * 0.05}
        />
      ))}
    </div>
  );
}
