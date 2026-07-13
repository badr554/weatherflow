import type { CSSProperties } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  style?: CSSProperties;
  className?: string;
}

export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style, className }: SkeletonProps) {
  const { tokens } = useTheme();

  return (
    <div
      className={`skeleton-shimmer ${className ?? ''}`}
      aria-hidden="true"
      style={{
        width,
        height,
        borderRadius,
        backgroundImage: `linear-gradient(90deg, ${tokens.skeletonBase} 0%, ${tokens.skeletonShine} 50%, ${tokens.skeletonBase} 100%)`,
        ...style,
      }}
    />
  );
}
