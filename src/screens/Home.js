import React, { useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../Components/ShareComponents/Header';
import Carousel from '../Components/ShareComponents/Carousel';
import GlassIcons from '../Components/ShareComponents/GlassIcons';
import AnimatedCard from '../Components/ShareComponents/AnimatedCard';
import CustomModal from '../Components/ShareComponents/CustomModal';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import GLOBAL from '../global/global';
import useFitnessTracking from '../hooks/useFitnessTracking';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import useCustomModal from '../hooks/useCustomModal';
import { NView } from '../Components/ShareComponents/NView';
import TextView from '../Components/ShareComponents/TextView';
import { TouchableOpacity } from '../Components/ShareComponents/TouchableOpacity';

const Home = () => {
  const navigation = useNavigation();
  const { dailyStats } = useSelector(state => state.activity);
  const { user: userState, googleSignIn } = useSelector(state => state.user);
  const scrollY = new Animated.Value(0);

  // Google Sign-In hook
  const { signIn, isSignedIn, user } = useGoogleSignIn();

  // Fitness tracking hook
  const {
    isEnabled,
    isAuthorized,
    platform,
    currentSteps,
    currentCalories,
    requestPermissions,
    manualSync,
  } = useFitnessTracking();

  // Custom modal hook
  const { modalState, showError, showSuccess, showConfirm, hideModal } =
    useCustomModal();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current;

  // Check if user is signed in with Google
  const isGoogleSignedIn = googleSignIn.isSignedIn || isSignedIn;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Handle Google Sign-In
  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signIn();
      if (result.success) {
        showSuccess(
          'Welcome!',
          `Successfully signed in as ${result.user.name}. Fitness tracking is now enabled!`,
        );
      } else {
        showError('Sign-In Failed', result.error || 'Please try again');
      }
    } catch (error) {
      showError('Error', 'Something went wrong. Please try again.');
    }
  }, [signIn, showSuccess, showError]);

  // Handle fitness tracking permission request (only if Google signed in)
  const handleFitnessPermission = useCallback(async () => {
    if (!isGoogleSignedIn) {
      showConfirm(
        'Google Sign-In Required',
        'Please sign in with Google to enable fitness tracking.',
        () => {
          // Cancel action
        },
        () => {
          // This will be handled by the buttons in the modal
        },
      );
      return;
    }

    try {
      const granted = await requestPermissions();
      if (granted) {
        showSuccess(
          'Success',
          'Fitness tracking enabled! Your steps and calories will now be tracked automatically.',
        );
      } else {
        showConfirm(
          'Permission Required',
          'Please enable fitness tracking permissions to see your real-time steps and calories.',
          () => {
            // Cancel action
          },
          () => {
            // This will be handled by the buttons in the modal
          },
        );
      }
    } catch (error) {
      showError(
        'Error',
        'Failed to enable fitness tracking. Please try again.',
      );
    }
  }, [
    requestPermissions,
    isGoogleSignedIn,
    showSuccess,
    showError,
    showConfirm,
  ]);

  // Handle manual sync (only if Google signed in)
  const handleManualSync = useCallback(async () => {
    if (!isGoogleSignedIn) {
      showConfirm(
        'Google Sign-In Required',
        'Please sign in with Google to sync fitness data.',
        () => {
          // Cancel action
        },
        () => {
          // This will be handled by the buttons in the modal
        },
      );
      return;
    }

    try {
      await manualSync();
      showSuccess('Success', 'Fitness data synced successfully!');
    } catch (error) {
      showError('Error', 'Failed to sync fitness data. Please try again.');
    }
  }, [manualSync, isGoogleSignedIn, showSuccess, showError, showConfirm]);

  // Carousel data
  const carouselData = [
    {
      emoji: '🧘‍♀️',
      title: 'Begin Your Yoga Journey',
      subtitle: 'Start with basic poses and build your foundation',
    },
    {
      emoji: '💪',
      title: 'Build Strength & Flexibility',
      subtitle: 'Progressive workouts for all fitness levels',
    },
    {
      emoji: '🧘‍♂️',
      title: 'Mindfulness & Meditation',
      subtitle: 'Find inner peace and mental clarity',
    },
  ];

  // Glass Icons shortcuts
  const shortcutItems = [
    {
      icon: 'dumbbell',
      color: '#667eea',
      label: 'Exercises',
      route: GLOBAL.PAGE.EXERCISES_WOMEN,
    },
    {
      icon: 'food-apple',
      color: '#764ba2',
      label: 'Diet',
      route: GLOBAL.PAGE.DIET,
    },
    {
      icon: 'meditation',
      color: '#f093fb',
      label: 'Meditation',
      route: GLOBAL.PAGE.MEDITATION,
    },
    {
      icon: 'chart-line',
      color: '#4facfe',
      label: 'Progress',
      route: GLOBAL.PAGE.PROGRESS,
    },
    {
      icon: 'account-circle',
      color: '#43e97b',
      label: 'Profile',
      route: GLOBAL.PAGE.PROFILE,
    },
    { icon: 'download', color: '#fa709a', label: 'Downloads', route: null },
  ];

  // Suggested courses
  const suggestedCourses = [
    {
      title: 'Yoga Basics for Beginners',
      subtitle: 'Level 1 • 2 weeks',
      image: '🧘‍♀️',
      duration: '2 WEEKS',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
    {
      title: 'Morning Flow Routine',
      subtitle: 'Level 1 • 1 week',
      image: '🌅',
      duration: '1 WEEK',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
    {
      title: 'Stress Relief Yoga',
      subtitle: 'Level 2 • 3 weeks',
      image: '😌',
      duration: '3 WEEKS',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
  ];

  // Popular courses
  const popularCourses = [
    {
      title: 'Power Yoga Flow',
      instructor: 'Sarah Johnson',
      rating: '4.8',
      students: '2.4k',
      image: '💪',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
    {
      title: 'Gentle Hatha Yoga',
      instructor: 'Michael Chen',
      rating: '4.9',
      students: '1.8k',
      image: '🌸',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
    {
      title: 'Vinyasa Flow',
      instructor: 'Emma Davis',
      rating: '4.7',
      students: '3.1k',
      image: '🌊',
      onPress: () => navigation.navigate(GLOBAL.PAGE.EXERCISES_WOMEN),
    },
  ];

  // Upcoming features
  const upcomingFeatures = [
    {
      title: 'AI Personal Trainer',
      description:
        'Get personalized workout recommendations based on your progress and goals',
      icon: 'robot',
    },
    {
      title: 'Live Classes',
      description:
        'Join live yoga sessions with expert instructors from around the world',
      icon: 'video',
    },
    {
      title: 'Community Challenges',
      description: 'Compete with friends and family in fun fitness challenges',
      icon: 'trophy',
    },
  ];

  const handleShortcutPress = useCallback(
    (item, index) => {
      if (item.route) {
        navigation.navigate(item.route);
      }
    },
    [navigation],
  );

  const renderCourseCard = (course, index) => (
    <TouchableOpacity
      key={index}
      style={styles.courseCard}
      onPress={course.onPress}
    >
      <NView style={styles.courseImageContainer}>
        <TextView style={styles.courseEmoji}>{course.image}</TextView>
        {course.duration && (
          <NView style={styles.durationBadge}>
            <TextView style={styles.durationText}>{course.duration}</TextView>
          </NView>
        )}
      </NView>
      <TextView style={styles.courseTitle}>{course.title}</TextView>
      <TextView style={styles.courseSubtitle}>{course.subtitle}</TextView>
    </TouchableOpacity>
  );

  const renderPopularCourse = (course, index) => (
    <TouchableOpacity
      key={index}
      style={styles.popularCourseCard}
      onPress={course.onPress}
    >
      <NView style={styles.popularCourseHeader}>
        <TextView style={styles.popularCourseEmoji}>{course.image}</TextView>
        <NView style={styles.ratingContainer}>
          <TextView style={styles.ratingText}>⭐ {course.rating}</TextView>
        </NView>
      </NView>
      <TextView style={styles.popularCourseTitle}>{course.title}</TextView>
      <TextView style={styles.popularCourseInstructor}>
        {course.instructor}
      </TextView>
      <TextView style={styles.popularCourseStudents}>
        {course.students} students
      </TextView>
    </TouchableOpacity>
  );

  const floatingTranslateY = floatingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  // Use real fitness data or fallback to dailyStats with safe defaults
  // Only show real data if Google signed in and authorized
  const displaySteps =
    isGoogleSignedIn && isAuthorized
      ? currentSteps || 0
      : dailyStats?.steps || 0;
  const displayCalories =
    isGoogleSignedIn && isAuthorized
      ? currentCalories || 0
      : dailyStats?.caloriesBurned || 0;
  const displayActiveMinutes = dailyStats?.activeMinutes || 0;

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={GLOBAL.COLORAPP.PRIMARY}
        animated={true}
      />
      <NView style={styles.container}>
        <Header title="Nirva" />

        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                  { translateY: floatingTranslateY },
                ],
              },
            ]}
          >
            {/* Welcome Section with Stats */}
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
              style={styles.welcomeSection}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <TextView style={styles.welcomeTitle}>Welcome back! 👋</TextView>
              <TextView style={styles.welcomeSubtitle}>
                Let's continue your wellness journey today
              </TextView>

              {/* Google Sign-In Required Message */}
              {!isGoogleSignedIn && (
                <TouchableOpacity
                  style={styles.googleSignInButton}
                  onPress={handleGoogleSignIn}
                >
                  <TextView style={styles.googleSignInButtonText}>
                    Sign in with Google to Enable Fitness Tracking
                  </TextView>
                </TouchableOpacity>
              )}

              {/* Fitness Tracking Status - Only show if Google signed in */}
              {isGoogleSignedIn && !isAuthorized && isEnabled && (
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={handleFitnessPermission}
                >
                  <TextView style={styles.permissionButtonText}>
                    Enable Fitness Tracking
                  </TextView>
                </TouchableOpacity>
              )}

              <NView style={styles.statsContainer}>
                <NView style={styles.statItem}>
                  <TextView style={styles.statValue}>{displaySteps}</TextView>
                  <TextView style={styles.statLabel}>Steps</TextView>
                  {isGoogleSignedIn && isAuthorized && (
                    <TextView style={styles.statSource}>{platform}</TextView>
                  )}
                  {!isGoogleSignedIn && (
                    <TextView style={styles.statSource}>Demo Data</TextView>
                  )}
                </NView>
                <NView style={styles.statDivider} />
                <NView style={styles.statItem}>
                  <TextView style={styles.statValue}>
                    {displayCalories}
                  </TextView>
                  <TextView style={styles.statLabel}>Calories</TextView>
                  {isGoogleSignedIn && isAuthorized && (
                    <TextView style={styles.statSource}>Real-time</TextView>
                  )}
                  {!isGoogleSignedIn && (
                    <TextView style={styles.statSource}>Demo Data</TextView>
                  )}
                </NView>
                <NView style={styles.statDivider} />
                <NView style={styles.statItem}>
                  <TextView style={styles.statValue}>
                    {displayActiveMinutes}
                  </TextView>
                  <TextView style={styles.statLabel}>Minutes</TextView>
                </NView>
              </NView>

              {/* Manual Sync Button - Only show if Google signed in and authorized */}
              {isGoogleSignedIn && isAuthorized && (
                <TouchableOpacity
                  style={styles.syncButton}
                  onPress={handleManualSync}
                >
                  <TextView style={styles.syncButtonText}>Sync Now</TextView>
                </TouchableOpacity>
              )}

              {/* Google Sign-In Status */}
              {isGoogleSignedIn && (
                <NView style={styles.googleStatusContainer}>
                  <TextView style={styles.googleStatusText}>
                    ✅ Signed in with Google (
                    {googleSignIn.user?.email || user?.email})
                  </TextView>
                </NView>
              )}
            </LinearGradient>

            {/* Carousel */}
            <Carousel data={carouselData} />

            {/* Glass Icons */}
            <GlassIcons items={shortcutItems} onPress={handleShortcutPress} />

            {/* Suggested Courses */}
            <NView style={styles.section}>
              <TextView style={styles.sectionTitle}>Suggested for You</TextView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.coursesContainer}
              >
                {suggestedCourses.map(renderCourseCard)}
              </ScrollView>
            </NView>

            {/* Popular Courses */}
            <NView style={styles.section}>
              <TextView style={styles.sectionTitle}>Popular Courses</TextView>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.popularCoursesContainer}
              >
                {popularCourses.map(renderPopularCourse)}
              </ScrollView>
            </NView>

            {/* Upcoming Features */}
            <NView style={styles.section}>
              <TextView style={styles.sectionTitle}>Coming Soon</TextView>
              <NView style={styles.upcomingFeaturesContainer}>
                {upcomingFeatures.map((feature, index) => (
                  <AnimatedCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                ))}
              </NView>
            </NView>
          </Animated.View>
        </Animated.ScrollView>

        {/* Custom Modal */}
        <CustomModal
          visible={modalState.visible}
          onClose={hideModal}
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
          buttons={modalState.buttons}
          showCloseButton={modalState.showCloseButton}
          onBackdropPress={modalState.onBackdropPress}
        />
      </NView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.SMALL,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: SPACING.NORMAL,
    borderRadius: 12,
    marginBottom: SPACING.NORMAL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XXS,
  },
  welcomeSubtitle: {
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.NORMAL,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: SPACING.XXS,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.BORDER_COLOR,
    opacity: 0.4,
  },
  section: {
    marginBottom: SPACING.NORMAL,
  },
  sectionTitle: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.SMALL,
  },
  coursesContainer: {
    paddingLeft: SPACING.SMALL,
    paddingRight: SPACING.SMALL,
  },
  courseCard: {
    width: 140,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: SPACING.SMALL,
    marginRight: SPACING.SMALL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  courseImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.PRIMARY_LIGHT,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.SMALL,
    position: 'relative',
  },
  courseEmoji: {
    fontSize: 24,
  },
  durationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  durationText: {
    fontSize: fontSizes.xxs,
    color: COLORS.WHITE,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  courseSubtitle: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
  },
  popularCoursesContainer: {
    paddingLeft: SPACING.SMALL,
    paddingRight: SPACING.SMALL,
  },
  popularCourseCard: {
    width: 180,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    padding: SPACING.SMALL,
    marginRight: SPACING.SMALL,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  popularCourseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.XXS,
  },
  popularCourseEmoji: {
    fontSize: 28,
  },
  ratingContainer: {
    backgroundColor: COLORS.PRIMARY_LIGHT,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: fontSizes.xxs,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  popularCourseTitle: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  popularCourseInstructor: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 2,
  },
  popularCourseStudents: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
  },
  upcomingFeaturesContainer: {
    gap: SPACING.SMALL,
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
  permissionButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.XXS,
    paddingHorizontal: SPACING.SMALL,
    borderRadius: 8,
    marginBottom: SPACING.SMALL,
    alignSelf: 'center',
  },
  permissionButtonText: {
    fontSize: fontSizes.xxs,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  statSource: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
    marginTop: 2,
  },
  syncButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.XXS,
    paddingHorizontal: SPACING.SMALL,
    borderRadius: 8,
    marginTop: SPACING.SMALL,
    alignSelf: 'center',
  },
  syncButtonText: {
    fontSize: fontSizes.xxs,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  googleSignInButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: SPACING.XXS,
    paddingHorizontal: SPACING.SMALL,
    borderRadius: 8,
    marginBottom: SPACING.SMALL,
    alignSelf: 'center',
  },
  googleSignInButtonText: {
    fontSize: fontSizes.xxs,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  googleStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.SMALL,
  },
  googleStatusText: {
    fontSize: fontSizes.xxs,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '500',
  },
});

export default Home;
