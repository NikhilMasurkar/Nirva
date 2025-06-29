import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../config/Theme/Theme';
import GLOBAL from '../../global/global';
import NMIcon from './NIcon';
import { NView } from './NView';
import { TouchableOpacity } from './TouchableOpacity';

const Header = ({
  title = 'Nirva',
  showMenu = true,
  showProfile = true,
  scrollY,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profile } = useSelector(state => state.user);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const titleFontSize = useRef(new Animated.Value(26)).current;

  // Check if we're on the home screen
  const isHomeScreen = route.name === GLOBAL.PAGE.HOME;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Animate title font size based on scroll position
  useEffect(() => {
    if (scrollY) {
      const listener = scrollY.addListener(({ value }) => {
        const newFontSize = Math.max(20, 26 - value * 0.1); // Reduce font size as scroll increases
        titleFontSize.setValue(newFontSize);
      });

      return () => scrollY.removeListener(listener);
    }
  }, [scrollY, titleFontSize]);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openProfile = () => {
    navigation.navigate(GLOBAL.PAGE.PROFILE);
  };

  const goBack = () => {
    navigation.goBack();
  };

  // Check if user has profile image
  const hasProfileImage = profile?.avatar && profile.avatar.uri;

  return (
    <NView style={styles.container}>
      <NView style={styles.headerContent}>
        <Animated.View
          style={[
            styles.leftSection,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {!isHomeScreen ? (
            <TouchableOpacity
              onPress={goBack}
              style={styles.backButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <NMIcon name="arrow-left" size={24} color={COLORS.WHITE} />
            </TouchableOpacity>
          ) : showMenu ? (
            <TouchableOpacity
              onPress={openDrawer}
              style={styles.menuButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <NView style={styles.menuIcon}>
                <NView style={styles.menuLine} />
                <NView style={styles.menuLine} />
                <NView style={styles.menuLine} />
              </NView>
            </TouchableOpacity>
          ) : null}
        </Animated.View>

        <Animated.View
          style={[
            styles.centerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <Animated.Text style={[styles.title, { fontSize: titleFontSize }]}>
            {title}
          </Animated.Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.rightSection,
            {
              opacity: fadeAnim,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          {showProfile && (
            <TouchableOpacity
              onPress={openProfile}
              style={styles.profileButton}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {hasProfileImage ? (
                <Image
                  source={{ uri: profile.avatar.uri }}
                  style={styles.profileImage}
                />
              ) : (
                <NView style={styles.profilePlaceholder}>
                  <NMIcon
                    name="account-circle"
                    size={24}
                    color={COLORS.WHITE}
                  />
                </NView>
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
      </NView>
    </NView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    paddingTop: 15,
    paddingBottom: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIcon: {
    width: 16,
    height: 12,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 1.5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 1,
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.WHITE,
    letterSpacing: 3,
    textAlign: 'center',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  profilePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
