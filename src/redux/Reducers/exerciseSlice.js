import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exercises: [],
  categories: [
    { id: 1, name: 'Morning Yoga', icon: 'yoga', color: '#FF6B9D' },
    { id: 2, name: 'Meditation', icon: 'meditation', color: '#6B73FF' },
    { id: 3, name: 'Strength Training', icon: 'dumbbell', color: '#9C27B0' },
    { id: 4, name: 'Cardio', icon: 'run', color: '#10B981' },
  ],
  favorites: [],
  completedExercises: [],
  currentWorkout: null,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExercises: (state, action) => {
      state.exercises = action.payload;
    },
    addToFavorites: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    completeExercise: (state, action) => {
      const completedExercise = {
        ...action.payload,
        completedAt: new Date().toISOString(),
      };
      state.completedExercises.unshift(completedExercise);
    },
    setCurrentWorkout: (state, action) => {
      state.currentWorkout = action.payload;
    },
    resetExercise: state => {
      return initialState;
    },
  },
});

export const {
  setExercises,
  addToFavorites,
  removeFromFavorites,
  completeExercise,
  setCurrentWorkout,
  resetExercise,
} = exerciseSlice.actions;
export default exerciseSlice.reducer;
