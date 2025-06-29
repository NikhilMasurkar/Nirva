import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, fontSizes, SPACING } from '../../../config/Theme/Theme';

const QuickActionCard = ({ title, icon, color, onPress, gradient = false }) => {
  const CardComponent = gradient ? LinearGradient : View;
  const cardProps = gradient
    ? {
        colors: [color, `${color}CC`],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      }
    : { style: [styles.card, { backgroundColor: color }] };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <CardComponent
        {...cardProps}
        style={[styles.card, gradient && styles.gradientCard]}
      >
        <Icon name={icon} size={32} color={COLORS.WHITE} />
        <Text style={styles.title}>{title}</Text>
      </CardComponent>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: SPACING.XXS,
  },
  card: {
    borderRadius: 16,
    padding: SPACING.NORMAL,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientCard: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: fontSizes.h6,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginTop: SPACING.XXS,
    textAlign: 'center',
  },
});

export default QuickActionCard;
