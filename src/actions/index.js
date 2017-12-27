import axios from 'axios';
import { FETCH_USER, CREATE_GAME, LISTEN_START } from './types';
import fire from '../fire';
const todaysDate = new Date().toISOString().slice(0, 10);

export const fetchUser = () => async (dispatch) => {
 const res = await axios.get('api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createGame = () => async (dispatch) => {
  const res = await axios.get('api/create_game');
  dispatch({ type: CREATE_GAME, payload: res.data });
};

export const listenStart = () => async (dispatch) => {
  const res = fire.database().ref(todaysDate + '/players/gameStarted/').on('value', snapshot => {
    console.log('called');
    return snapshot.val();
    });
  dispatch({ type: LISTEN_START, payload: res.data });
};
