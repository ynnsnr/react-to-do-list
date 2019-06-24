import { ADD_TASK, TOGGLE_DONE, DELETE_TASK, EDIT_TASK } from '../constants/ActionTypes';

export default function(state = null, action) {
  switch (action.type) {
    case ADD_TASK:
      return [ ...state, { title: action.value, done: false }]
    case TOGGLE_DONE:
      return state.map((task, index) =>
        index === action.index ? { ...task, done: !task.done } : task
      )
    case DELETE_TASK:
      return state.filter((task, index) => index !== action.index);
    case EDIT_TASK:
      return state.map((task, index) =>
        index === action.index ? { ...task, title: action.new_value } : task
      )
    default: return state;
  }
}
