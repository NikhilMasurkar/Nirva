import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: 'Welcome to Nirva',
    age: 0,
    weight: 0,
    height: 0,
    gender: '',
    avatar: null,
  },
  preferences: {
    notifications: true,
    theme: 'light',
    language: 'en',
  },
  isLoggedIn: false,
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
  },
});

export const { updateProfile, updatePreferences, setLoginStatus, resetUser } =
  userSlice.actions;
export default userSlice.reducer;
