import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGoogleSignInLoading,
  setGoogleSignInUser,
  setGoogleSignInTokens,
  setGoogleSignInError,
  clearGoogleSignIn,
} from '../redux/Reducers/userSlice';
import GoogleSignInService from '../services/GoogleSignInService';

export const useGoogleSignIn = () => {
  const dispatch = useDispatch();
  const googleSignIn = useSelector(state => state.user.googleSignIn);

  const signIn = useCallback(async () => {
    try {
      dispatch(setGoogleSignInLoading(true));
      dispatch(setGoogleSignInError(null));

      const result = await GoogleSignInService.signIn();

      if (result.success) {
        dispatch(setGoogleSignInUser(result.user));
        if (result.tokens) {
          dispatch(setGoogleSignInTokens(result.tokens));
        }
        return result;
      } else {
        dispatch(setGoogleSignInError(result.error));
        return result;
      }
    } catch (error) {
      const errorMessage = error.message || 'Sign-in failed';
      dispatch(setGoogleSignInError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setGoogleSignInLoading(false));
    }
  }, [dispatch]);

  const signOut = useCallback(async () => {
    try {
      dispatch(setGoogleSignInLoading(true));
      const result = await GoogleSignInService.signOut();

      if (result.success) {
        dispatch(clearGoogleSignIn());
      }

      return result;
    } catch (error) {
      const errorMessage = error.message || 'Sign-out failed';
      dispatch(setGoogleSignInError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setGoogleSignInLoading(false));
    }
  }, [dispatch]);

  const getCurrentUser = useCallback(async () => {
    try {
      const result = await GoogleSignInService.getCurrentUser();

      if (result.success) {
        dispatch(setGoogleSignInUser(result.user));
      }

      return result;
    } catch (error) {
      const errorMessage = error.message || 'Failed to get user info';
      dispatch(setGoogleSignInError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);

  const checkSignInStatus = useCallback(async () => {
    try {
      const isSignedIn = await GoogleSignInService.isSignedIn();

      if (isSignedIn) {
        return await getCurrentUser();
      } else {
        dispatch(clearGoogleSignIn());
        return { success: false, error: 'Not signed in' };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to check sign-in status';
      dispatch(setGoogleSignInError(errorMessage));
      return { success: false, error: errorMessage };
    }
  }, [dispatch, getCurrentUser]);

  return {
    // State
    isSignedIn: googleSignIn.isSignedIn,
    user: googleSignIn.user,
    tokens: googleSignIn.tokens,
    loading: googleSignIn.loading,
    error: googleSignIn.error,

    // Actions
    signIn,
    signOut,
    getCurrentUser,
    checkSignInStatus,
  };
};
