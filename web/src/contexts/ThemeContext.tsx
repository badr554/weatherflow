import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { LIGHT, DARK, getBlobColors, type ThemeMode, type ThemeTokens } from '@/constants/theme';
import { readStorage, writeStorage } from '@/utils/storage';

const STORAGE_KEY = 'atmos:theme';

interface ThemeContextValue {
  mode: ThemeMode;
  tokens: ThemeTokens;
  blobA: string;
  blobB: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialMode(): ThemeMode {
  const stored = readStorage<ThemeMode | null>(STORAGE_KEY, null);
  if (stored === 'light' || stored === 'dark') return stored;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    document.documentElement.style.colorScheme = mode;
    writeStorage(STORAGE_KEY, mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(() => {
    const tokens = mode === 'dark' ? DARK : LIGHT;
    const { blobA, blobB } = getBlobColors(mode);
    return { mode, tokens, blobA, blobB, toggleTheme };
  }, [mode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
