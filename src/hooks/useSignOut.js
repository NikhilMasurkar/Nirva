import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SignOutService from '../services/SignOutService';
import { setLoginStatus } from '../redux/Reducers/userSlice';
import GLOBAL from '../global/global';

export const useSignOut = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const state = useSelector(state => state);

  // Set the dispatch in SignOutService when the hook is used
  useEffect(() => {
    SignOutService.setDispatch(dispatch);
  }, [dispatch]);

  const signOut = useCallback(
    async (options = {}) => {
      const {
        resetAllData = true,
        navigateToWelcome = true,
        showAlert = true,
      } = options;

      try {
        let result;

        if (resetAllData) {
          // Complete sign-out with all data reset
          result = await SignOutService.signOut();
        } else {
          // Sign out from Google only
          result = await SignOutService.signOutFromGoogle();
        }

        // Update Redux state
        dispatch(setLoginStatus(false));

        // Navigate to appropriate screen
        if (navigateToWelcome) {
          navigation.reset({
            index: 0,
            routes: [{ name: GLOBAL.PAGE.WELCOME }],
          });
        }

        return result;
      } catch (error) {
        console.error('Sign-out error:', error);

        // Force reset even if service fails
        dispatch(setLoginStatus(false));

        if (navigateToWelcome) {
          navigation.reset({
            index: 0,
            routes: [{ name: GLOBAL.PAGE.WELCOME }],
          });
        }

        return {
          success: false,
          error: error.message || 'Sign-out failed',
        };
      }
    },
    [dispatch, navigation],
  );

  const resetAppData = useCallback(async () => {
    try {
      const result = SignOutService.resetAppData();
      return result;
    } catch (error) {
      console.error('Reset app data error:', error);
      return {
        success: false,
        error: error.message || 'Reset failed',
      };
    }
  }, []);

  const isSignedIn = useCallback(() => {
    return SignOutService.isSignedIn(state);
  }, [state]);

  const getCurrentUser = useCallback(() => {
    return SignOutService.getCurrentUser(state);
  }, [state]);

  return {
    signOut,
    resetAppData,
    isSignedIn,
    getCurrentUser,
  };
};
