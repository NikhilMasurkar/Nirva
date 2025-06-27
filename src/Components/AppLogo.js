import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const AppLogo = () => (
  <View style={styles.container}>
    <Image
      source={require('../assets/logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default AppLogo;
