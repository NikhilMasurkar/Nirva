import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/ShareComponents/Header';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';

const ExercisesWomen = () => {
  return (
    <View style={styles.container}>
      <Header title="Women's Exercises" showMenu={false} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Women's Wellness Program</Text>
        <Text style={styles.description}>
          Yoga, flexibility, and wellness exercises designed specifically for
          women.
        </Text>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>Coming Soon!</Text>
          <Text style={styles.comingSoonDesc}>
            We're working hard to bring you the best women's wellness program.
          </Text>
        </View>
      </ScrollView>
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

export default ExercisesWomen;
