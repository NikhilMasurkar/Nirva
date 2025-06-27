import React from 'react';
import { ScrollView } from 'react-native';

export const NScrollView = props => {
  return <ScrollView ref={props.scrollViewRef} {...props} />;
};
