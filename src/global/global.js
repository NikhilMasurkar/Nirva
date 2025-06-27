import { Dimensions } from 'react-native';
import { SCREENS } from './Screens';

// Custom theme colors for your app
export default {
  COLORAPP: {
    // Primary and secondary theme colors
    PRIMARY: '#6B73FF', // Deep blue
    PRIMARY_DARK: '#5A60CC',
    PRIMARY_LIGHT: '#A5B4FC',
    SECONDARY: '#9C27B0',
    SECONDARY_DARK: '#7B1FA2',
    SECONDARY_LIGHT: '#CE93D8',
    ACCENT: '#FF6B9D',
    BACKGROUND: '#F8F9FF',
    SURFACE: '#FFFFFF',
    TEXT_PRIMARY: '#1A1B4B',
    TEXT_SECONDARY: '#6B7280',
    TEXT_LIGHT: '#9CA3AF',

    THEME: {
      COLORS: {
        PRIMARY: '#6B73FF', // Modern purple-blue
        SECONDARY: '#9C27B0', // Deep purple
        ACCENT: '#FF6B9D', // Coral pink
        BACKGROUND: '#F8F9FF', // Light blue-tinted white
        SURFACE: '#FFFFFF',
        TEXT: {
          PRIMARY: '#1A1B4B', // Dark blue
          SECONDARY: '#6B7280', // Gray
          LIGHT: '#9CA3AF', // Light gray
        },
        SUCCESS: '#10B981',
        WARNING: '#F59E0B',
        ERROR: '#EF4444',
      },
      TYPOGRAPHY: {
        FONTFAMILY: {
          REGULAR: 'System',
          MEDIUM: 'System',
          BOLD: 'System',
        },
        FONTSIZE: {
          XS: 12,
          SM: 14,
          BASE: 16,
          LG: 18,
          XL: 20,
          '2XL': 24,
          '3XL': 30,
          '4XL': 36,
        },
      },
      SPACING: {
        XS: 4,
        SM: 8,
        BASE: 16,
        LG: 24,
        XL: 32,
        '2XL': 48,
      },
      BORDERRADIUS: {
        SM: 8,
        BASE: 12,
        LG: 16,
        XL: 24,
        FULL: 999,
      },
    },
  },
  GRADIENT: ['#6B73FF', '#9C27B0'],
  PAGE: SCREENS,
  PRODUCTION_CONSTANT: 'prod',
  CONTACT_US_NUMBER: '+917385208601',
  APP_VERSION: null,
  NAVIGATION_PROPS_KEY: {
    NEXT_SCREEN: 'nextScreen',
    EXIT_APP: 'exitApp',
    URL_HTML_VIEW: 'urlHtml',
  },
  SCREEN_WIDTH: Dimensions.get('screen').width,
  SCREEN_HEIGHT: Dimensions.get('screen').height,
};
