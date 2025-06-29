import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import GLOBAL from '../global/global';
import AppLogo from '../Components/ShareComponents/AppLogo';
import { NView } from '../Components/ShareComponents/NView';

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <NView style={styles.container}>
      <NView style={styles.content}>
        <NView style={styles.logoContainer}>
          <AppLogo />
          <Text style={styles.brandSubtitle}>YOGA CREATIVE</Text>
        </NView>

        <NView style={styles.imageContainer}>
          <NView style={styles.yogaImagePlaceholder}>
            <Text style={styles.yogaEmoji}>🧘‍♀️</Text>
          </NView>
        </NView>

        <NView style={styles.textContainer}>
          <Text style={styles.motivationText}>
            Get fitter, stronger, and embrace a healthier lifestyle
          </Text>
        </NView>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate(GLOBAL.PAGE.LOGIN)}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
        </TouchableOpacity>
      </NView>
    </NView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LARGE,
    justifyContent: 'space-between',
    paddingTop: SPACING.LARGE * 3,
    paddingBottom: SPACING.LARGE * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LARGE,
  },
  logoSymbol: {
    marginBottom: SPACING.NORMAL,
  },
  logoText: {
    fontSize: 60,
  },
  brandName: {
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    letterSpacing: 2,
    marginBottom: SPACING.XXS,
  },
  brandSubtitle: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 1,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  yogaImagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yogaEmoji: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LARGE * 2,
  },
  motivationText: {
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    paddingVertical: SPACING.NORMAL,
    alignItems: 'center',
    marginHorizontal: SPACING.NORMAL,
  },
  getStartedText: {
    color: COLORS.WHITE,
    fontSize: fontSizes.h5,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default Welcome;
