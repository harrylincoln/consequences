import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeGameReducer from './activeGameReducer';

export default combineReducers({
  auth: authReducer,
  activeGame: activeGameReducer
});
