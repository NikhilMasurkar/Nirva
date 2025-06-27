// NavigationUtils.js
import { createNavigationContainerRef } from '@react-navigation/native';
import { GLOBAL } from './global';

export const navigationRef = createNavigationContainerRef();
export const NAVIGATION_CUSTOM_KEY = 'Custom';

export const checkAndNavigateForKeyCustom = functionKey => {
  if (functionKey === 'CallUs') {
    API.openDialerWithNumber(GLOBAL.CONTACT_US_NUMBER);
  } else if (functionKey === 'WhatsApp') {
    API.openUrl('https://api.whatsapp.com/send?phone=917385208601');
  }
};

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
