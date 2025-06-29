import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const AppLogo = ({ size = 120, style, containerStyle }) => (
  <View style={[styles.container, containerStyle]}>
    <Image
      source={require('../../assets/logo.png')}
      style={[styles.logo, { width: size, height: size }, style]}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // Default size will be overridden by props
  },
});

export default AppLogo;
