import {Platform} from 'react-native';
const isIOS = Platform.OS === 'ios';
const fontConfig = {
  default: {
    extralight: {
      fontFamily: 'NunitoSans-ExtraLight',
      fontWeight: isIOS ? '200' : 'normal',
    },
    light: {
      fontFamily: 'NunitoSans-Light',
      fontWeight: isIOS ? '300' : 'normal',
    },
    regular: {
      fontFamily: 'NunitoSans-Regular',
      fontWeight: isIOS ? '400' : 'normal',
    },
    semibold: {
      fontFamily: 'NunitoSans-SemiBold',
      fontWeight: isIOS ? '600' : 'normal',
    },
    bold: {
      fontFamily: 'NunitoSans-Bold',
      fontWeight: isIOS ? '700' : 'normal',
    },
    extrabold: {
      fontFamily: 'NunitoSans-ExtraBold',
      fontWeight: isIOS ? '800' : 'normal',
    },
    black: {
      fontFamily: 'NunitoSans-Black',
      fontWeight: isIOS ? '900' : 'normal',
    },
  },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;
fontConfig.web = fontConfig.default;

export default fontConfig;
