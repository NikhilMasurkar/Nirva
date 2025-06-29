import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import NMIcon from '../ShareComponents/NIcon';
import CustomModal from '../ShareComponents/CustomModal';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import { DRAWER_ITEMS_DATA } from './helper';
import { navigate } from '../../NavigationUtils';
import { NView } from '../ShareComponents/NView';
import TextView from '../ShareComponents/TextView';
import { TouchableOpacity } from '../ShareComponents/TouchableOpacity';
import useProfileImage from '../../hooks/useProfileImage';
import useCustomModal from '../../hooks/useCustomModal';
import { GLOBAL } from '../../global';
import { NScrollView } from '../ShareComponents/NScrollView';
import LinearGradient from 'react-native-linear-gradient';

const DrawerComponent = React.memo(() => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const userProfile = useSelector(state => state.user.profile);

  // Profile image hook
  const { hasProfileImage, currentImage, selectFromGallery } =
    useProfileImage();

  // Custom modal hook
  const { modalState, showSuccess, showError, hideModal } = useCustomModal();

  const toggleSubmenu = useCallback(index => {
    setExpandedMenus(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const handleEditProfile = useCallback(() => {
    navigate(GLOBAL.PAGE.PROFILE_UPDATE);
  }, []);

  const handlePhotoUpload = useCallback(async () => {
    try {
      const result = await selectFromGallery();
      if (result.success) {
        showSuccess('Success', 'Profile photo updated successfully!');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      showError('Error', 'Failed to upload photo. Please try again.');
    }
  }, [selectFromGallery, showSuccess, showError]);

  const handleMenuPress = useCallback(
    (item, index) => {
      if (item.subMenu?.length > 0) {
        toggleSubmenu(index);
      } else if (item.navigation) {
        navigate(item.navigation);
      }
    },
    [toggleSubmenu],
  );

  const handleSubMenuPress = useCallback(subItem => {
    if (subItem.navigation) {
      navigate(subItem.navigation);
    }
  }, []);

  const profileStats = useMemo(
    () => [
      { value: userProfile.age || 0, label: 'Age' },
      { value: `${userProfile.weight || 0}kg`, label: 'Weight' },
      { value: `${userProfile.height || 0}cm`, label: 'Height' },
    ],
    [userProfile.age, userProfile.weight, userProfile.height],
  );

  const renderMenuItem = useCallback(
    (item, index) => (
      <NView key={index} style={styles.menuItemContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleMenuPress(item, index)}
          activeOpacity={0.7}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          <NView
            style={[
              styles.iconContainer,
              { backgroundColor: item.color + '15' },
            ]}
          >
            <NMIcon name={item.icon} size={20} color={item.color} />
          </NView>
          <TextView style={styles.menuText}>{item.name}</TextView>
          {item.subMenu?.length > 0 && (
            <NMIcon
              name={expandedMenus[index] ? 'chevron-down' : 'chevron-right'}
              size={16}
              color={COLORS.TEXT_SECONDARY}
            />
          )}
        </TouchableOpacity>

        {expandedMenus[index] && item.subMenu?.length > 0 && (
          <NView style={styles.subMenuContainer}>
            {item.subMenu.map((subItem, subIndex) => (
              <TouchableOpacity
                key={subIndex}
                style={[
                  styles.subMenuItem,
                  subIndex === item.subMenu.length - 1 &&
                    styles.lastSubMenuItem,
                ]}
                onPress={() => handleSubMenuPress(subItem)}
                activeOpacity={0.7}
                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              >
                <NMIcon
                  name={subItem.icon}
                  size={16}
                  color={subItem.color}
                  style={styles.subMenuIcon}
                />
                <TextView style={styles.subMenuText}>{subItem.name}</TextView>
              </TouchableOpacity>
            ))}
          </NView>
        )}
      </NView>
    ),
    [expandedMenus, handleMenuPress, handleSubMenuPress],
  );

  const renderProfileStats = useCallback(
    () => (
      <NView style={styles.statsContainer}>
        {profileStats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <NView style={styles.statItem}>
              <TextView style={styles.statNumber}>{stat.value}</TextView>
              <TextView style={styles.statLabel}>{stat.label}</TextView>
            </NView>
            {index < profileStats.length - 1 && (
              <NView style={styles.statDivider} />
            )}
          </React.Fragment>
        ))}
      </NView>
    ),
    [profileStats],
  );

  return (
    <NView style={styles.container}>
      <NScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.profileSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <NView style={styles.profileImageContainer}>
            <TouchableOpacity
              onPress={handlePhotoUpload}
              style={styles.profileImageWrapper}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <NView style={styles.profileImageBorder}>
                {hasProfileImage() && currentImage?.uri ? (
                  <Image
                    source={{ uri: currentImage.uri }}
                    style={styles.profileImage}
                  />
                ) : (
                  <TextView style={styles.profileEmoji}>👤</TextView>
                )}
              </NView>
              <NView style={styles.editIconContainer}>
                <NMIcon name="camera" size={12} color={COLORS.WHITE} />
              </NView>
            </TouchableOpacity>
            <NView style={styles.onlineIndicator} />
          </NView>

          <TextView style={styles.profileName}>{userProfile.name}</TextView>
          {renderProfileStats()}

          <NView style={styles.progressContainer}>
            <NView style={styles.progressBar}>
              <NView style={[styles.progressFill, { width: '65%' }]} />
            </NView>
            <TextView style={styles.progressText}>65% to Level 3</TextView>
          </NView>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <NMIcon name="pencil" size={16} color={COLORS.WHITE} />
            <TextView style={styles.editProfileText}>Edit Profile</TextView>
          </TouchableOpacity>
        </LinearGradient>

        <NView>{DRAWER_ITEMS_DATA.map(renderMenuItem)}</NView>
      </NScrollView>

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
  );
});

DrawerComponent.displayName = 'DrawerComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: SPACING.LARGE,
    paddingHorizontal: SPACING.NORMAL,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SPACING.SMALL,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImageBorder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  profileEmoji: {
    fontSize: 40,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  profileName: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: SPACING.SMALL,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.SMALL,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.NORMAL,
  },
  statNumber: {
    fontSize: fontSizes.h4,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSizes.xxs,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: SPACING.XXS,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSizes.xxs,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.LARGE,
    paddingVertical: SPACING.NORMAL,
    marginHorizontal: SPACING.NORMAL,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: COLORS.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 126, 234, 0.15)',
  },
  subMenuItem: {
    marginLeft: SPACING.LARGE * 2,
    marginRight: SPACING.NORMAL,
    paddingVertical: SPACING.NORMAL,
    paddingHorizontal: SPACING.NORMAL,

    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 126, 234, 0.1)',
  },
  subMenuContainer: {
    paddingBottom: SPACING.NORMAL,
    backgroundColor: 'rgba(102, 126, 234, 0.02)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(102, 126, 234, 0.1)',
    marginTop: SPACING.SMALL,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.NORMAL,
  },
  menuText: {
    flex: 1,
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_PRIMARY,
    fontWeight: '600',
  },
  subMenuText: {
    flex: 1,
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '400',
  },
  subMenuIcon: {
    marginRight: SPACING.NORMAL,
  },
  menuItemContainer: {
    // Add any necessary styles for the menu item container
  },
  menuItemBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(102, 126, 234, 0.15)',
  },
  lastSubMenuItem: {
    borderBottomWidth: 0,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.XXS,
    paddingHorizontal: SPACING.SMALL,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    marginTop: SPACING.SMALL,
  },
  editProfileText: {
    fontSize: fontSizes.xxs,
    fontWeight: '600',
    color: COLORS.WHITE,
    marginLeft: SPACING.XXS,
  },
});

export default DrawerComponent;
