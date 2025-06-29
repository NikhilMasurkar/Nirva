import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import NMIcon from './NIcon';
import { NView } from './NView';
import TextView from './TextView';
import { TouchableOpacity } from './TouchableOpacity';

const AnimatedCard = ({ title, description, icon, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, [pulseAnim, glowAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.8}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: Animated.multiply(pulseAnim, scaleAnim) }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.glowEffect,
            {
              opacity: glowOpacity,
            },
          ]}
        />

        <NView style={styles.comingSoonBadge}>
          <TextView style={styles.comingSoonText}>Coming Soon</TextView>
        </NView>

        <NView style={styles.iconContainer}>
          <NMIcon name={icon} size={32} color={COLORS.PRIMARY} />
        </NView>

        <TextView style={styles.title}>{title}</TextView>
        <TextView style={styles.description}>{description}</TextView>

        <NView style={styles.progressContainer}>
          <NView style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['60%', '80%'],
                  }),
                },
              ]}
            />
          </NView>
          <TextView style={styles.progressText}>In Development</TextView>
        </NView>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.SMALL,
    marginBottom: SPACING.SMALL,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: SPACING.NORMAL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: SPACING.SMALL,
    right: SPACING.SMALL,
    backgroundColor: COLORS.WARNING,
    paddingHorizontal: SPACING.XXS,
    paddingVertical: 2,
    borderRadius: 8,
    zIndex: 1,
  },
  comingSoonText: {
    fontSize: fontSizes.xxs,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.SMALL,
  },
  title: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  description: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.SMALL,
    lineHeight: 16,
  },
  progressContainer: {
    marginTop: SPACING.XXS,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.BORDER_COLOR,
    borderRadius: 2,
    marginBottom: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 2,
  },
  progressText: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
  },
});

export default AnimatedCard;
