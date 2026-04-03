// src/constant/theme.ts

export const Colors = {
  // --- PRIMARY: Electric Teal ---
  primary: '#0D9488', 
  primaryLight: '#2DD4BF',
  primaryDark: '#016D64', 
  primaryMuted: 'rgba(13, 148, 136, 0.1)',

  // --- SECONDARY: Royal Indigo ---
  secondary: '#4F46E5', 
  secondaryLight: '#818CF8',
  secondaryDark: '#3730A3',
  secondaryMuted: 'rgba(79, 70, 229, 0.1)',

  // --- ACCENT: Sunset Gold (Perfect for XP/Leaderboards) ---
  highlight: '#F59E0B', 
  highlightLight: '#FBBF24',
  highlightMuted: 'rgba(245, 158, 11, 0.1)',

  // --- TYPOGRAPHY: Deep Slate ---
  textPrimary: '#0F172A',  
  textSecondary: '#475569', 
  textTertiary: '#94A3B8',  
  textInverse: '#FFFFFF',

  // --- BACKGROUNDS ---
  bgPrimary: '#FFFFFF',
  bgSecondary: '#F8FAFC', 
  bgTertiary: '#F1F5F9',

  // --- FUNCTIONAL ---
  success: '#10B981',
  successMuted: '#D1FAE5',
  error: '#F43F5E', 
  errorMuted: '#FEE2E2',
  warning: '#F59E0B',
  warningMuted: '#FEF3C7',
  info: '#0EA5E9',
  infoMuted: '#E0F2FE',

  // --- BORDER ---
  border: '#E2E8F0',
  borderFocus: '#0D9488',

  // --- DARK MODE ---
  dark: {
    bgPrimary: '#020617',   
    bgSecondary: '#0F172A', 
    bgTertiary: '#1E293B',  
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#1E293B',
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#0D9488', 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;