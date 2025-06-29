import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import GLOBAL from '../../global/global';
import NMIcon from './NIcon';

const Header = ({ title = 'Nirva', showMenu = true, showProfile = true }) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const openProfile = () => {
    navigation.navigate(GLOBAL.PAGE.PROFILE);
  };

  return (
    <LinearGradient
      colors={COLORS.GRADIENT}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerContent}>
        <View style={styles.leftSection}>
          {showMenu && (
            <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
              <NMIcon name="menu" size={24} color={COLORS.WHITE} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Your Wellness Journey</Text>
        </View>

        <View style={styles.rightSection}>
          {showProfile && (
            <TouchableOpacity onPress={openProfile} style={styles.iconButton}>
              <NMIcon name="account-circle" size={24} color={COLORS.WHITE} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.NORMAL,
    paddingBottom: SPACING.NORMAL,
    paddingHorizontal: SPACING.NORMAL,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: SPACING.XXS,
    borderRadius: 20,
  },
  title: {
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: fontSizes.small,
    color: COLORS.WHITE,
    opacity: 0.8,
    marginTop: 2,
  },
});

export default Header;
