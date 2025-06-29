import { Platform } from 'react-native';
const fontConfig = {
  default: {
    regular: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'Roboto',
      }),
      fontWeight: 'NunitoSans-Regular',
    },
    medium: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-SemiBold',
      }),
      fontWeight: Platform.select({
        ios: '500',
        android: 'normal',
      }),
    },
    light: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-Light',
      }),
      fontWeight: Platform.select({
        ios: '300',
        android: 'normal',
      }),
    },
    thin: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-ExtraLight',
      }),
      fontWeight: Platform.select({
        ios: '100',
        android: 'normal',
      }),
    },
  },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;
fontConfig.web = fontConfig.default;

export default fontConfig;
