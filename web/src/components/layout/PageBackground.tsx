import type { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CONDITION_BG } from '@/constants/theme';
import type { WeatherCondition } from '@/types/weather';

interface PageBackgroundProps {
  condition: WeatherCondition;
  children: ReactNode;
}

export function PageBackground({ condition, children }: PageBackgroundProps) {
  const { mode, tokens, blobA, blobB } = useTheme();
  const bgGradient = (CONDITION_BG[condition] ?? CONDITION_BG.cloudy)[mode];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'Inter', sans-serif",
        background: bgGradient,
        transition: 'background 0.7s ease',
        position: 'relative',
        overflowX: 'hidden',
        color: tokens.text,
      }}
    >
      <div
        aria-hidden="true"
        className="animate-float-slow"
        style={{
          position: 'absolute',
          top: -80,
          right: -60,
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: blobA,
          filter: 'blur(60px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        className="animate-float-slow-reverse"
        style={{
          position: 'absolute',
          bottom: -100,
          left: -80,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: blobB,
          filter: 'blur(70px)',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
}
