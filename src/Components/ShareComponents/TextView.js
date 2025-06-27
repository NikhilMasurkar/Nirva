/**
 * Size information
 * titleh1: 40,
 * titleh2: 34,
 * h1: 30,
 * h2: 24,
 * h3: 20,
 * h4: 18,
 * paragraph: 14,
 * small: 12,
 * extraSmall: 10,
 * xxs: 8,
 */

import React from 'react';
import { Text } from 'react-native';
import { withTheme } from 'react-native-paper';
import { fontSizes } from '../../config/Theme/Theme';

const TextView = props => {
  const {
    children,
    theme,
    style,
    titleh1,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    titleh2,
    paragraph,
    small,
    extraSmall,
    xxs,
    extralight,
    light,
    semibold,
    bold,
    extrabold,
    black,
    isLoading,
    isHyperLinkEnabled = true,
    customLinkStyle,
    key,
    ...restProps
  } = props;
  const { fonts } = theme;

  const returnFontSize = () => {
    if (paragraph) {
      return fontSizes.paragraph;
    }
    if (titleh1) {
      return fontSizes.titleh1;
    }
    if (h1) {
      return fontSizes.h1;
    }
    if (h2) {
      return fontSizes.h1;
    }
    if (h3) {
      return fontSizes.h3;
    }
    if (h4) {
      return fontSizes.h4;
    }
    if (h5) {
      return fontSizes.h5;
    }
    if (h6) {
      return fontSizes.h6;
    }
    if (small) {
      return fontSizes.small;
    }
    if (extraSmall) {
      return fontSizes.extraSmall;
    }
    if (titleh2) {
      return fontSizes.titleh2;
    }
    if (xxs) {
      return fontSizes.xxs;
    }
    return fontSizes.paragraph;
  };

  const returnFontWeights = () => {
    if (semibold) {
      return fonts.semibold;
    }
    if (light) {
      return fonts.light;
    }
    if (extralight) {
      return fonts.extralight;
    }
    if (bold) {
      return fonts.bold;
    }
    if (extrabold) {
      return fonts.extrabold;
    }
    if (black) {
      return fonts.black;
    }
    return fonts.regular;
  };

  return (
    <Text
      {...restProps}
      style={[
        returnFontWeights(),
        { color: theme.colors.textPrimary, fontSize: returnFontSize() },
        style,
      ]}
      maxFontSizeMultiplier={1}
    >
      {children}
    </Text>
  );
};

export default withTheme(TextView);
