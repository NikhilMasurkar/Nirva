import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLORS, fontSizes, SPACING } from '../../config/Theme/Theme';

const CircularProgress = ({
  value,
  maxValue,
  title,
  subtitle,
  color = COLORS.PRIMARY,
  size = 120,
}) => {
  const percentage = (value / maxValue) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={size}
        width={8}
        fill={percentage}
        tintColor={color}
        backgroundColor={COLORS.BORDER_COLOR}
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.progressContent}>
            <Text style={[styles.value, { color }]}>{value}</Text>
            <Text style={styles.maxValue}>/{maxValue}</Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.SMALL,
  },
  progressContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
  },
  maxValue: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
  },
  title: {
    fontSize: fontSizes.h6,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginTop: SPACING.XXS,
  },
  subtitle: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    marginTop: 2,
  },
});

export default CircularProgress;
