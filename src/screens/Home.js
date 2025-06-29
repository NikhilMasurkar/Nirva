import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Header from '../Components/ShareComponents/Header';
import { updateDailyStats } from '../redux/Reducers/activitySlice';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import GLOBAL from '../global/global';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { dailyStats, goals } = useSelector(state => state.activity);

  useEffect(() => {
    // Simulate updating daily stats
    const timer = setInterval(() => {
      dispatch(
        updateDailyStats({
          steps: Math.min(
            dailyStats.steps + Math.floor(Math.random() * 10),
            goals.dailySteps,
          ),
          caloriesBurned: Math.min(
            dailyStats.caloriesBurned + Math.floor(Math.random() * 2),
            goals.dailyCalories,
          ),
          activeMinutes: Math.min(
            dailyStats.activeMinutes + Math.floor(Math.random() * 1),
            goals.dailyMinutes,
          ),
        }),
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [dispatch, dailyStats, goals]);

  const exerciseCategories = [
    {
      title: 'Essentials For Beginners',
      subtitle: 'More',
      image: '🧘‍♀️',
      duration: '1 WEEK',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
    {
      title: 'Easy Yoga For Complete Beginners',
      subtitle: 'Level 1',
      image: '🧘‍♀️',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
    {
      title: 'Yoga Basics For Beginners',
      subtitle: 'Level 1',
      image: '🧘‍♀️',
      duration: '2 WEEKS',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
  ];

  const featuredProgram = {
    title: 'TRIYOGA BASICS FLOW',
    instructor: 'Yogini Kaliji',
    badge: 'PRO',
    image: '🧘‍♀️',
  };

  return (
    <View style={styles.container}>
      <Header title="Exercises" showSearch={true} showProfile={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredCard}>
            <View style={styles.featuredImageContainer}>
              <Text style={styles.featuredEmoji}>🧘‍♀️</Text>
              <View style={styles.featuredOverlay}>
                <Text style={styles.featuredTitle}>Essentials</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Essentials For Beginners</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {exerciseCategories.slice(1).map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={category.onPress}
              >
                <View style={styles.categoryImageContainer}>
                  <Text style={styles.categoryEmoji}>{category.image}</Text>
                  {category.duration && (
                    <View style={styles.durationBadge}>
                      <Text style={styles.durationText}>
                        {category.duration}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Program */}
        <View style={styles.featuredProgramSection}>
          <View style={styles.featuredProgramCard}>
            <View style={styles.programBadge}>
              <Text style={styles.programBadgeText}>
                {featuredProgram.badge}
              </Text>
            </View>
            <Text style={styles.programTitle}>{featuredProgram.title}</Text>
            <Text style={styles.programInstructor}>
              {featuredProgram.instructor}
            </Text>
            <View style={styles.programImageContainer}>
              <Text style={styles.programEmoji}>{featuredProgram.image}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, styles.activeNavText]}>News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>▶️</Text>
          <Text style={styles.navText}>Training</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💡</Text>
          <Text style={styles.navText}>HealthTips</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  },
  featuredSection: {
    padding: SPACING.NORMAL,
  },
  featuredCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  featuredImageContainer: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  featuredEmoji: {
    fontSize: 60,
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: SPACING.NORMAL,
    left: SPACING.NORMAL,
  },
  featuredTitle: {
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  categoriesSection: {
    paddingHorizontal: SPACING.NORMAL,
    marginBottom: SPACING.LARGE,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.NORMAL,
  },
  sectionTitle: {
    fontSize: fontSizes.h4,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  moreText: {
    fontSize: fontSizes.h6,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  horizontalScroll: {
    marginLeft: -SPACING.NORMAL,
  },
  categoryCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: SPACING.NORMAL,
    marginLeft: SPACING.NORMAL,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImageContainer: {
    height: 100,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.SMALL,
    position: 'relative',
  },
  categoryEmoji: {
    fontSize: 40,
  },
  durationBadge: {
    position: 'absolute',
    top: SPACING.XXS,
    left: SPACING.XXS,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.XXS,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
  categoryTitle: {
    fontSize: fontSizes.h6,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XXS,
  },
  categorySubtitle: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
  },
  featuredProgramSection: {
    paddingHorizontal: SPACING.NORMAL,
    marginBottom: SPACING.LARGE,
  },
  featuredProgramCard: {
    backgroundColor: COLORS.WARNING,
    borderRadius: 16,
    padding: SPACING.NORMAL,
    position: 'relative',
    height: 120,
  },
  programBadge: {
    position: 'absolute',
    top: SPACING.SMALL,
    left: SPACING.SMALL,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SPACING.XXS,
    paddingVertical: 2,
    borderRadius: 4,
  },
  programBadgeText: {
    fontSize: fontSizes.xxs,
    fontWeight: 'bold',
    color: COLORS.WARNING,
  },
  programTitle: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginTop: SPACING.LARGE,
  },
  programInstructor: {
    fontSize: fontSizes.small,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  programImageContainer: {
    position: 'absolute',
    right: SPACING.NORMAL,
    top: SPACING.NORMAL,
    bottom: SPACING.NORMAL,
    justifyContent: 'center',
  },
  programEmoji: {
    fontSize: 40,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    paddingVertical: SPACING.SMALL,
    paddingHorizontal: SPACING.NORMAL,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_COLOR,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navText: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
  },
  activeNavText: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});

export default Home;
