import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import TextView from './TextView';
import { TouchableOpacity } from './TouchableOpacity';

const GoogleSignInButton = ({
  onPress,
  loading = false,
  disabled = false,
  title = 'Continue with Google',
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        (loading || disabled) && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.TEXT_PRIMARY} />
      ) : (
        <TextView style={[styles.text, textStyle]}>{title}</TextView>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    paddingVertical: SPACING.NORMAL,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: fontSizes.h5,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default GoogleSignInButton;
