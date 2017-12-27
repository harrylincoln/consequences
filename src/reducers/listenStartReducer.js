import { LISTEN_START } from '../actions/types';

export default function(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case LISTEN_START:
    return action.payload || false;
    default:
    return state;
  }
}
