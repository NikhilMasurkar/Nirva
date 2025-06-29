import { Platform } from 'react-native';
const fontConfig = {
  default: {
    regular: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-Regular',
      }),
      fontWeight: 'normal',
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
    semibold: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-SemiBold',
      }),
      fontWeight: Platform.select({
        ios: '600',
        android: 'normal',
      }),
    },
    bold: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-Bold',
      }),
      fontWeight: Platform.select({
        ios: '700',
        android: 'normal',
      }),
    },
    extrabold: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-ExtraBold',
      }),
      fontWeight: Platform.select({
        ios: '800',
        android: 'normal',
      }),
    },
    black: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-Black',
      }),
      fontWeight: Platform.select({
        ios: '900',
        android: 'normal',
      }),
    },
    extralight: {
      fontFamily: Platform.select({
        ios: 'System',
        android: 'NunitoSans-ExtraLight',
      }),
      fontWeight: Platform.select({
        ios: '200',
        android: 'normal',
      }),
    },
  },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;
fontConfig.web = fontConfig.default;

export default fontConfig;
