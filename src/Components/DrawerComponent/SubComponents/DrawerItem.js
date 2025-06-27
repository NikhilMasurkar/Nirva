// Pass item as props
import React from 'react';
import { StyleSheet } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GLOBAL } from '../../../global';
import TextView from '../../../Components/ShareComponents/TextView';
import { NView } from '../../../Components/ShareComponents/NView';

const DrawerItem = props => {
  return (
    <ILView style={[styles.viewParent, props.parentStyle]}>
      <ILView style={styles.viewIcon}>
        <MIcon
          name={props.item.icon}
          size={20}
          color={props.color ? props.color : GLOBAL.COLORAPP.BLUE}
        />
      </ILView>

      <ILView
        style={[styles.viewText, { marginLeft: props.isSubMenu ? 5 : 10 }]}
      >
        <TextView semibold style={[styles.textStyle, props.style]}>
          {props.item.name}
        </TextView>
      </ILView>

      {props.isMenu ? (
        <MIcon
          name={props.isMenuExpanded ? 'chevron-down' : 'chevron-right'}
          size={20}
          color={props.color ? props.color : GLOBAL.COLORAPP.BLUE}
          style={{ marginLeft: 'auto' }}
        />
      ) : null}
    </ILView>
  );
};
const styles = StyleSheet.create({
  viewParent: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginLeft: 25,
  },
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 15,
    color: GLOBAL.COLORAPP.BLUE,
  },
});

export default DrawerItem;
