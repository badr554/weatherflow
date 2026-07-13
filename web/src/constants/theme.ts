import type { WeatherCondition } from '@/types/weather';

export type ThemeMode = 'light' | 'dark';

export interface ThemeTokens {
  bg: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
  borderStrong: string;
  surface: string;
  surfaceHover: string;
  card: string;
  card2: string;
  navBg: string;
  gaugeTrack: string;
  iconBg: string;
  accent: string;
  accentGradient: string;
  accentShadow: string;
  danger: string;
  toggleBg: string;
  toggleKnob: string;
  toggleLeft: string;
  shadowSoft: string;
  shadowCard: string;
  skeletonBase: string;
  skeletonShine: string;
}

export const LIGHT: ThemeTokens = {
  bg: '#F5F6F8',
  text: '#1A1D24',
  textSecondary: '#5B6270',
  textTertiary: '#8A90A0',
  border: 'rgba(20,25,40,0.08)',
  borderStrong: 'rgba(20,25,40,0.12)',
  surface: 'rgba(255,255,255,0.6)',
  surfaceHover: 'rgba(255,255,255,0.9)',
  card: 'rgba(255,255,255,0.65)',
  card2: 'rgba(255,255,255,0.8)',
  navBg: 'rgba(245,246,248,0.7)',
  gaugeTrack: 'rgba(20,25,40,0.08)',
  iconBg: 'rgba(58,110,255,0.12)',
  accent: '#3A6EFF',
  accentGradient: 'linear-gradient(135deg, #4C7CFF, #6FA0FF)',
  accentShadow: 'rgba(58,110,255,0.35)',
  danger: '#E5484D',
  toggleBg: '#E2E5EC',
  toggleKnob: '#FFFFFF',
  toggleLeft: '2px',
  shadowSoft: '0 8px 24px rgba(20,25,40,0.06)',
  shadowCard: '0 16px 40px rgba(20,25,40,0.08)',
  skeletonBase: 'rgba(20,25,40,0.06)',
  skeletonShine: 'rgba(20,25,40,0.12)',
};

export const DARK: ThemeTokens = {
  bg: '#0B0F1A',
  text: '#F0F2F8',
  textSecondary: '#9AA3B8',
  textTertiary: '#6B7385',
  border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(255,255,255,0.14)',
  surface: 'rgba(255,255,255,0.05)',
  surfaceHover: 'rgba(255,255,255,0.09)',
  card: 'rgba(255,255,255,0.045)',
  card2: 'rgba(255,255,255,0.07)',
  navBg: 'rgba(11,15,26,0.6)',
  gaugeTrack: 'rgba(255,255,255,0.1)',
  iconBg: 'rgba(56,189,248,0.15)',
  accent: '#38BDF8',
  accentGradient: 'linear-gradient(135deg, #38BDF8, #6366F1)',
  accentShadow: 'rgba(56,189,248,0.4)',
  danger: '#FF6B6B',
  toggleBg: 'rgba(255,255,255,0.1)',
  toggleKnob: '#38BDF8',
  toggleLeft: '24px',
  shadowSoft: '0 8px 24px rgba(0,0,0,0.3)',
  shadowCard: '0 20px 50px rgba(0,0,0,0.4)',
  skeletonBase: 'rgba(255,255,255,0.04)',
  skeletonShine: 'rgba(255,255,255,0.09)',
};

export const CONDITION_BG: Record<WeatherCondition, { light: string; dark: string }> = {
  sunny: {
    light: 'linear-gradient(160deg, #EAF2FF 0%, #F5F6F8 55%)',
    dark: 'linear-gradient(160deg, #142033 0%, #0B0F1A 60%)',
  },
  cloudy: {
    light: 'linear-gradient(160deg, #EDEFF4 0%, #F5F6F8 55%)',
    dark: 'linear-gradient(160deg, #10151F 0%, #0B0F1A 60%)',
  },
  rain: {
    light: 'linear-gradient(160deg, #DCE3EE 0%, #F0F2F5 55%)',
    dark: 'linear-gradient(160deg, #0E1420 0%, #0B0F1A 60%)',
  },
  snow: {
    light: 'linear-gradient(160deg, #F3F6FC 0%, #FFFFFF 55%)',
    dark: 'linear-gradient(160deg, #131A26 0%, #0B0F1A 60%)',
  },
  storm: {
    light: 'linear-gradient(160deg, #E4E1F0 0%, #F1F0F5 55%)',
    dark: 'linear-gradient(160deg, #180F26 0%, #0B0F1A 60%)',
  },
  fog: {
    light: 'linear-gradient(160deg, #EDEFF4 0%, #F5F6F8 55%)',
    dark: 'linear-gradient(160deg, #10151F 0%, #0B0F1A 60%)',
  },
  night: {
    light: 'linear-gradient(160deg, #EDEFF4 0%, #F5F6F8 55%)',
    dark: 'linear-gradient(160deg, #10151F 0%, #0B0F1A 60%)',
  },
};

export function getBlobColors(mode: ThemeMode) {
  return {
    blobA: mode === 'dark' ? 'rgba(56,189,248,0.25)' : 'rgba(76,124,255,0.18)',
    blobB: mode === 'dark' ? 'rgba(99,102,241,0.22)' : 'rgba(111,160,255,0.15)',
  };
}
