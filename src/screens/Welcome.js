import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import GLOBAL from '../global/global';
import AppLogo from '../Components/ShareComponents/AppLogo';
import { NView } from '../Components/ShareComponents/NView';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import { useDispatch } from 'react-redux';
import { setLoginStatus } from '../redux/Reducers/userSlice';
import GoogleSignInButton from '../Components/ShareComponents/GoogleSignInButton';
import GoogleSignInService from '../services/GoogleSignInService';
import TextView from '../Components/ShareComponents/TextView';

const Welcome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { signIn, loading, error, isSignedIn } = useGoogleSignIn();
  const isGoogleSignInAvailable = GoogleSignInService.isGoogleSignInAvailable();

  useEffect(() => {
    // Check if user is already signed in
    if (isSignedIn) {
      handleSuccessfulSignIn();
    }
  }, [isSignedIn]);

  const handleSuccessfulSignIn = () => {
    dispatch(setLoginStatus(true));
    navigation.navigate(GLOBAL.PAGE.HOME);
  };

  const handleGoogleSignIn = async () => {
    if (!isGoogleSignInAvailable) {
      Alert.alert(
        'Google Sign-In Not Configured',
        'Google Sign-In is not configured yet. Please follow the setup guide in GOOGLE_SIGNIN_SETUP.md to configure it.',
        [
          { TextView: 'OK' },
          { TextView: 'Get Started', onPress: handleGetStarted },
        ],
      );
      return;
    }

    try {
      const result = await signIn();
      if (result.success) {
        Alert.alert(
          'Welcome!',
          `Successfully signed in as ${result.user.name}`,
          [{ TextView: 'Continue', onPress: handleSuccessfulSignIn }],
        );
      } else {
        Alert.alert('Sign-In Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleGetStarted = () => {
    navigation.navigate(GLOBAL.PAGE.LOGIN);
  };

  return (
    <NView style={styles.container}>
      <NView style={styles.content}>
        {/* Logo Section */}
        <NView style={styles.logoSection}>
          <NView style={styles.logoContainer}>
            <AppLogo size={100} />
          </NView>
          <TextView style={styles.brandName}>NIRVA</TextView>
          <TextView style={styles.brandSubtitle}>YOGA & FITNESS</TextView>
        </NView>

        {/* Main Content Section */}
        <NView style={styles.mainSection}>
          <NView style={styles.imageContainer}>
            <NView style={styles.yogaImagePlaceholder}>
              <TextView style={styles.yogaEmoji}>🧘‍♀️</TextView>
            </NView>
          </NView>

          <NView style={styles.textContainer}>
            <TextView style={styles.motivationText}>
              Get fitter, stronger, and embrace a healthier lifestyle
            </TextView>
            <TextView style={styles.subtitleText}>
              Track your fitness journey with personalized workouts and mindful
              practices
            </TextView>
          </NView>
        </NView>

        {/* Action Buttons Section */}
        <NView style={styles.actionSection}>
          <GoogleSignInButton
            onPress={handleGoogleSignIn}
            loading={loading}
            title={loading ? 'Signing in...' : 'Continue with Google'}
            disabled={!isGoogleSignInAvailable}
          />

          {!isGoogleSignInAvailable && (
            <TextView style={styles.configNote}>
              Google Sign-In not configured yet
            </TextView>
          )}

          <NView style={styles.dividerContainer}>
            <NView style={styles.divider} />
            <TextView style={styles.dividerText}>or</TextView>
            <NView style={styles.divider} />
          </NView>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
          >
            <TextView style={styles.getStartedText}>GET STARTED</TextView>
          </TouchableOpacity>
        </NView>
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
    paddingTop: SPACING.LARGE * 2,
    paddingBottom: SPACING.LARGE * 2,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: SPACING.LARGE,
  },
  logoContainer: {
    marginBottom: SPACING.NORMAL,
    width: 100,
    height: 100,
  },
  brandName: {
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    letterSpacing: 3,
    marginBottom: SPACING.XXS,
  },
  brandSubtitle: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    letterSpacing: 1,
    fontWeight: '500',
  },
  mainSection: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LARGE * 2,
  },
  yogaImagePlaceholder: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  yogaEmoji: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.NORMAL,
  },
  motivationText: {
    fontSize: fontSizes.h4,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '600',
    marginBottom: SPACING.NORMAL,
  },
  subtitleText: {
    fontSize: fontSizes.h6,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
  },
  actionSection: {
    paddingTop: SPACING.LARGE,
  },
  configNote: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: SPACING.SMALL,
    fontStyle: 'italic',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.LARGE,
    paddingHorizontal: SPACING.NORMAL,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.BORDER,
  },
  dividerText: {
    marginHorizontal: SPACING.NORMAL,
    color: COLORS.TEXT_SECONDARY,
    fontSize: fontSizes.small,
    fontWeight: '500',
  },
  getStartedButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    paddingVertical: SPACING.NORMAL,
    alignItems: 'center',
    marginHorizontal: SPACING.NORMAL,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: COLORS.WHITE,
    fontSize: fontSizes.h5,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default Welcome;
