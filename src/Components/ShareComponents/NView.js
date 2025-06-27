import React from 'react';
import { View } from 'react-native';
import { GlobalStyles } from '../../global';

export const NView = ({ children, container = false, ...rest }) => {
  return (
    <View style={container ? GlobalStyles.container : null} {...rest}>
      {children}
    </View>
  );
};
