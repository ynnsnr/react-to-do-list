import { SHOW_DONE_TASKS } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case SHOW_DONE_TASKS:
      return !action.boolean
    default: return state;
  }
}
