import {
  resetAllUserData,
  clearGoogleSignIn,
  setLoginStatus,
} from '../redux/Reducers/userSlice';
import GoogleSignInService from './GoogleSignInService';

class SignOutService {
  constructor() {
    this.dispatch = null;
  }

  /**
   * Set the dispatch function (called from the hook)
   */
  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  /**
   * Complete sign-out that resets all app state
   */
  async signOut() {
    try {
      // 1. Sign out from Google (if signed in)
      if (GoogleSignInService.isGoogleSignInAvailable()) {
        await GoogleSignInService.signOut();
      }

      // 2. Reset all Redux state (if dispatch is available)
      if (this.dispatch) {
        this.dispatch(resetAllUserData());
        this.dispatch(setLoginStatus(false));
        this.dispatch({ type: 'RESET_ALL_STATE' });
      }

      return {
        success: true,
        message: 'Successfully signed out and reset all data',
      };
    } catch (error) {
      console.error('Sign-out error:', error);

      // Even if Google sign-out fails, reset local state
      if (this.dispatch) {
        this.dispatch(resetAllUserData());
        this.dispatch(setLoginStatus(false));
        this.dispatch({ type: 'RESET_ALL_STATE' });
      }

      return {
        success: true,
        message: 'Signed out locally (Google sign-out failed)',
        error: error.message,
      };
    }
  }

  /**
   * Sign out from Google only (keeps other app data)
   */
  async signOutFromGoogle() {
    try {
      if (GoogleSignInService.isGoogleSignInAvailable()) {
        await GoogleSignInService.signOut();
      }

      if (this.dispatch) {
        this.dispatch(clearGoogleSignIn());
        this.dispatch(setLoginStatus(false));
      }

      return {
        success: true,
        message: 'Successfully signed out from Google',
      };
    } catch (error) {
      console.error('Google sign-out error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Reset all app data without signing out from Google
   */
  resetAppData() {
    try {
      if (this.dispatch) {
        this.dispatch(resetAllUserData());
        this.dispatch({ type: 'RESET_ALL_STATE' });
      }

      return {
        success: true,
        message: 'App data reset successfully',
      };
    } catch (error) {
      console.error('Reset app data error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Check if user is signed in (requires state to be passed)
   */
  isSignedIn(state) {
    if (!state) return false;

    return state.user.isLoggedIn || state.user.googleSignIn.isSignedIn;
  }

  /**
   * Get current user info (requires state to be passed)
   */
  getCurrentUser(state) {
    if (!state) return null;

    return {
      profile: state.user.profile,
      googleUser: state.user.googleSignIn.user,
      isLoggedIn: state.user.isLoggedIn,
      isGoogleSignedIn: state.user.googleSignIn.isSignedIn,
    };
  }
}

export default new SignOutService();
