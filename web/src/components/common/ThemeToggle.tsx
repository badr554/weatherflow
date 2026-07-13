import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { mode, tokens, toggleTheme } = useTheme();
  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      style={{
        width: 52,
        height: 30,
        borderRadius: 999,
        background: tokens.toggleBg,
        position: 'relative',
        cursor: 'pointer',
        border: `1px solid ${tokens.border}`,
        transition: 'background 0.3s',
        padding: 0,
        flexShrink: 0,
      }}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        style={{
          position: 'absolute',
          top: 2,
          left: isDark ? 24 : 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: tokens.toggleKnob,
          boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isDark ? <Moon size={13} color={tokens.bg} /> : <Sun size={13} color="#FFB020" />}
      </motion.div>
    </button>
  );
}
