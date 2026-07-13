import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { tokens } = useTheme();

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '28px 0 40px',
        borderTop: `1px solid ${tokens.border}`,
        color: tokens.textTertiary,
        fontSize: 13,
      }}
    >
      WeatherFlow — designed for clarity, built for calm mornings.
    </div>
  );
}
