import React from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

export const TouchableOpacity = ({
  children,
  activeOpacity = 0.8,
  hitSlop = { top: 10, bottom: 10, left: 10, right: 10 },
  ...rest
}) => {
  return (
    <RNTouchableOpacity
      activeOpacity={activeOpacity}
      hitSlop={hitSlop}
      {...rest}
    >
      {children}
    </RNTouchableOpacity>
  );
};
