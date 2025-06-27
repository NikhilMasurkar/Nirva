import React, { useState } from 'react';
import DrawerItem from './SubComponents/DrawerItem';
import { DRAWER_ITEMS_DATA } from './helper';
import { TouchableHighlight } from '../ShareComponents/TouchableHighlight';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { NView } from '../ShareComponents/NView';
import {
  navigate,
  checkAndNavigateForKeyCustom,
  NAVIGATION_CUSTOM_KEY,
} from '../../NavigationUtils';

const DrawerComponent = () => {
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(null);

  return (
    <NView style={{ flex: 1 }}>
      {/* <NScrollView>
        {DRAWER_ITEMS_DATA.map((item, index) => (
          <NView key={index}>
            <TouchableHighlight
              onPress={() => {
                if (item.navigation === NAVIGATION_CUSTOM_KEY) {
                  checkAndNavigateForKeyCustom(item.customNavigation);
                } else if (item.subMenu && item.subMenu.length) {
                  setIsSubMenuVisible(
                    isSubMenuVisible === index ? null : index,
                  );
                } else {
                  if (item.customParams) {
                    navigate(item.navigation, {
                      customParams: item.customParams,
                    });
                  } else {
                    navigate(item.navigation);
                  }
                }
              }}
            >
              <DrawerItem
                item={item}
                isMenu={!!(item.subMenu && item.subMenu.length)}
                isMenuExpanded={isSubMenuVisible === index}
              />
            </TouchableHighlight>
            {isSubMenuVisible === index &&
              item.subMenu &&
              item.subMenu.length > 0 && (
                <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
                  {item.subMenu.map((subItem, subIndex) => (
                    <TouchableHighlight
                      onPress={() => {
                        if (subItem.params) {
                          navigate(subItem.navigation, {
                            paramsObj: subItem.params,
                          });
                        } else {
                          navigate(subItem.navigation);
                        }
                        setIsSubMenuVisible(null);
                      }}
                      style={{ marginLeft: 20 }}
                      key={subIndex}
                    >
                      <DrawerItem item={subItem} isSubMenu={true} />
                    </TouchableHighlight>
                  ))}
                </Animated.View>
              )}
          </NView>
        ))}
      </NScrollView> */}
    </NView>
  );
};

export default DrawerComponent;
