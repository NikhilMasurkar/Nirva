import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/Reducers/userSlice';
import ProfileImageService from '../services/ProfileImageService';
import useCustomModal from './useCustomModal';

const useProfileImage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);
  const { showError, showSuccess, showConfirm } = useCustomModal();

  // Get current profile image
  const currentImage = profile.avatar;

  // Select image from gallery
  const selectFromGallery = useCallback(async () => {
    try {
      const result = await ProfileImageService.selectFromGallery();

      if (result.success) {
        // Clean up old images
        await ProfileImageService.cleanupOldImages(result.image);

        // Update Redux state
        dispatch(updateProfile({ avatar: result.image }));

        return { success: true, image: result.image };
      } else {
        showError('Error', result.error || 'Failed to select image');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      showError('Error', 'Failed to select image from gallery');
      return { success: false, error: error.message };
    }
  }, [dispatch, showError]);

  // Take photo with camera
  const takePhoto = useCallback(async () => {
    try {
      const result = await ProfileImageService.takePhoto();

      if (result.success) {
        // Clean up old images
        await ProfileImageService.cleanupOldImages(result.image);

        // Update Redux state
        dispatch(updateProfile({ avatar: result.image }));

        return { success: true, image: result.image };
      } else {
        showError('Error', result.error || 'Failed to take photo');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      showError('Error', 'Failed to take photo');
      return { success: false, error: error.message };
    }
  }, [dispatch, showError]);

  // Remove profile image
  const removeImage = useCallback(async () => {
    try {
      // Remove from cache
      await ProfileImageService.removeImageFromCache(currentImage);

      // Update Redux state
      dispatch(updateProfile({ avatar: null }));

      return { success: true };
    } catch (error) {
      console.error('Error removing image:', error);
      showError('Error', 'Failed to remove image');
      return { success: false, error: error.message };
    }
  }, [dispatch, currentImage, showError]);

  // Show image picker options
  const showImagePicker = useCallback(() => {
    showConfirm(
      'Update Profile Photo',
      'Choose an option',
      () => {
        // This will be handled by the component using the hook
        // The component should call takePhoto or selectFromGallery
      },
      () => {
        // Cancel action
      },
    );
  }, [showConfirm]);

  // Show remove image confirmation
  const showRemoveConfirmation = useCallback(() => {
    showConfirm(
      'Remove Profile Photo',
      'Are you sure you want to remove your profile photo?',
      removeImage,
      () => {
        // Cancel action
      },
    );
  }, [removeImage, showConfirm]);

  // Update profile image (unified method)
  const updateProfileImage = useCallback(
    async imageData => {
      try {
        if (!imageData) {
          return await removeImage();
        }

        // Validate image
        const validation = ProfileImageService.validateImage(imageData);
        if (!validation.valid) {
          showError('Error', validation.error);
          return { success: false, error: validation.error };
        }

        // Save to cache
        const savedImage = await ProfileImageService.saveImageToCache(
          imageData.uri,
          imageData.type,
          imageData.name,
        );

        // Clean up old images
        await ProfileImageService.cleanupOldImages(savedImage);

        // Update Redux state
        dispatch(updateProfile({ avatar: savedImage }));

        return { success: true, image: savedImage };
      } catch (error) {
        console.error('Error updating profile image:', error);
        showError('Error', 'Failed to update profile image');
        return { success: false, error: error.message };
      }
    },
    [dispatch, removeImage, showError],
  );

  // Get image display info
  const getImageInfo = useCallback(() => {
    return ProfileImageService.getImageInfo(currentImage);
  }, [currentImage]);

  // Check if user has profile image
  const hasProfileImage = useCallback(() => {
    return !!(
      currentImage &&
      currentImage.uri &&
      currentImage.uri.trim() !== ''
    );
  }, [currentImage]);

  return {
    // State
    currentImage,
    hasProfileImage: hasProfileImage,
    imageInfo: getImageInfo,

    // Actions
    selectFromGallery,
    takePhoto,
    removeImage,
    showImagePicker,
    showRemoveConfirmation,
    updateProfileImage,
  };
};

export default useProfileImage;
