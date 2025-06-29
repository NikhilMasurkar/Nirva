import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: 'Welcome to Nirva',
    age: 0,
    weight: 0,
    height: 0,
    gender: '',
    address: '',
    phone: '',
    email: '',
    avatar: null,
  },
  preferences: {
    notifications: true,
    theme: 'light',
    language: 'en',
  },
  isLoggedIn: false,
  googleSignIn: {
    isSignedIn: false,
    user: null,
    tokens: null,
    loading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    resetUser: state => {
      return initialState;
    },
    // Google Sign-In actions
    setGoogleSignInLoading: (state, action) => {
      state.googleSignIn.loading = action.payload;
    },
    setGoogleSignInUser: (state, action) => {
      state.googleSignIn.user = action.payload;
      state.googleSignIn.isSignedIn = !!action.payload;
      state.googleSignIn.error = null;
      // Auto-fill profile with Google data if available
      if (action.payload) {
        state.profile.name = action.payload.name || state.profile.name;
        state.profile.email = action.payload.email || state.profile.email;
        state.profile.avatar = action.payload.photo || state.profile.avatar;
      }
    },
    setGoogleSignInTokens: (state, action) => {
      state.googleSignIn.tokens = action.payload;
    },
    setGoogleSignInError: (state, action) => {
      state.googleSignIn.error = action.payload;
      state.googleSignIn.loading = false;
    },
    clearGoogleSignIn: state => {
      state.googleSignIn = initialState.googleSignIn;
    },
    // Complete reset action
    resetAllUserData: () => {
      return initialState;
    },
  },
});

export const {
  updateProfile,
  updatePreferences,
  setLoginStatus,
  resetUser,
  setGoogleSignInLoading,
  setGoogleSignInUser,
  setGoogleSignInTokens,
  setGoogleSignInError,
  clearGoogleSignIn,
  resetAllUserData,
} = userSlice.actions;
export default userSlice.reducer;
