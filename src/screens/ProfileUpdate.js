import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
  View,
  Text,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, SPACING, fontSizes } from '../config/Theme/Theme';
import Header from '../Components/ShareComponents/Header';
import NMIcon from '../Components/ShareComponents/NIcon';
import { NView } from '../Components/ShareComponents/NView';
import TextView from '../Components/ShareComponents/TextView';
import { TouchableOpacity } from '../Components/ShareComponents/TouchableOpacity';
import CustomModal from '../Components/ShareComponents/CustomModal';
import useCustomModal from '../hooks/useCustomModal';
import useProfileImage from '../hooks/useProfileImage';
import { updateProfile } from '../redux/Reducers/userSlice';
import GLOBAL from '../global/global';

const ProfileUpdate = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);
  const scrollY = new Animated.Value(0);

  // Profile image hook
  const {
    currentImage,
    hasProfileImage,
    showImagePicker,
    showRemoveConfirmation,
    selectFromGallery,
    takePhoto,
    removeImage,
  } = useProfileImage();

  // Custom modal hook
  const { modalState, showError, showSuccess, hideModal, showConfirm } =
    useCustomModal();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    address: '',
    phone: '',
    email: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Load existing profile data
    setFormData({
      name: profile.name || '',
      age: profile.age ? profile.age.toString() : '',
      height: profile.height ? profile.height.toString() : '',
      weight: profile.weight ? profile.weight.toString() : '',
      address: profile.address || '',
      phone: profile.phone || '',
      email: profile.email || '',
    });
  }, [profile]);

  // Email validation function
  const validateEmail = email => {
    if (!email.trim()) {
      return { isValid: false, error: 'Email is required' };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      return { isValid: false, error: 'Invalid email format' };
    }

    if (email.length > 254) {
      return { isValid: false, error: 'Email is too long' };
    }

    if (email.split('@')[0].length > 64) {
      return { isValid: false, error: 'Username is too long' };
    }

    return { isValid: true, error: null };
  };

  // Handle email input with real-time validation
  const handleEmailChange = text => {
    setFormData({ ...formData, email: text });

    // Real-time email validation commented out
    // if (text.trim()) {
    //   const validation = validateEmail(text);
    //   setValidationErrors(prev => ({
    //     ...prev,
    //     email: validation.isValid ? null : validation.error,
    //   }));
    // } else {
    //   setValidationErrors(prev => ({
    //     ...prev,
    //     email: null,
    //   }));
    // }
  };

  // Handle image picker with custom modal
  const handleImagePicker = () => {
    showError(
      'Update Profile Photo',
      'Choose an option to update your profile photo',
      [
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            const result = await selectFromGallery();
            if (result.success) {
              showSuccess('Success', 'Profile photo updated successfully!');
            }
          },
        },
        {
          text: 'Take Photo',
          onPress: async () => {
            const result = await takePhoto();
            if (result.success) {
              showSuccess('Success', 'Profile photo updated successfully!');
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  // Handle remove profile photo
  const handleRemovePhoto = async () => {
    const result = await removeImage();
    if (result.success) {
      showSuccess('Success', 'Profile photo removed successfully!');
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.name.trim()) {
      showError('Error', 'Please enter your name');
      return;
    }

    // Email validation commented out - allowing any email format
    // const emailValidation = validateEmail(formData.email);
    // if (!emailValidation.isValid) {
    //   showError('Error', emailValidation.error);
    //   return;
    // }

    // Phone validation (basic)
    if (formData.phone && formData.phone.length < 10) {
      showError('Error', 'Please enter a valid phone number');
      return;
    }

    const updatedProfile = {
      name: formData.name.trim(),
      age: parseInt(formData.age) || 0,
      height: parseFloat(formData.height) || 0,
      weight: parseFloat(formData.weight) || 0,
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(), // Allow any email format
      // Note: avatar is handled by the useProfileImage hook
    };

    dispatch(updateProfile(updatedProfile));
    showSuccess('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Update Profile" showMenu={false} scrollY={scrollY} />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Animated.ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.formContainer}>
            {/* Profile Photo Section */}
            <View style={styles.photoSection}>
              <Text style={styles.sectionTitle}>Profile Photo</Text>
              <View style={styles.photoContainer}>
                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={handleImagePicker}
                  activeOpacity={0.8}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  {hasProfileImage() && currentImage?.uri ? (
                    <Image
                      source={{ uri: currentImage.uri }}
                      style={styles.profilePhoto}
                    />
                  ) : (
                    <View style={styles.placeholderPhoto}>
                      <NMIcon
                        name="account-circle"
                        size={60}
                        color={COLORS.TEXT_SECONDARY}
                      />
                    </View>
                  )}
                  <View style={styles.photoOverlay}>
                    <NMIcon name="camera" size={20} color={COLORS.WHITE} />
                  </View>
                </TouchableOpacity>

                <View style={styles.photoActions}>
                  <TouchableOpacity
                    style={styles.photoActionText}
                    onPress={handleImagePicker}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.photoActionText}>Upload</Text>
                  </TouchableOpacity>

                  {hasProfileImage() && (
                    <TouchableOpacity
                      style={styles.photoActionText}
                      onPress={handleRemovePhoto}
                      activeOpacity={0.7}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.photoActionText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>

            {/* Personal Information Section */}
            <View style={styles.personalInfoSection}>
              <Text style={styles.sectionTitle}>Personal Information</Text>

              {/* Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={text =>
                    setFormData({ ...formData, name: text })
                  }
                  placeholder="Enter your full name"
                  placeholderTextColor={COLORS.TEXT_SECONDARY}
                  returnKeyType="next"
                />
              </View>

              {/* Age, Height, Weight Row */}
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Age</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.age}
                    onChangeText={text =>
                      setFormData({ ...formData, age: text })
                    }
                    placeholder="Age"
                    placeholderTextColor={COLORS.TEXT_SECONDARY}
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                </View>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Text style={styles.label}>Height (cm)</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.height}
                    onChangeText={text =>
                      setFormData({ ...formData, height: text })
                    }
                    placeholder="Height"
                    placeholderTextColor={COLORS.TEXT_SECONDARY}
                    keyboardType="numeric"
                    returnKeyType="next"
                  />
                </View>
              </View>

              {/* Weight */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={formData.weight}
                  onChangeText={text =>
                    setFormData({ ...formData, weight: text })
                  }
                  placeholder="Weight in kg"
                  placeholderTextColor={COLORS.TEXT_SECONDARY}
                  keyboardType="numeric"
                  returnKeyType="next"
                />
              </View>

              {/* Address */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.address}
                  onChangeText={text =>
                    setFormData({ ...formData, address: text })
                  }
                  placeholder="Enter your address"
                  placeholderTextColor={COLORS.TEXT_SECONDARY}
                  multiline
                  numberOfLines={3}
                  returnKeyType="next"
                />
              </View>

              {/* Phone */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={formData.phone}
                  onChangeText={text =>
                    setFormData({ ...formData, phone: text })
                  }
                  placeholder="Enter phone number"
                  placeholderTextColor={COLORS.TEXT_SECONDARY}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                />
              </View>

              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={handleEmailChange}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.TEXT_SECONDARY}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                />
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>

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
  formContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: SPACING.LARGE,
    marginVertical: SPACING.NORMAL,
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
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.LARGE,
  },
  inputContainer: {
    marginBottom: SPACING.NORMAL,
  },
  label: {
    fontSize: fontSizes.h5,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: SPACING.XXS,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: SPACING.NORMAL,
    paddingVertical: SPACING.NORMAL,
    fontSize: fontSizes.h5,
    color: COLORS.TEXT_PRIMARY,
    backgroundColor: COLORS.WHITE,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SPACING.LARGE,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: SPACING.NORMAL,
    paddingHorizontal: SPACING.LARGE,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    marginRight: SPACING.SMALL,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fontSizes.h5,
    fontWeight: '600',
    color: COLORS.PRIMARY,
  },
  saveButton: {
    flex: 1,
    paddingVertical: SPACING.NORMAL,
    paddingHorizontal: SPACING.LARGE,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 12,
    marginLeft: SPACING.SMALL,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: fontSizes.h5,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  photoSection: {
    marginBottom: SPACING.LARGE,
    paddingBottom: SPACING.LARGE,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_COLOR,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.NORMAL,
  },
  photoButton: {
    position: 'relative',
    marginBottom: SPACING.NORMAL,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  placeholderPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.PRIMARY,
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.LARGE,
  },
  photoActionText: {
    fontSize: fontSizes.h5,
    fontWeight: '600',
    color: COLORS.PRIMARY,
    textDecorationLine: 'underline',
  },
  personalInfoSection: {
    marginTop: SPACING.LARGE,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inputError: {
    borderColor: COLORS.ERROR,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: fontSizes.h5,
    marginTop: SPACING.XXS,
  },
});

export default ProfileUpdate;
