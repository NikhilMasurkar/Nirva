import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import activityReducer from './activitySlice';
import exerciseReducer from './exerciseSlice';

export default combineReducers({
  user: userReducer,
  activity: activityReducer,
  exercise: exerciseReducer,
});
