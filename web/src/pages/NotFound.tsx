import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { PageBackground } from '@/components/layout/PageBackground';
import { GlassCard } from '@/components/common/GlassCard';

export default function NotFound() {
  const { tokens } = useTheme();

  return (
    <PageBackground condition="cloudy">
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <GlassCard padding={48} style={{ textAlign: 'center', maxWidth: 420 }}>
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>404</div>
          <div style={{ fontSize: 16, color: tokens.textSecondary, marginBottom: 24 }}>
            This forecast doesn&apos;t exist. Let&apos;s get you back to clear skies.
          </div>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              padding: '12px 24px',
              borderRadius: 14,
              background: tokens.accentGradient,
              color: '#fff',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              boxShadow: `0 8px 20px ${tokens.accentShadow}`,
            }}
          >
            Back to dashboard
          </Link>
        </GlassCard>
      </div>
    </PageBackground>
  );
}
