import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import NMIcon from '../Components/ShareComponents/NIcon';
import Header from '../Components/ShareComponents/Header';
import CustomModal from '../Components/ShareComponents/CustomModal';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import GLOBAL from '../global/global';
import SignOutButton from '../Components/ShareComponents/SignOutButton';
import { useSignOut } from '../hooks/useSignOut';
import useProfileImage from '../hooks/useProfileImage';
import useCustomModal from '../hooks/useCustomModal';

const Profile = () => {
  const { profile, googleSignIn } = useSelector(state => state.user);
  const navigation = useNavigation();
  const { signOut, resetAppData } = useSignOut();
  const scrollY = new Animated.Value(0);

  // Profile image hook
  const { hasProfileImage, currentImage } = useProfileImage();

  // Custom modal hook
  const { modalState, showError, showSuccess, showConfirm, hideModal } =
    useCustomModal();

  const profileOptions = [
    {
      title: 'Personal Information',
      icon: 'account-edit',
      onPress: () => navigation.navigate(GLOBAL.PAGE.PROFILE_UPDATE),
    },
    { title: 'Fitness Goals', icon: 'target', onPress: () => {} },
    { title: 'Notifications', icon: 'bell', onPress: () => {} },
    { title: 'Privacy Settings', icon: 'shield-account', onPress: () => {} },
    { title: 'Help & Support', icon: 'help-circle', onPress: () => {} },
  ];

  const handleSignOutOptions = () => {
    showConfirm(
      'Sign Out Options',
      'Choose how you want to sign out:',
      () => {
        // This will be handled by the buttons in the modal
      },
      () => {
        // Cancel action
      },
    );
  };

  const handleSignOutKeepData = async () => {
    try {
      const result = await signOut({ resetAllData: false });
      if (!result.success) {
        showError('Error', result.error || 'Sign-out failed');
      }
    } catch (error) {
      showError('Error', 'Something went wrong during sign-out');
    }
  };

  const handleSignOutResetAll = async () => {
    try {
      const result = await signOut({ resetAllData: true });
      if (!result.success) {
        showError('Error', result.error || 'Sign-out failed');
      }
    } catch (error) {
      showError('Error', 'Something went wrong during sign-out');
    }
  };

  const handleResetData = () => {
    showConfirm(
      'Reset App Data',
      'This will reset all your app data but keep you signed in. This action cannot be undone.',
      async () => {
        try {
          const result = await resetAppData();
          if (result.success) {
            showSuccess('Success', 'App data has been reset successfully.');
          } else {
            showError('Error', result.error || 'Failed to reset data.');
          }
        } catch (error) {
          showError('Error', 'Something went wrong while resetting data.');
        }
      },
      () => {
        // Cancel action
      },
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Profile" showMenu={false} scrollY={scrollY} />
      <Animated.ScrollView
        style={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {hasProfileImage() && currentImage?.uri ? (
              <Image source={{ uri: currentImage.uri }} style={styles.avatar} />
            ) : (
              <NMIcon name="account-circle" size={80} color={COLORS.PRIMARY} />
            )}
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.subtitle}>Wellness Enthusiast</Text>
          {googleSignIn.isSignedIn && (
            <Text style={styles.googleUser}>
              Signed in with Google ({googleSignIn.user?.email})
            </Text>
          )}
        </View>

        <View style={styles.optionsContainer}>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <View style={styles.optionLeft}>
                <NMIcon name={option.icon} size={24} color={COLORS.PRIMARY} />
                <Text style={styles.optionTitle}>{option.title}</Text>
              </View>
              <NMIcon
                name="chevron-right"
                size={24}
                color={COLORS.TEXT_SECONDARY}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Management Section */}
        <View style={styles.accountSection}>
          <Text style={styles.sectionTitle}>Account Management</Text>

          <TouchableOpacity style={styles.optionItem} onPress={handleResetData}>
            <View style={styles.optionLeft}>
              <NMIcon name="refresh" size={24} color={COLORS.WARNING} />
              <Text style={styles.optionTitle}>Reset App Data</Text>
            </View>
            <NMIcon
              name="chevron-right"
              size={24}
              color={COLORS.TEXT_SECONDARY}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleSignOutOptions}
          >
            <View style={styles.optionLeft}>
              <NMIcon name="logout" size={24} color={COLORS.DANGER} />
              <Text style={[styles.optionTitle, styles.signOutText]}>
                Sign Out
              </Text>
            </View>
            <NMIcon
              name="chevron-right"
              size={24}
              color={COLORS.TEXT_SECONDARY}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>
            Profile Features Coming Soon!
          </Text>
          <Text style={styles.comingSoonDesc}>
            We're working on adding more personalization options.
          </Text>
        </View>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.LARGE,
  },
  avatarContainer: {
    marginBottom: SPACING.NORMAL,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: fontSizes.h2,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XXS,
  },
  subtitle: {
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: SPACING.XXS,
  },
  googleUser: {
    fontSize: fontSizes.small,
    color: COLORS.PRIMARY,
    fontStyle: 'italic',
  },
  optionsContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    marginBottom: SPACING.LARGE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  accountSection: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    marginBottom: SPACING.LARGE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: fontSizes.h5,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    padding: SPACING.NORMAL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.NORMAL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_PRIMARY,
    marginLeft: SPACING.NORMAL,
  },
  signOutText: {
    color: COLORS.DANGER,
  },
  comingSoon: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.LARGE,
    alignItems: 'center',
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

export default Profile;
