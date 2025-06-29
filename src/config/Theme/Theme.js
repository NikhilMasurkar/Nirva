import {
  configureFonts,
  MD2LightTheme,
  MD2DarkTheme,
} from 'react-native-paper';
import fontConfig from './FontConfig';

export const COLORS = {
  // Primary Colors - Coral/Pink theme based on screenshots
  PRIMARY: '#E57373',
  PRIMARY_DARK: '#D32F2F',
  PRIMARY_LIGHT: '#FFCDD2',

  SECONDARY: '#FF8A80',
  SECONDARY_DARK: '#FF5722',
  SECONDARY_LIGHT: '#FFCCBC',

  ACCENT: '#FF6B9D',

  BACKGROUND: '#FAFAFA',
  SURFACE: '#FFFFFF',

  TEXT_PRIMARY: '#2E2E2E',
  TEXT_SECONDARY: '#757575',
  TEXT_LIGHT: '#BDBDBD',

  GRADIENT: ['#E57373', '#FF8A80'],

  // Background Colors
  BACKGROUND_PRIMARY_NORMAL: '#FFFFFF',
  BACKGROUND_PRIMARY_DARK: '#0F172A',
  BACKGROUND_SECONDARY_NORMAL: '#F8FAFC',
  BACKGROUND_SECONDARY_DARK: '#1E293B',

  // Text Colors
  TEXT_PRIMARY_NORMAL: '#2E2E2E',
  TEXT_PRIMARY_DARK: '#F1F5F9',
  TEXT_INACTIVE_NORMAL: '#757575',
  TEXT_INACTIVE_DARK: '#64748B',

  // Neutral Colors
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  TRANSPARENT: 'transparent',

  // Status Colors
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',

  // UI Colors
  BORDER_COLOR: '#E0E0E0',
  LABEL_COLOR: '#9E9E9E',
};

export const fontSizes = {
  titleh1: 40,
  titleh2: 34,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  paragraph: 14,
  small: 12,
  extraSmall: 10,
  xxs: 8,
};

export const SPACING = {
  ZERO: 0,
  TINY: 3,
  COMPACT: 5,
  XXS: 8,
  EXTRA_SMALL: 10,
  SMALL: 15,
  MEDIUM: 17,
  NORMAL: 20,
  LARGE: 23,
  EXTRA_LARGE: 25,
  LARGE4: 30,
  LARGE3: 33,
  LARGE2: 35,
  LARGE1: 50,
};

export const normalTheme = {
  ...MD2LightTheme,
  roundness: 8,
  colors: {
    ...MD2LightTheme.colors,
    primary: COLORS.PRIMARY,
    primaryContainer: COLORS.PRIMARY_LIGHT,
    secondary: COLORS.SECONDARY,
    accent: COLORS.ACCENT,
    background: COLORS.BACKGROUND,
    surface: COLORS.SURFACE,
    error: COLORS.ERROR,
    onPrimary: COLORS.WHITE,
    onSecondary: COLORS.WHITE,
    onBackground: COLORS.TEXT_PRIMARY,
    onSurface: COLORS.TEXT_PRIMARY,
  },
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};

export const darkTheme = {
  ...MD2DarkTheme,
  roundness: 8,
  colors: {
    ...MD2DarkTheme.colors,
    primary: COLORS.PRIMARY_LIGHT,
    primaryContainer: COLORS.PRIMARY_DARK,
    secondary: COLORS.SECONDARY,
    accent: COLORS.ACCENT,
    background: COLORS.BACKGROUND_PRIMARY_DARK,
    surface: COLORS.BACKGROUND_SECONDARY_DARK,
    error: COLORS.ERROR,
  },
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};
