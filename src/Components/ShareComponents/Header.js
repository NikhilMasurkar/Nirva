import React from 'react';
import { TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NView } from './NView';
import TextView from './TextView';
import { GLOBAL } from '../../global';
import { useNavigation } from '@react-navigation/native';

export const Header = ({ onProfilePress }) => {
  const navigation = useNavigation();

  const HamburgerIcon = () => {
    return (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Icon
          name="menu"
          size={24}
          color={GLOBAL.COLORAPP.THEME.COLORS.SURFACE}
        />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar
        backgroundColor={GLOBAL.COLORAPP.THEME.COLORS.PRIMARY}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.headerContainer}>
        <NView style={styles.headerContent}>
          {/* Left side - Menu/Logo */}
          <HamburgerIcon />
          {/* Center - Logo/Title */}
          <NView style={styles.logoContainer}>
            <TextView style={styles.logoText}>Nirva</TextView>
            <TextView style={styles.logoSubtext}>Yoga & Wellness</TextView>
          </NView>
          {/* Right side - Profile */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={onProfilePress}
          >
            <Icon
              name="account-circle"
              size={24}
              color={GLOBAL.COLORAPP.THEME.COLORS.SURFACE}
            />
          </TouchableOpacity>
        </NView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: GLOBAL.COLORAPP.THEME.COLORS.PRIMARY,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: GLOBAL.COLORAPP.THEME.SPACING.BASE,
    paddingVertical: GLOBAL.COLORAPP.THEME.SPACING.SM,
    height: 60,
  },
  headerButton: {
    padding: GLOBAL.COLORAPP.THEME.SPACING.SM,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: GLOBAL.COLORAPP.THEME.TYPOGRAPHY.FONTSIZE.XL,
    fontWeight: 'bold',
    color: GLOBAL.COLORAPP.THEME.COLORS.SURFACE,
    letterSpacing: 1,
  },
  logoSubtext: {
    fontSize: GLOBAL.COLORAPP.THEME.TYPOGRAPHY.FONTSIZE.XS,
    color: GLOBAL.COLORAPP.THEME.COLORS.SURFACE + 'CC',
    marginTop: -2,
  },
  profileButton: {
    padding: GLOBAL.COLORAPP.THEME.SPACING.SM,
  },
});
