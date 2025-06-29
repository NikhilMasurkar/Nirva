import React from 'react';
import {
  StyleSheet,
  Modal,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../config/Theme/Theme';
import NMIcon from './NIcon';
import { NView } from './NView';
import TextView from './TextView';
import { TouchableOpacity } from './TouchableOpacity';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CustomModal = ({
  visible,
  onClose,
  title,
  message,
  type = 'info', // 'info', 'success', 'warning', 'error', 'confirm'
  buttons = [],
  showCloseButton = true,
  animationType = 'slide',
  transparent = true,
  onBackdropPress,
}) => {
  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
  const backdropAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      StatusBar.setBarStyle('dark-content');

      // Reset animations to initial state
      slideAnim.setValue(screenHeight);
      backdropAnim.setValue(0);

      // Start backdrop fade in
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Start slide up animation with delay
      setTimeout(() => {
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }).start();
      }, 50);
    } else {
      // Slide down first
      Animated.spring(slideAnim, {
        toValue: screenHeight,
        tension: 65,
        friction: 11,
        useNativeDriver: true,
      }).start(() => {
        // Then fade out backdrop
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [visible, slideAnim, backdropAnim]);

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: 'check-circle',
          iconColor: '#10B981',
          backgroundColor: '#ECFDF5',
          borderColor: '#10B981',
        };
      case 'warning':
        return {
          icon: 'alert-circle',
          iconColor: '#F59E0B',
          backgroundColor: '#FFFBEB',
          borderColor: '#F59E0B',
        };
      case 'error':
        return {
          icon: 'close-circle',
          iconColor: '#EF4444',
          backgroundColor: '#FEF2F2',
          borderColor: '#EF4444',
        };
      case 'confirm':
        return {
          icon: 'help-circle',
          iconColor: '#3B82F6',
          backgroundColor: '#EFF6FF',
          borderColor: '#3B82F6',
        };
      default:
        return {
          icon: 'information-outline',
          iconColor: '#3B82F6',
          backgroundColor: '#EFF6FF',
          borderColor: '#3B82F6',
        };
    }
  };

  const typeConfig = getTypeConfig();

  const handleBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress();
    } else if (showCloseButton) {
      onClose();
    }
  };

  const renderButtons = () => {
    if (buttons.length === 0) {
      return (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={onClose}
          activeOpacity={0.7}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          <TextView style={styles.primaryButtonText}>OK</TextView>
        </TouchableOpacity>
      );
    }

    // Grid layout logic
    if (buttons.length === 1) {
      return (
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() => {
            if (buttons[0].onPress) {
              buttons[0].onPress();
            }
            if (buttons[0].closeOnPress !== false) {
              onClose();
            }
          }}
          activeOpacity={0.7}
          hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        >
          <TextView style={styles.primaryButtonText}>
            {buttons[0].text}
          </TextView>
        </TouchableOpacity>
      );
    }

    if (buttons.length === 2) {
      return (
        <NView style={styles.buttonRow}>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                styles.flexButton,
                button.style === 'destructive' && styles.destructiveButton,
                button.style === 'cancel' && styles.cancelButton,
                !button.style && styles.primaryButton,
              ]}
              onPress={() => {
                if (button.onPress) {
                  button.onPress();
                }
                if (button.closeOnPress !== false) {
                  onClose();
                }
              }}
              activeOpacity={0.7}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <TextView
                style={[
                  styles.buttonText,
                  button.style === 'destructive' &&
                    styles.destructiveButtonText,
                  button.style === 'cancel' && styles.cancelButtonText,
                  !button.style && styles.primaryButtonText,
                ]}
              >
                {button.text}
              </TextView>
            </TouchableOpacity>
          ))}
        </NView>
      );
    }

    // Special case for 3 buttons (like image picker)
    if (buttons.length === 3) {
      const [firstButton, secondButton, thirdButton] = buttons;

      return (
        <NView style={styles.buttonGrid}>
          {/* First row - 2 action buttons */}
          <NView style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.flexButton,
                firstButton.style === 'destructive' && styles.destructiveButton,
                firstButton.style === 'cancel' && styles.cancelButton,
                !firstButton.style && styles.primaryButton,
              ]}
              onPress={() => {
                if (firstButton.onPress) {
                  firstButton.onPress();
                }
                if (firstButton.closeOnPress !== false) {
                  onClose();
                }
              }}
              activeOpacity={0.7}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <TextView
                style={[
                  styles.buttonText,
                  firstButton.style === 'destructive' &&
                    styles.destructiveButtonText,
                  firstButton.style === 'cancel' && styles.cancelButtonText,
                  !firstButton.style && styles.primaryButtonText,
                ]}
              >
                {firstButton.text}
              </TextView>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.flexButton,
                secondButton.style === 'destructive' &&
                  styles.destructiveButton,
                secondButton.style === 'cancel' && styles.cancelButton,
                !secondButton.style && styles.primaryButton,
              ]}
              onPress={() => {
                if (secondButton.onPress) {
                  secondButton.onPress();
                }
                if (secondButton.closeOnPress !== false) {
                  onClose();
                }
              }}
              activeOpacity={0.7}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <TextView
                style={[
                  styles.buttonText,
                  secondButton.style === 'destructive' &&
                    styles.destructiveButtonText,
                  secondButton.style === 'cancel' && styles.cancelButtonText,
                  !secondButton.style && styles.primaryButtonText,
                ]}
              >
                {secondButton.text}
              </TextView>
            </TouchableOpacity>
          </NView>

          {/* Second row - Cancel button */}
          <TouchableOpacity
            style={[
              styles.button,
              styles.fullWidthButton,
              thirdButton.style === 'destructive' && styles.destructiveButton,
              thirdButton.style === 'cancel' && styles.cancelButton,
              !thirdButton.style && styles.primaryButton,
            ]}
            onPress={() => {
              if (thirdButton.onPress) {
                thirdButton.onPress();
              }
              if (thirdButton.closeOnPress !== false) {
                onClose();
              }
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <TextView
              style={[
                styles.buttonText,
                thirdButton.style === 'destructive' &&
                  styles.destructiveButtonText,
                thirdButton.style === 'cancel' && styles.cancelButtonText,
                !thirdButton.style && styles.primaryButtonText,
              ]}
            >
              {thirdButton.text}
            </TextView>
          </TouchableOpacity>
        </NView>
      );
    }

    // 4 or more buttons - grid layout
    return (
      <NView style={styles.buttonGrid}>
        {/* First row - 2 buttons */}
        <NView style={styles.buttonRow}>
          {buttons.slice(0, 2).map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                styles.flexButton,
                button.style === 'destructive' && styles.destructiveButton,
                button.style === 'cancel' && styles.cancelButton,
                !button.style && styles.primaryButton,
              ]}
              onPress={() => {
                if (button.onPress) {
                  button.onPress();
                }
                if (button.closeOnPress !== false) {
                  onClose();
                }
              }}
              activeOpacity={0.7}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <TextView
                style={[
                  styles.buttonText,
                  button.style === 'destructive' &&
                    styles.destructiveButtonText,
                  button.style === 'cancel' && styles.cancelButtonText,
                  !button.style && styles.primaryButtonText,
                ]}
              >
                {button.text}
              </TextView>
            </TouchableOpacity>
          ))}
        </NView>

        {/* Second row - remaining buttons */}
        {buttons.slice(2).map((button, index) => (
          <TouchableOpacity
            key={index + 2}
            style={[
              styles.button,
              styles.fullWidthButton,
              button.style === 'destructive' && styles.destructiveButton,
              button.style === 'cancel' && styles.cancelButton,
              !button.style && styles.primaryButton,
            ]}
            onPress={() => {
              if (button.onPress) {
                button.onPress();
              }
              if (button.closeOnPress !== false) {
                onClose();
              }
            }}
            activeOpacity={0.7}
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
          >
            <TextView
              style={[
                styles.buttonText,
                button.style === 'destructive' && styles.destructiveButtonText,
                button.style === 'cancel' && styles.cancelButtonText,
                !button.style && styles.primaryButtonText,
              ]}
            >
              {button.text}
            </TextView>
          </TouchableOpacity>
        ))}
      </NView>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: backdropAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Handle Bar */}
            <NView style={styles.handleBar}>
              <NView style={styles.handle} />
            </NView>

            {/* Header with Icon */}
            <NView style={styles.header}>
              <NView style={styles.headerRight}>
                {title && (
                  <TextView style={styles.headerTitle}>{title}</TextView>
                )}
                {showCloseButton && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <NMIcon
                      name="close"
                      size={20}
                      color={COLORS.TEXT_SECONDARY}
                    />
                  </TouchableOpacity>
                )}
              </NView>
            </NView>

            {/* Content */}
            <NView style={styles.content}>
              {message && <TextView style={styles.message}>{message}</TextView>}
            </NView>

            {/* Buttons */}
            <NView style={styles.footer}>{renderButtons()}</NView>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: screenWidth,
    maxHeight: screenHeight * 0.75,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  handleBar: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: -0.2,
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
    fontWeight: '400',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 8,
  },
  buttonGrid: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  flexButton: {
    flex: 1,
  },
  fullWidthButton: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  primaryButtonText: {
    color: COLORS.WHITE,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  destructiveButton: {
    backgroundColor: '#EF4444',
  },
  destructiveButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
});

export default CustomModal;
