import {
  configureFonts,
  MD2LightTheme,
  MD2DarkTheme,
} from 'react-native-paper';
import fontConfig from './FontConfig';

export const COLORS = {
  // Primary Colors
  PRIMARY: '#6366F1',
  PRIMARY_DARK: '#4F46E5',
  PRIMARY_LIGHT: '#A5B4FC',

  // Secondary Colors
  SECONDARY: '#10B981',
  SECONDARY_DARK: '#059669',
  SECONDARY_LIGHT: '#6EE7B7',

  PRIMARY: '#6B73FF', // Modern purple-blue
  PRIMARY_DARK: '#5A60CC',
  PRIMARY_LIGHT: '#A5B4FC',

  SECONDARY: '#9C27B0', // Deep purple
  SECONDARY_DARK: '#7B1FA2',
  SECONDARY_LIGHT: '#CE93D8',

  ACCENT: '#FF6B9D', // Coral pink

  BACKGROUND: '#F8F9FF', // Light blue-tinted white
  SURFACE: '#FFFFFF',

  TEXT_PRIMARY: '#1A1B4B', // Dark blue
  TEXT_SECONDARY: '#6B7280', // Gray
  TEXT_LIGHT: '#9CA3AF', // Light gray

  GRADIENT: ['#6B73FF', '#9C27B0'],

  // Background Colors
  BACKGROUND_PRIMARY_NORMAL: '#FFFFFF',
  BACKGROUND_PRIMARY_DARK: '#0F172A',
  BACKGROUND_SECONDARY_NORMAL: '#F8FAFC',
  BACKGROUND_SECONDARY_DARK: '#1E293B',
  BACKGROUND_VARAINT1: '#F1F5F9',
  BACKGROUND_VARAINT_3: '#E2E8F0',
  BACKGROUND_VARAINT_3_BLK: '#334155',
  BACKGROUND_VARAINT_5: '#F8FAFC',
  BACKGROUND_VARAINT_5_BLK: '#475569',

  // Text Colors
  TEXT_PRIMARY_NORMAL: '#1E293B',
  TEXT_PRIMARY_DARK: '#F1F5F9',
  TEXT_INACTIVE_NORMAL: '#94A3B8',
  TEXT_INACTIVE_DARK: '#64748B',
  TEXT_COMMON_SILVER: '#64748B',

  // Neutral Colors
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  TRANSPARENT: 'transparent',

  // Status Colors
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',

  // UI Colors
  BORDER_COLOR: '#E2E8F0',
  LABEL_COLOR: '#94A3B8',
  UNDERLINE_COLOR: '#CBD5E1',
  THUMBNAIL_BORDER_COLOR: '#E2E8F0',

  // Legacy Colors (keeping for compatibility)
  SILVER_ICON_COLOR: '#64748B',
  SILVER_VARAINT_1: '#F1F5F9',
  SILVER_VARAINT_2: '#F8FAFC',
  SILVER_VARAINT_3: '#E2E8F0',
  SILVER_VARAINT_3_BLK: '#475569',
  BLACK_VARIANT_1: '#1E293B',
  TRACK_SUB_MENU_BLACK: '#334155',
  PROFILE_TEXT: '#1E293B',
  YELLOW_BACKGROUND: '#FEF3C7',
  GREEN: '#10B981',
  GREEN_ICON_BACKGROUND: '#D1FAE5',
  RED: '#EF4444',
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
    // Primary colors
    primary: COLORS.PRIMARY,
    primaryContainer: COLORS.PRIMARY_LIGHT,

    // Background colors
    backgroundPrimary: COLORS.BACKGROUND_PRIMARY_NORMAL,
    backgroundSecondary: COLORS.BACKGROUND_SECONDARY_NORMAL,
    backgroundVariant1: COLORS.BACKGROUND_VARAINT1,
    backgroundVariant2: COLORS.SILVER_VARAINT_2,
    backgroundVariant3: COLORS.BACKGROUND_VARAINT_3,
    backgroundVariant4: COLORS.WHITE,
    backgroundVariant5: COLORS.BACKGROUND_VARAINT_5,
    backgroundSilverVariant: COLORS.SILVER_VARAINT_3,

    // Text colors
    textPrimary: COLORS.TEXT_PRIMARY_NORMAL,
    textSecondary: COLORS.BLACK,
    textSilverVariant: COLORS.BLACK,
    textInactive: COLORS.TEXT_INACTIVE_NORMAL,
    textSilverCommon: COLORS.TEXT_COMMON_SILVER,

    // Button colors
    buttonPrimary: COLORS.PRIMARY,
    buttonTextPrimary: COLORS.WHITE,

    // UI colors
    iconHeader: COLORS.SILVER_ICON_COLOR,
    borderColor: COLORS.BORDER_COLOR,
    labelColor: COLORS.LABEL_COLOR,
    error: COLORS.ERROR,
    underlineColor: COLORS.UNDERLINE_COLOR,
    thumbnailBorder: COLORS.THUMBNAIL_BORDER_COLOR,

    // Status colors
    green: COLORS.SUCCESS,
    backgroundGreen: COLORS.GREEN_ICON_BACKGROUND,
    warning: COLORS.WARNING,
    info: COLORS.INFO,
  },
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};

export const darkTheme = {
  ...MD2DarkTheme,
  roundness: 8,
  colors: {
    ...MD2DarkTheme.colors,
    // Primary colors
    primary: COLORS.PRIMARY_LIGHT,
    primaryContainer: COLORS.PRIMARY_DARK,

    // Background colors
    backgroundPrimary: COLORS.BACKGROUND_PRIMARY_DARK,
    backgroundSecondary: COLORS.BACKGROUND_SECONDARY_DARK,
    backgroundVariant1: COLORS.BACKGROUND_PRIMARY_DARK,
    backgroundVariant2: COLORS.BLACK_VARIANT_1,
    backgroundVariant3: COLORS.BACKGROUND_VARAINT_3_BLK,
    backgroundVariant4: COLORS.BLACK_VARIANT_1,
    backgroundVariant5: COLORS.BACKGROUND_VARAINT_5_BLK,
    backgroundSilverVariant: COLORS.SILVER_VARAINT_3_BLK,

    // Text colors
    textPrimary: COLORS.TEXT_PRIMARY_DARK,
    textSecondary: COLORS.SILVER_ICON_COLOR,
    textSilverVariant: COLORS.SILVER_VARAINT_1,
    textInactive: COLORS.TEXT_INACTIVE_DARK,
    textSilverCommon: COLORS.TEXT_COMMON_SILVER,

    // Button colors
    buttonPrimary: COLORS.PRIMARY_LIGHT,
    buttonTextPrimary: COLORS.BLACK,

    // UI colors
    iconHeader: COLORS.SILVER_ICON_COLOR,
    borderColor: COLORS.TRANSPARENT,
    labelColor: COLORS.LABEL_COLOR,
    error: COLORS.ERROR,
    underlineColor: COLORS.UNDERLINE_COLOR,
    thumbnailBorder: COLORS.SUCCESS,

    // Status colors
    green: COLORS.SUCCESS,
    backgroundGreen: COLORS.WHITE,
    warning: COLORS.WARNING,
    info: COLORS.INFO,
  },
  fonts: configureFonts({ config: fontConfig, isV3: false }),
};
