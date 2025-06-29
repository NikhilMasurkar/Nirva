import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

class ProfileImageService {
  // Image picker options
  static imagePickerOptions = {
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 512,
    maxHeight: 512,
    includeBase64: false,
    saveToPhotos: false,
  };

  // Get cache directory for profile photos
  static getCacheDirectory() {
    const baseDir =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath
        : RNFS.CachesDirectoryPath;
    return `${baseDir}/profile_photos`;
  }

  // Ensure cache directory exists
  static async ensureCacheDirectory() {
    try {
      const cacheDir = this.getCacheDirectory();
      const exists = await RNFS.exists(cacheDir);
      if (!exists) {
        await RNFS.mkdir(cacheDir);
      }
      return cacheDir;
    } catch (error) {
      console.error('Error creating cache directory:', error);
      throw error;
    }
  }

  // Generate unique filename
  static generateFilename() {
    const timestamp = new Date().getTime();
    return `profile_${timestamp}.jpg`;
  }

  // Save image to cache and return file info
  static async saveImageToCache(
    imageUri,
    imageType = 'image/jpeg',
    originalName = null,
  ) {
    try {
      const cacheDir = await this.ensureCacheDirectory();
      const filename = this.generateFilename();
      const filepath = `${cacheDir}/${filename}`;

      // Copy image to cache
      await RNFS.copyFile(imageUri, filepath);

      return {
        uri: Platform.OS === 'ios' ? filepath : `file://${filepath}`,
        type: imageType,
        name: originalName || filename,
        path: filepath,
      };
    } catch (error) {
      console.error('Error saving image to cache:', error);
      throw error;
    }
  }

  // Select image from gallery
  static async selectFromGallery() {
    try {
      const result = await launchImageLibrary(this.imagePickerOptions);

      if (result.assets && result.assets[0]) {
        const selectedImage = result.assets[0];
        const savedImage = await this.saveImageToCache(
          selectedImage.uri,
          selectedImage.type,
          selectedImage.fileName,
        );
        return { success: true, image: savedImage };
      } else {
        return { success: false, error: 'No image selected' };
      }
    } catch (error) {
      console.error('Error selecting image from gallery:', error);
      return { success: false, error: error.message };
    }
  }

  // Take photo with camera
  static async takePhoto() {
    try {
      const result = await launchCamera(this.imagePickerOptions);

      if (result.assets && result.assets[0]) {
        const capturedImage = result.assets[0];
        const savedImage = await this.saveImageToCache(
          capturedImage.uri,
          capturedImage.type,
          capturedImage.fileName,
        );
        return { success: true, image: savedImage };
      } else {
        return { success: false, error: 'No photo captured' };
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      return { success: false, error: error.message };
    }
  }

  // Remove profile image from cache
  static async removeImageFromCache(imageUri) {
    try {
      if (imageUri && imageUri.uri) {
        const filepath = imageUri.uri.replace('file://', '');
        const exists = await RNFS.exists(filepath);
        if (exists) {
          await RNFS.unlink(filepath);
        }
      }
    } catch (error) {
      console.error('Error removing image from cache:', error);
      // Don't throw error as this is cleanup operation
    }
  }

  // Clean up old profile images (keep only the latest)
  static async cleanupOldImages(currentImageUri) {
    try {
      const cacheDir = await this.ensureCacheDirectory();
      const files = await RNFS.readDir(cacheDir);

      for (const file of files) {
        if (file.isFile() && file.name.startsWith('profile_')) {
          const filepath = `${cacheDir}/${file.name}`;
          const currentPath = currentImageUri?.uri?.replace('file://', '');

          // Don't delete the current image
          if (filepath !== currentPath) {
            await RNFS.unlink(filepath);
          }
        }
      }
    } catch (error) {
      console.error('Error cleaning up old images:', error);
      // Don't throw error as this is cleanup operation
    }
  }

  // Get image picker options for different use cases
  static getImagePickerOptions(customOptions = {}) {
    return {
      ...this.imagePickerOptions,
      ...customOptions,
    };
  }

  // Validate image file
  static validateImage(image) {
    if (!image || !image.uri) {
      return { valid: false, error: 'Invalid image data' };
    }

    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (image.type && !supportedTypes.includes(image.type.toLowerCase())) {
      return { valid: false, error: 'Unsupported image format' };
    }

    return { valid: true };
  }

  // Get image info for display
  static getImageInfo(image) {
    if (!image) return null;

    return {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.name || 'profile_photo.jpg',
      path: image.path || image.uri,
    };
  }
}

export default ProfileImageService;
