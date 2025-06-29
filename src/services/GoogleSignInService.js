import { GoogleSignin } from '@react-native-google-signin/google-signin';

class GoogleSignInService {
  constructor() {
    this.isConfigured = false;
    this.isAvailable = false;
  }

  configure() {
    if (this.isConfigured) return;

    try {
      // Check if the webClientId is properly configured
      const webClientId = 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com';

      if (webClientId === 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com') {
        console.warn(
          'Google Sign-In not configured. Please follow the setup guide in GOOGLE_SIGNIN_SETUP.md',
        );
        this.isAvailable = false;
        return;
      }

      GoogleSignin.configure({
        webClientId: webClientId,
        offlineAccess: true,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
      });

      this.isConfigured = true;
      this.isAvailable = true;
    } catch (error) {
      console.error('Failed to configure Google Sign-In:', error);
      this.isAvailable = false;
    }
  }

  async signIn() {
    try {
      this.configure();

      if (!this.isAvailable) {
        return {
          success: false,
          error:
            'Google Sign-In is not configured. Please follow the setup guide.',
        };
      }

      // Check if user is already signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        return await this.getCurrentUser();
      }

      // Sign in
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      return {
        success: true,
        user: {
          id: userInfo.user.id,
          email: userInfo.user.email,
          name: userInfo.user.name,
          photo: userInfo.user.photo,
          familyName: userInfo.user.familyName,
          givenName: userInfo.user.givenName,
        },
        tokens: {
          accessToken: userInfo.serverAuthCode,
          idToken: userInfo.idToken,
        },
      };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      return {
        success: false,
        error: error.message || 'Sign-in failed',
      };
    }
  }

  async getCurrentUser() {
    try {
      if (!this.isAvailable) {
        return { success: false, error: 'Google Sign-In is not configured' };
      }

      const userInfo = await GoogleSignin.getCurrentUser();
      if (!userInfo) {
        return { success: false, error: 'No user signed in' };
      }

      return {
        success: true,
        user: {
          id: userInfo.user.id,
          email: userInfo.user.email,
          name: userInfo.user.name,
          photo: userInfo.user.photo,
          familyName: userInfo.user.familyName,
          givenName: userInfo.user.givenName,
        },
      };
    } catch (error) {
      console.error('Get Current User Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to get user info',
      };
    }
  }

  async signOut() {
    try {
      if (!this.isAvailable) {
        return { success: false, error: 'Google Sign-In is not configured' };
      }

      await GoogleSignin.signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign Out Error:', error);
      return {
        success: false,
        error: error.message || 'Sign-out failed',
      };
    }
  }

  async revokeAccess() {
    try {
      if (!this.isAvailable) {
        return { success: false, error: 'Google Sign-In is not configured' };
      }

      await GoogleSignin.revokeAccess();
      return { success: true };
    } catch (error) {
      console.error('Revoke Access Error:', error);
      return {
        success: false,
        error: error.message || 'Revoke access failed',
      };
    }
  }

  async isSignedIn() {
    try {
      if (!this.isAvailable) {
        return false;
      }

      return await GoogleSignin.isSignedIn();
    } catch (error) {
      console.error('Check Sign-In Status Error:', error);
      return false;
    }
  }

  isGoogleSignInAvailable() {
    return this.isAvailable;
  }
}

export default new GoogleSignInService();
