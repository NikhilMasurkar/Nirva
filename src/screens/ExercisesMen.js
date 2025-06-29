import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import Header from '../Components/ShareComponents/Header';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';

const ExercisesMen = () => {
  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <Header title="Men's Exercises" scrollY={scrollY} />
      <Animated.ScrollView
        style={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>Men's Fitness Program</Text>
        <Text style={styles.description}>
          Strength training and endurance exercises designed specifically for
          men.
        </Text>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>Coming Soon!</Text>
          <Text style={styles.comingSoonDesc}>
            We're working hard to bring you the best men's fitness program.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.NORMAL,
  },
  title: {
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginVertical: SPACING.LARGE,
    textAlign: 'center',
  },
  description: {
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: SPACING.LARGE,
  },
  comingSoon: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.LARGE,
    alignItems: 'center',
    marginTop: SPACING.LARGE,
  },
  comingSoonText: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: SPACING.SMALL,
  },
  comingSoonDesc: {
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default ExercisesMen;
