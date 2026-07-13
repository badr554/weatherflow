import { memo } from 'react';
import { motion } from 'framer-motion';
import type { WeatherCondition } from '@/types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

/**
 * Pixel-for-pixel port of the design's div-based weather icon art
 * (WeatherIcon.dc.html) — percentages are relative to the `size` box.
 */
function WeatherIconBase({ condition, size = 48, className }: WeatherIconProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      role="img"
      aria-label={`${condition} weather icon`}
    >
      {condition === 'sunny' && (
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '58%',
            height: '58%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 32%, #FFE29A, #FFA53D 70%)',
            boxShadow: '0 0 18px rgba(255,165,61,0.55)',
          }}
        />
      )}

      {condition === 'cloudy' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '14%',
              left: '16%',
              width: '34%',
              height: '34%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 32%, #FFE29A, #FFB454 70%)',
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16%',
              left: '8%',
              width: '60%',
              height: '34%',
              borderRadius: 999,
              background: '#EDEFF4',
              boxShadow: '0 4px 10px rgba(20,30,50,0.12)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '22%',
              left: '34%',
              width: '52%',
              height: '40%',
              borderRadius: 999,
              background: '#FAFBFD',
              boxShadow: '0 4px 10px rgba(20,30,50,0.10)',
            }}
          />
        </>
      )}

      {condition === 'rain' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '14%',
              left: '20%',
              width: '60%',
              height: '38%',
              borderRadius: 999,
              background: '#B9C2D0',
            }}
          />
          {[28, 46, 64].map((left, i) => (
            <motion.div
              key={left}
              animate={{ y: ['0%', '30%'], opacity: [1, 0] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'easeIn', delay: i * 0.2 }}
              style={{
                position: 'absolute',
                top: '56%',
                left: `${left}%`,
                width: '6%',
                height: '22%',
                borderRadius: 999,
                background: '#6FA8E8',
                transform: 'rotate(18deg)',
              }}
            />
          ))}
        </>
      )}

      {condition === 'snow' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '14%',
              left: '20%',
              width: '60%',
              height: '38%',
              borderRadius: 999,
              background: '#DCE3EE',
            }}
          />
          {[
            { top: '60%', left: '30%' },
            { top: '68%', left: '48%' },
            { top: '60%', left: '64%' },
          ].map((pos, i) => (
            <motion.div
              key={`${pos.top}-${pos.left}`}
              animate={{ y: ['0%', '18%'], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                width: '9%',
                height: '9%',
                borderRadius: '50%',
                background: '#EAF2FF',
              }}
            />
          ))}
        </>
      )}

      {condition === 'storm' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '18%',
              width: '64%',
              height: '36%',
              borderRadius: 999,
              background: '#7A8598',
            }}
          />
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '44%',
              left: '42%',
              width: '26%',
              height: '46%',
              background: '#FFD24A',
              clipPath: 'polygon(60% 0%, 10% 55%, 45% 55%, 30% 100%, 90% 40%, 55% 40%)',
            }}
          />
        </>
      )}

      {condition === 'fog' && (
        <>
          <div
            style={{
              position: 'absolute',
              top: '28%',
              left: '12%',
              width: '76%',
              height: '12%',
              borderRadius: 999,
              background: '#C7CEDA',
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '48%',
              left: '20%',
              width: '60%',
              height: '12%',
              borderRadius: 999,
              background: '#C7CEDA',
              opacity: 0.7,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '68%',
              left: '10%',
              width: '70%',
              height: '12%',
              borderRadius: 999,
              background: '#C7CEDA',
              opacity: 0.5,
            }}
          />
        </>
      )}

      {condition === 'night' && (
        <>
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, #E8ECF6, #B9C3DC 75%)',
              boxShadow: '0 0 14px rgba(180,195,230,0.5)',
            }}
          />
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '16%',
              right: '14%',
              width: '6%',
              height: '6%',
              borderRadius: '50%',
              background: '#E8ECF6',
            }}
          />
          <motion.div
            animate={{ opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '20%',
              right: '22%',
              width: '5%',
              height: '5%',
              borderRadius: '50%',
              background: '#E8ECF6',
              opacity: 0.7,
            }}
          />
        </>
      )}
    </div>
  );
}

export const WeatherIcon = memo(WeatherIconBase);
