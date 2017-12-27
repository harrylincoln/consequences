import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeGameReducer from './activeGameReducer';
import listenStartReducer from './listenStartReducer';

export default combineReducers({
  auth: authReducer,
  activeGame: activeGameReducer,
  listenStart: listenStartReducer
});
