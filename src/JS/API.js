import { Linking } from 'react-native';

export default {
  openDialerWithNumber: phone => {
    let phoneNumber = `tel:${phone}`;
    return Linking.openURL(phoneNumber);
  },
  openUrl: url => {
    if (url) {
      Linking.openURL(url);
    }
  },
};
