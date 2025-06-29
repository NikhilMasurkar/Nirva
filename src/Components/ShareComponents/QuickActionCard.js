import React from 'react';
import { StyleSheet } from 'react-native';
import NMIcon from './NIcon';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, fontSizes, SPACING } from '../../config/Theme/Theme';
import { NView } from './NView';
import TextView from './TextView';
import { TouchableOpacity } from './TouchableOpacity';

const QuickActionCard = ({
  title,
  color,
  onPress,
  gradient = false,
  icon = 'dumbbell',
}) => {
  const CardComponent = gradient ? LinearGradient : NView;
  const cardProps = gradient
    ? {
        colors: [color, `${color}CC`],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      }
    : { style: [styles.card, { backgroundColor: color }] };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <CardComponent
        {...cardProps}
        style={[styles.card, gradient && styles.gradientCard]}
      >
        <NMIcon name={icon} size={32} color={COLORS.WHITE} />
        <TextView style={styles.title}>{title}</TextView>
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
