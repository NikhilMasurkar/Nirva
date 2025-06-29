import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NMIcon from '../Components/ShareComponents/NIcon';
import Header from '../Components/ShareComponents/Header';
import { updateProfile } from '../redux/Reducers/userSlice';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';

const Profile = () => {
  const { profile } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const profileOptions = [
    { title: 'Personal Information', icon: 'account-edit', onPress: () => {} },
    { title: 'Fitness Goals', icon: 'target', onPress: () => {} },
    { title: 'Notifications', icon: 'bell', onPress: () => {} },
    { title: 'Privacy Settings', icon: 'shield-account', onPress: () => {} },
    { title: 'Help & Support', icon: 'help-circle', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Header title="Profile" showMenu={false} />
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <NMIcon name="account-circle" size={80} color={COLORS.PRIMARY} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.subtitle}>Wellness Enthusiast</Text>
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

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>
            Profile Features Coming Soon!
          </Text>
          <Text style={styles.comingSoonDesc}>
            We're working on adding more personalization options.
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.LARGE,
  },
  avatarContainer: {
    marginBottom: SPACING.NORMAL,
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
