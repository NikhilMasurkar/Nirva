import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NMIcon from '../ShareComponents/NIcon';
import { COLORS, SPACING, fontSizes } from '../../config/Theme/Theme';
import { DRAWER_ITEMS_DATA } from './helper';
import { navigate } from '../../NavigationUtils';

const DrawerComponent = () => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleSubmenu = index => {
    setExpandedMenus(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderMenuItem = (item, index, isSubItem = false) => (
    <TouchableOpacity
      key={index}
      style={[styles.menuItem, isSubItem && styles.subMenuItem]}
      onPress={() => {
        if (item.subMenu && item.subMenu.length > 0) {
          toggleSubmenu(index);
        }
        navigate(item.navigation);
      }}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: item.color + '15' },
          isSubItem && styles.subMenuIconContainer,
        ]}
      >
        <NMIcon
          name={item.icon}
          size={isSubItem ? 16 : 20}
          color={item.color}
        />
      </View>
      <Text style={[styles.menuText, isSubItem && styles.subMenuText]}>
        {item.name}
      </Text>
      {item.subMenu && item.subMenu.length > 0 && (
        <NMIcon
          name={expandedMenus[index] ? 'chevron-down' : 'chevron-right'}
          size={16}
          color={COLORS.TEXT_SECONDARY}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Modern Profile Section */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.profileSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImageBorder}>
              <Text style={styles.profileEmoji}>👤</Text>
            </View>
            <View style={styles.onlineIndicator} />
          </View>

          <Text style={styles.profileName}>Cara</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,208</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Level 2</Text>
              <Text style={styles.statLabel}>Achievement</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% to Level 3</Text>
          </View>
        </LinearGradient>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {DRAWER_ITEMS_DATA.map((item, index) => (
            <View key={index}>
              {renderMenuItem(item, index)}
              {expandedMenus[index] &&
                item.subMenu &&
                item.subMenu.length > 0 && (
                  <View style={styles.subMenuContainer}>
                    {item.subMenu.map((subItem, subIndex) =>
                      renderMenuItem(subItem, `${index}-${subIndex}`, true),
                    )}
                  </View>
                )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

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
    paddingVertical: SPACING.LARGE * 2,
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
    marginBottom: SPACING.NORMAL,
  },
  profileImageBorder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileEmoji: {
    fontSize: 45,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: COLORS.WHITE,
  },
  profileName: {
    fontSize: fontSizes.h1,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: SPACING.NORMAL,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.NORMAL,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.LARGE,
  },
  statNumber: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSizes.small,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 6,
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
    fontSize: fontSizes.small,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  menuSection: {
    paddingVertical: SPACING.NORMAL,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  subMenuItem: {
    marginLeft: SPACING.LARGE * 2,
    marginRight: SPACING.NORMAL,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    borderLeftWidth: 3,
    borderLeftColor: '#667eea',
    borderRadius: 8,
    paddingVertical: SPACING.SMALL,
    marginVertical: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  subMenuContainer: {
    marginTop: 4,
    marginBottom: 8,
    paddingLeft: SPACING.NORMAL,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(102, 126, 234, 0.2)',
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
    fontSize: fontSizes.small,
    color: COLORS.TEXT_SECONDARY,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  subMenuIconContainer: {
    width: 35,
    height: 35,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
});

export default DrawerComponent;
