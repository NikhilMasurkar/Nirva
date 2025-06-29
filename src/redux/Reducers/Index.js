import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import activityReducer from './activitySlice';
import exerciseReducer from './exerciseSlice';
import waterReducer from './waterReducer';

const appReducer = combineReducers({
  user: userReducer,
  activity: activityReducer,
  exercise: exerciseReducer,
  water: waterReducer,
});

// Root reducer with reset functionality
const rootReducer = (state, action) => {
  if (action.type === 'RESET_ALL_STATE') {
    // Reset all state to initial values
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
