import { Platform } from 'react-native';

// Import native modules with error handling
let GoogleFit, Scopes, AppleHealthKit;

try {
  GoogleFit = require('react-native-google-fit').default;
  Scopes = require('react-native-google-fit').Scopes;
} catch (error) {
  console.warn('Google Fit module not available:', error.message);
  GoogleFit = null;
  Scopes = null;
}

try {
  AppleHealthKit = require('react-native-health').default;
} catch (error) {
  console.warn('HealthKit module not available:', error.message);
  AppleHealthKit = null;
}

class FitnessService {
  constructor() {
    this.isAuthorized = false;
    this.platform = Platform.OS;
  }

  // Initialize fitness tracking based on platform
  async initialize() {
    try {
      if (this.platform === 'android') {
        return await this.initializeGoogleFit();
      } else if (this.platform === 'ios') {
        return await this.initializeHealthKit();
      }
    } catch (error) {
      console.error('Fitness service initialization failed:', error);
      return false;
    }
  }

  // Initialize Google Fit for Android
  async initializeGoogleFit() {
    try {
      if (!GoogleFit) {
        console.log('Google Fit module not available');
        return false;
      }

      const options = {
        scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
      };

      const authResult = await GoogleFit.authorize(options);
      this.isAuthorized = authResult.success;

      if (this.isAuthorized) {
        console.log('Google Fit authorized successfully');
        return true;
      } else {
        console.log('Google Fit authorization failed');
        return false;
      }
    } catch (error) {
      console.error('Google Fit initialization error:', error);
      return false;
    }
  }

  // Initialize HealthKit for iOS
  async initializeHealthKit() {
    try {
      if (!AppleHealthKit) {
        console.log('HealthKit module not available');
        return false;
      }

      const options = {
        permissions: {
          read: [AppleHealthKit.Constants.Permissions.Steps],
          write: [],
        },
      };

      return new Promise((resolve, reject) => {
        AppleHealthKit.initHealthKit(options, (err, results) => {
          if (err) {
            console.error('HealthKit initialization error:', err);
            resolve(false);
            return;
          }

          this.isAuthorized = true;
          console.log('HealthKit initialized successfully');
          resolve(true);
        });
      });
    } catch (error) {
      console.error('HealthKit initialization error:', error);
      return false;
    }
  }

  // Get today's step count
  async getTodaySteps() {
    try {
      if (!this.isAuthorized) {
        return 0;
      }

      if (this.platform === 'android') {
        return await this.getGoogleFitSteps();
      } else if (this.platform === 'ios') {
        return await this.getHealthKitSteps();
      }
    } catch (error) {
      console.error('Error getting steps:', error);
      return 0;
    }
  }

  // Get steps from Google Fit
  async getGoogleFitSteps() {
    try {
      if (!GoogleFit) {
        return 0;
      }

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date();

      const result = await GoogleFit.getDailyStepCountSamples({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      const steps =
        result.find(i => i.source === 'com.google.android.gms')?.steps[0]
          ?.value || 0;
      return steps;
    } catch (error) {
      console.error('Google Fit steps error:', error);
      return 0;
    }
  }

  // Get steps from HealthKit
  async getHealthKitSteps() {
    try {
      if (!AppleHealthKit) {
        return 0;
      }

      const today = new Date().toISOString().split('T')[0];

      return new Promise((resolve, reject) => {
        AppleHealthKit.getStepCount({ date: today }, (err, results) => {
          if (err) {
            console.error('HealthKit steps error:', err);
            resolve(0);
            return;
          }
          resolve(results.value || 0);
        });
      });
    } catch (error) {
      console.error('HealthKit steps error:', error);
      return 0;
    }
  }

  // Calculate calories burned based on steps
  calculateCalories(steps, weightKg = 70) {
    try {
      // Average stride length in meters
      const strideLength = 0.78;

      // MET (Metabolic Equivalent of Task) for walking
      const MET = 3.5;

      // Calculate distance in kilometers
      const distanceKm = (steps * strideLength) / 1000;

      // Calculate calories: distance * weight * MET * 0.0175
      const calories = distanceKm * weightKg * MET * 0.0175;

      return Math.round(calories);
    } catch (error) {
      console.error('Calorie calculation error:', error);
      return 0;
    }
  }

  // Get fitness data (steps and calories)
  async getFitnessData(weightKg = 70) {
    try {
      const steps = await this.getTodaySteps();
      const calories = this.calculateCalories(steps, weightKg);

      return {
        steps,
        calories,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error getting fitness data:', error);
      return {
        steps: 0,
        calories: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Check if fitness tracking is available
  isAvailable() {
    return this.platform === 'android' || this.platform === 'ios';
  }

  // Check if Google Sign-In is required (for fitness tracking)
  isGoogleSignInRequired() {
    return true; // Always require Google Sign-In for fitness tracking
  }

  // Check authorization status
  getAuthorizationStatus() {
    return this.isAuthorized;
  }

  // Request permissions
  async requestPermissions() {
    try {
      return await this.initialize();
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }
}

export default new FitnessService();
