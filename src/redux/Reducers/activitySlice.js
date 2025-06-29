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
    resetActivity: state => {
      return initialState;
    },
  },
});

export const {
  updateDailyStats,
  updateGoals,
  addActivityHistory,
  resetActivity,
} = activitySlice.actions;
export default activitySlice.reducer;
