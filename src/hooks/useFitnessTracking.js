import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import FitnessService from '../services/FitnessService';
import {
  setFitnessTrackingStatus,
  updateRealTimeSteps,
  updateDailyStats,
} from '../redux/Reducers/activitySlice';

const useFitnessTracking = () => {
  const dispatch = useDispatch();
  const { fitnessTracking, dailyStats } = useSelector(state => state.activity);
  const { googleSignIn } = useSelector(state => state.user);
  const syncIntervalRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Provide default values to prevent undefined errors
  const defaultFitnessTracking = {
    isEnabled: false,
    isAuthorized: false,
    lastSync: null,
    platform: null,
  };

  const safeFitnessTracking = fitnessTracking || defaultFitnessTracking;

  // Check if Google Sign-In is active
  const isGoogleSignedIn = googleSignIn?.isSignedIn || false;

  // Initialize fitness tracking (only if Google signed in)
  const initializeFitnessTracking = useCallback(async () => {
    try {
      // Only initialize if Google Sign-In is active
      if (!isGoogleSignedIn) {
        console.log('Fitness tracking requires Google Sign-In');
        dispatch(
          setFitnessTrackingStatus({
            isEnabled: false,
            isAuthorized: false,
            platform: null,
          }),
        );
        return false;
      }

      if (!FitnessService.isAvailable()) {
        console.log('Fitness tracking not available on this platform');
        return false;
      }

      dispatch(
        setFitnessTrackingStatus({
          isEnabled: true,
          platform: Platform.OS,
        }),
      );

      const isAuthorized = await FitnessService.initialize();

      dispatch(
        setFitnessTrackingStatus({
          isAuthorized,
          lastSync: new Date().toISOString(),
        }),
      );

      if (isAuthorized) {
        console.log('Fitness tracking initialized successfully');
        return true;
      } else {
        console.log('Fitness tracking authorization failed');
        return false;
      }
    } catch (error) {
      console.error('Fitness tracking initialization error:', error);
      dispatch(
        setFitnessTrackingStatus({
          isEnabled: false,
          isAuthorized: false,
        }),
      );
      return false;
    }
  }, [dispatch, isGoogleSignedIn]);

  // Request permissions (only if Google signed in)
  const requestPermissions = useCallback(async () => {
    try {
      if (!isGoogleSignedIn) {
        console.log('Google Sign-In required for fitness tracking');
        return false;
      }

      const isAuthorized = await FitnessService.requestPermissions();
      dispatch(
        setFitnessTrackingStatus({
          isAuthorized,
          lastSync: new Date().toISOString(),
        }),
      );
      return isAuthorized;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }, [dispatch, isGoogleSignedIn]);

  // Sync fitness data (only if Google signed in and authorized)
  const syncFitnessData = useCallback(async () => {
    try {
      if (!isGoogleSignedIn || !safeFitnessTracking.isAuthorized) {
        return;
      }

      const userWeight = 70; // You can get this from user profile
      const fitnessData = await FitnessService.getFitnessData(userWeight);

      dispatch(
        updateRealTimeSteps({
          steps: fitnessData.steps,
          calories: fitnessData.calories,
        }),
      );

      // Also update daily stats for compatibility
      dispatch(
        updateDailyStats({
          steps: fitnessData.steps,
          caloriesBurned: fitnessData.calories,
        }),
      );
    } catch (error) {
      console.error('Fitness data sync error:', error);
    }
  }, [dispatch, safeFitnessTracking.isAuthorized, isGoogleSignedIn]);

  // Start real-time tracking (only if Google signed in and authorized)
  const startRealTimeTracking = useCallback(() => {
    if (!isGoogleSignedIn || !safeFitnessTracking.isAuthorized) {
      return;
    }

    // Initial sync
    syncFitnessData();

    // Set up periodic sync (every 30 seconds)
    syncIntervalRef.current = setInterval(syncFitnessData, 30000);
  }, [safeFitnessTracking.isAuthorized, syncFitnessData, isGoogleSignedIn]);

  // Stop real-time tracking
  const stopRealTimeTracking = useCallback(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
      syncIntervalRef.current = null;
    }
  }, []);

  // Manual sync (only if Google signed in and authorized)
  const manualSync = useCallback(async () => {
    if (!isGoogleSignedIn) {
      throw new Error('Google Sign-In required for fitness tracking');
    }
    await syncFitnessData();
  }, [syncFitnessData, isGoogleSignedIn]);

  // Initialize on mount or when Google Sign-In status changes
  useEffect(() => {
    if (isGoogleSignedIn && !isInitializedRef.current) {
      isInitializedRef.current = true;
      initializeFitnessTracking();
    } else if (!isGoogleSignedIn) {
      // Reset fitness tracking when Google Sign-In is lost
      isInitializedRef.current = false;
      dispatch(
        setFitnessTrackingStatus({
          isEnabled: false,
          isAuthorized: false,
          platform: null,
        }),
      );
      stopRealTimeTracking();
    }
  }, [
    initializeFitnessTracking,
    isGoogleSignedIn,
    dispatch,
    stopRealTimeTracking,
  ]);

  // Start/stop tracking based on authorization status and Google Sign-In
  useEffect(() => {
    if (isGoogleSignedIn && safeFitnessTracking.isAuthorized) {
      startRealTimeTracking();
    } else {
      stopRealTimeTracking();
    }

    return () => {
      stopRealTimeTracking();
    };
  }, [
    safeFitnessTracking.isAuthorized,
    startRealTimeTracking,
    stopRealTimeTracking,
    isGoogleSignedIn,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRealTimeTracking();
    };
  }, [stopRealTimeTracking]);

  return {
    // State
    isEnabled: safeFitnessTracking.isEnabled && isGoogleSignedIn,
    isAuthorized: safeFitnessTracking.isAuthorized && isGoogleSignedIn,
    platform: safeFitnessTracking.platform,
    lastSync: safeFitnessTracking.lastSync,
    currentSteps: dailyStats?.steps || 0,
    currentCalories: dailyStats?.caloriesBurned || 0,

    // Actions
    initialize: initializeFitnessTracking,
    requestPermissions,
    manualSync,
    startTracking: startRealTimeTracking,
    stopTracking: stopRealTimeTracking,
  };
};

export default useFitnessTracking;
