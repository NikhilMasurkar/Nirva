import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Components/ShareComponents/Header';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';

const Meditation = () => {
  return (
    <View style={styles.container}>
      <Header title="Meditation" showMenu={false} />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Meditation & Mindfulness</Text>
        <Text style={styles.description}>
          Guided meditation sessions to help you find inner peace and balance.
        </Text>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>Coming Soon!</Text>
          <Text style={styles.comingSoonDesc}>
            We're preparing beautiful meditation sessions for your well-being.
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

export default Meditation;
