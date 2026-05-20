// ─── Design Tokens ────────────────────────────────────────────────────────────

export const COLORS = {
  // Backgrounds
  bg: '#09090b',
  bgCard: '#18181b',
  bgCardHover: '#1f1f23',
  surface: '#27272a',

  // Brand
  brand: '#a3e635',        // lime-400 — skateboarding energy
  brandDim: '#65a30d',     // lime-700

  // Text
  textPrimary: '#fafafa',
  textSecondary: '#a1a1aa',
  textMuted: '#52525b',

  // Difficulty badges
  beginner: '#22c55e',     // green
  intermediate: '#f59e0b', // amber
  advanced: '#ef4444',     // red
  pro: '#a855f7',          // purple

  // Spot type badges
  pista: '#3b82f6',        // blue  — structured skatepark
  rua: '#fb923c',          // orange — street spot

  // Borders
  border: '#3f3f46',
} as const;

export const FONT = {
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

// ─── Difficulty Config ────────────────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'pro';

export const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; emoji: string }> = {
  beginner:     { label: 'Iniciante',     color: COLORS.beginner,     emoji: '🟢' },
  intermediate: { label: 'Intermediário', color: COLORS.intermediate, emoji: '🟡' },
  advanced:     { label: 'Avançado',      color: COLORS.advanced,     emoji: '🔴' },
  pro:          { label: 'Pro',           color: COLORS.pro,          emoji: '🟣' },
};

// ─── Spot Type Config ─────────────────────────────────────────────────────────

export type SpotType = 'pista' | 'rua';

export const TYPE_CONFIG: Record<SpotType, { label: string; color: string; emoji: string }> = {
  pista: { label: 'Pista',  color: COLORS.pista, emoji: '🛹' },
  rua:   { label: 'Street', color: COLORS.rua,   emoji: '🧱' },
};
