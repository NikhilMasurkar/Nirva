import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dailyStats: {
    steps: 0,
    caloriesBurned: 0,
    activeMinutes: 0,
    date: new Date().toDateString(),
  },
  weeklyStats: [],
  monthlyStats: [],
  goals: {
    dailySteps: 10000,
    dailyCalories: 500,
    dailyMinutes: 30,
  },
  history: [],
  fitnessTracking: {
    isEnabled: false,
    isAuthorized: false,
    lastSync: null,
    platform: null,
  },
};

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    updateDailyStats: (state, action) => {
      const today = new Date().toDateString();
      if (state.dailyStats.date !== today) {
        // New day, reset stats
        state.dailyStats = {
          steps: 0,
          caloriesBurned: 0,
          activeMinutes: 0,
          date: today,
        };
      }
      state.dailyStats = { ...state.dailyStats, ...action.payload };
    },
    updateGoals: (state, action) => {
      state.goals = { ...state.goals, ...action.payload };
    },
    addActivityHistory: (state, action) => {
      state.history.unshift(action.payload);
    },
    setFitnessTrackingStatus: (state, action) => {
      state.fitnessTracking = { ...state.fitnessTracking, ...action.payload };
    },
    updateRealTimeSteps: (state, action) => {
      const { steps, calories } = action.payload;
      state.dailyStats.steps = steps;
      state.dailyStats.caloriesBurned = calories;
      state.fitnessTracking.lastSync = new Date().toISOString();
    },
    resetActivity: state => {
      return initialState;
    },
  },
});

export const {
  updateDailyStats,
  updateGoals,
  addActivityHistory,
  setFitnessTrackingStatus,
  updateRealTimeSteps,
  resetActivity,
} = activitySlice.actions;
export default activitySlice.reducer;
