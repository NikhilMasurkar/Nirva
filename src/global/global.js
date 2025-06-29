import { Dimensions } from 'react-native';
import { SCREENS } from './Screens';

const { width, height } = Dimensions.get('window');

export default {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  COLORAPP: {
    PRIMARY: '#E57373',
    SECONDARY: '#FF8A80',
    ACCENT: '#FF6B9D',
    BACKGROUND: '#FAFAFA',
    WHITE: '#FFFFFF',
    BLACK: '#2E2E2E',
    CORAL: '#E57373',
  },
  PAGE: SCREENS,
  GlobalStyles: {
    container: {
      flex: 1,
      backgroundColor: 'F8F9FF',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
};
