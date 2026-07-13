import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function Navbar() {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'blur(20px)',
        background: tokens.navBg,
        borderBottom: `1px solid ${tokens.border}`,
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: tokens.accentGradient,
              boxShadow: `0 4px 14px ${tokens.accentShadow}`,
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 9,
                left: 8,
                width: 13,
                height: 13,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 7,
                left: 6,
                width: 22,
                height: 11,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.95)',
              }}
            />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: tokens.text }}>
            WeatherFlow
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Notifications"
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              background: tokens.surface,
              border: `1px solid ${tokens.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                border: `2px solid ${tokens.textSecondary}`,
                position: 'relative',
              }}
            />
          </button>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: tokens.accentGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 14,
              fontWeight: 700,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            JL
          </div>
        </div>
      </div>
    </div>
  );
}
