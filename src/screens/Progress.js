import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../Components/ShareComponents/Header';
import CircularProgress from '../Components/ShareComponents/CircularProgress';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';

const Progress = () => {
  const { dailyStats, goals } = useSelector(state => state.activity);
  const scrollY = new Animated.Value(0);

  return (
    <View style={styles.container}>
      <Header title="Progress" showMenu={false} scrollY={scrollY} />
      <Animated.ScrollView
        style={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        <Text style={styles.title}>Your Progress</Text>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Today's Achievement</Text>
          <View style={styles.progressGrid}>
            <CircularProgress
              value={dailyStats.steps}
              maxValue={goals.dailySteps}
              title="Steps"
              subtitle="Daily Goal"
              color={COLORS.PRIMARY}
              size={120}
            />
            <CircularProgress
              value={dailyStats.caloriesBurned}
              maxValue={goals.dailyCalories}
              title="Calories"
              subtitle="Burned"
              color={COLORS.ACCENT}
              size={120}
            />
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Weekly Summary</Text>
          <Text style={styles.cardDescription}>
            Keep up the great work! Your consistency is improving every day.
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
  progressSection: {
    marginBottom: SPACING.LARGE,
  },
  sectionTitle: {
    fontSize: fontSizes.h3,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.NORMAL,
  },
  progressGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.NORMAL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.LARGE,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: SPACING.SMALL,
  },
  cardDescription: {
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default Progress;
