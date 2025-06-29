import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import { useSignOut } from '../../hooks/useSignOut';

const SignOutButton = ({
  style,
  textStyle,
  title = 'Sign Out',
  variant = 'default', // 'default', 'danger', 'minimal'
  showConfirmation = true,
  resetAllData = true,
  onPress,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const { signOut } = useSignOut();

  const handlePress = async () => {
    if (onPress) {
      onPress();
      return;
    }

    if (showConfirmation) {
      const message = resetAllData
        ? 'Are you sure you want to sign out? This will reset all your data.'
        : 'Are you sure you want to sign out?';

      Alert.alert('Sign Out', message, [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: performSignOut,
        },
      ]);
    } else {
      await performSignOut();
    }
  };

  const performSignOut = async () => {
    setLoading(true);
    try {
      const result = await signOut({ resetAllData });
      if (!result.success) {
        Alert.alert('Error', result.error || 'Sign-out failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong during sign-out');
    } finally {
      setLoading(false);
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'danger':
        return [styles.button, styles.dangerButton, style];
      case 'minimal':
        return [styles.button, styles.minimalButton, style];
      default:
        return [styles.button, styles.defaultButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'danger':
        return [styles.text, styles.dangerText, textStyle];
      case 'minimal':
        return [styles.text, styles.minimalText, textStyle];
      default:
        return [styles.text, styles.defaultText, textStyle];
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={handlePress}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'danger' ? COLORS.WHITE : COLORS.PRIMARY}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: SPACING.SMALL,
    paddingHorizontal: SPACING.NORMAL,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  defaultButton: {
    backgroundColor: COLORS.PRIMARY,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dangerButton: {
    backgroundColor: '#DC3545',
    shadowColor: '#DC3545',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  minimalButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  text: {
    fontSize: fontSizes.h6,
    fontWeight: '600',
    textAlign: 'center',
  },
  defaultText: {
    color: COLORS.WHITE,
  },
  dangerText: {
    color: COLORS.WHITE,
  },
  minimalText: {
    color: COLORS.TEXT_PRIMARY,
  },
});

export default SignOutButton;
