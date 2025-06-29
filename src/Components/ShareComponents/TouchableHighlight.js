import React from 'react';
import { TouchableHighlight } from 'react-native';
import { NView } from './NView';

export const TouchableHighlight = ({
  opacity = '0.05',
  underlayColor = '',
  children,
  hitSlop = { top: 10, bottom: 10, left: 10, right: 10 },
  ...rest
}) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor || `rgba(0,0,0,${opacity})`}
      hitSlop={hitSlop}
      {...rest}
    >
      <NView>{children}</NView>
    </TouchableHighlight>
  );
};
