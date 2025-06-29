import React from 'react';
import { StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import NMIcon from './NIcon';
import { NView } from './NView';
import TextView from './TextView';
import { TouchableOpacity } from './TouchableOpacity';

const { width: screenWidth } = Dimensions.get('window');

const GlassIcons = ({ items = [], onPress }) => {
  const renderGlassIcon = (item, index) => {
    const animatedValue = new Animated.Value(0);

    const handlePressIn = () => {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    };

    // Separate transform interpolations
    const backRotate = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['15deg', '25deg'],
    });

    const backTranslateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8],
    });

    const backTranslateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -8],
    });

    const frontTranslateY = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -4],
    });

    const frontScale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });

    const labelOpacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const labelTransform = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    });

    return (
      <TouchableOpacity
        key={index}
        style={styles.iconButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress && onPress(item, index)}
        activeOpacity={0.8}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Animated.View
          style={[
            styles.iconBack,
            { backgroundColor: item.color },
            {
              transform: [
                { rotate: backRotate },
                { translateX: backTranslateX },
                { translateY: backTranslateY },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.iconFront,
            {
              transform: [
                { translateY: frontTranslateY },
                { scale: frontScale },
              ],
            },
          ]}
        >
          <NMIcon name={item.icon} size={24} color={COLORS.WHITE} />
        </Animated.View>
        <Animated.Text
          style={[
            styles.iconLabel,
            {
              opacity: labelOpacity,
              transform: [{ translateY: labelTransform }],
            },
          ]}
        >
          {item.label}
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <NView style={styles.container}>
      <TextView style={styles.sectionTitle}>Quick Access</TextView>
      <NView style={styles.gridContainer}>{items.map(renderGlassIcon)}</NView>
    </NView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.SMALL,
    marginBottom: SPACING.NORMAL,
  },
  sectionTitle: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SMALL,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.SMALL,
  },
  iconButton: {
    width: (screenWidth - SPACING.SMALL * 4) / 4,
    height: (screenWidth - SPACING.SMALL * 4) / 4,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  iconFront: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 9,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  iconLabel: {
    position: 'absolute',
    bottom: -24,
    fontSize: fontSizes.xxs,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  iconLabelText: {
    fontSize: fontSizes.xxs,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
});

export default GlassIcons;
