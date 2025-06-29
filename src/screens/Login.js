import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import NMIcon from '../Components/ShareComponents/NIcon';
import { setLoginStatus } from '../redux/Reducers/userSlice';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import GLOBAL from '../global/global';
import AppLogo from '../Components/ShareComponents/AppLogo';
import { NScrollView } from '../Components/ShareComponents/NScrollView';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import GoogleSignInButton from '../Components/ShareComponents/GoogleSignInButton';
import GoogleSignInService from '../services/GoogleSignInService';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading, error } = useGoogleSignIn();
  const isGoogleSignInAvailable = GoogleSignInService.isGoogleSignInAvailable();

  const handleLogin = () => {
    // Dummy login validation
    if (email === 'demo@nirva.com' && password === 'password123') {
      dispatch(setLoginStatus(true));
      navigation.navigate(GLOBAL.PAGE.DRAWER_NAVIGATION);
    } else {
      Alert.alert(
        'Login Failed',
        'Please use the demo credentials provided below.',
      );
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isGoogleSignInAvailable) {
      Alert.alert(
        'Google Sign-In Not Configured',
        'Google Sign-In is not configured yet. Please follow the setup guide in GOOGLE_SIGNIN_SETUP.md to configure it.',
        [{ text: 'OK' }],
      );
      return;
    }

    try {
      const result = await signIn();
      if (result.success) {
        Alert.alert(
          'Welcome!',
          `Successfully signed in as ${result.user.name}`,
          [
            {
              text: 'Continue',
              onPress: () => {
                dispatch(setLoginStatus(true));
                navigation.navigate(GLOBAL.PAGE.DRAWER_NAVIGATION);
              },
            },
          ],
        );
      } else {
        Alert.alert('Sign-In Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleSkip = () => {
    dispatch(setLoginStatus(true));
    navigation.navigate(GLOBAL.PAGE.DRAWER_NAVIGATION);
  };

  return (
    <NScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <NMIcon name="arrow-left" size={24} color={COLORS.TEXT_PRIMARY} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <AppLogo size={80} />
          </View>
        </View>

        <Text style={styles.title}>Change starts here</Text>
        <Text style={styles.subtitle}>
          Save your progress to access your personal training program!
        </Text>

        {/* Google Sign-In Button */}
        <GoogleSignInButton
          onPress={handleGoogleSignIn}
          loading={loading}
          title={loading ? 'Signing in...' : 'Continue with Google'}
          style={styles.googleSignInButton}
          disabled={!isGoogleSignInAvailable}
        />

        {!isGoogleSignInAvailable && (
          <Text style={styles.configNote}>
            Google Sign-In not configured yet
          </Text>
        )}

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Your Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="email123@gmail.com"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Set password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={COLORS.TEXT_SECONDARY}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <NMIcon
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={COLORS.TEXT_SECONDARY}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.confirmButton} onPress={handleLogin}>
            <Text style={styles.confirmText}>CONFIRM</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>SKIP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoCredentials}>
          <Text style={styles.demoTitle}>Demo Credentials:</Text>
          <Text style={styles.demoText}>Email: demo@nirva.com</Text>
          <Text style={styles.demoText}>Password: password123</Text>
        </View>
      </View>
    </NScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND,
    paddingBottom: SPACING.LARGE * 2,
  },
  backButton: {
    position: 'absolute',
    top: SPACING.LARGE * 2,
    left: SPACING.NORMAL,
    zIndex: 1,
    padding: SPACING.XXS,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.LARGE,
    paddingTop: SPACING.LARGE * 4,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: SPACING.LARGE,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 50,
  },
  title: {
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginBottom: SPACING.SMALL,
  },
  subtitle: {
    fontSize: fontSizes.h6,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.LARGE * 2,
    lineHeight: 20,
  },
  googleSignInButton: {
    marginBottom: SPACING.LARGE,
  },
  configNote: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.LARGE,
    fontStyle: 'italic',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.LARGE,
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
  formContainer: {
    marginBottom: SPACING.LARGE,
  },
  inputContainer: {
    marginBottom: SPACING.LARGE,
  },
  inputLabel: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XXS,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
    paddingVertical: SPACING.SMALL,
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_PRIMARY,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: SPACING.SMALL,
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_PRIMARY,
  },
  eyeIcon: {
    padding: SPACING.XXS,
  },
  confirmButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 25,
    paddingVertical: SPACING.NORMAL,
    alignItems: 'center',
    marginTop: SPACING.LARGE,
    marginBottom: SPACING.NORMAL,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmText: {
    color: COLORS.WHITE,
    fontSize: fontSizes.h5,
    fontWeight: '600',
    letterSpacing: 1,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: SPACING.SMALL,
  },
  skipText: {
    color: COLORS.TEXT_SECONDARY,
    fontSize: fontSizes.h6,
    fontWeight: '500',
  },
  demoCredentials: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    padding: SPACING.NORMAL,
    borderRadius: 12,
    marginTop: SPACING.LARGE,
  },
  demoTitle: {
    fontSize: fontSizes.h6,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_DARK,
    marginBottom: SPACING.XXS,
  },
  demoText: {
    fontSize: fontSizes.small,
    color: COLORS.PRIMARY_DARK,
    marginBottom: 2,
  },
});

export default Login;
