import { combineReducers } from 'redux';
import waterReducer from './waterReducer';

export default combineReducers({
  water: waterReducer,
});
