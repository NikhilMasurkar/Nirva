import React from 'react';
import { TouchableHighlight } from 'react-native';
import NView from './NView';

export const TouchableHighlight = ({
  opacity = '0.05',
  underlayColor = '',
  children,
  ...rest
}) => {
  return (
    <TouchableHighlight
      underlayColor={underlayColor || `rgba(0,0,0,${opacity})`}
      {...rest}
    >
      <NView>{children}</NView>
    </TouchableHighlight>
  );
};
