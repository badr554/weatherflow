import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CityChipProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  onRemove?: () => void;
  removeLabel?: string;
}

export function CityChip({ label, active, onClick, onRemove, removeLabel }: CityChipProps) {
  const { tokens } = useTheme();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: onRemove ? '8px 10px 8px 16px' : '8px 16px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 500,
        cursor: 'pointer',
        background: active ? tokens.accentGradient : tokens.surface,
        color: active ? '#fff' : tokens.textSecondary,
        border: `1px solid ${active ? 'transparent' : tokens.border}`,
        transition: 'background 0.2s, color 0.2s, border-color 0.2s',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          font: 'inherit',
          color: 'inherit',
          cursor: 'pointer',
        }}
      >
        {label}
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeLabel ?? `Remove ${label}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            padding: 2,
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.7,
          }}
        >
          <X size={12} />
        </button>
      )}
    </motion.div>
  );
}
