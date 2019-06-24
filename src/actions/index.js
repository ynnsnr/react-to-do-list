import * as types from '../constants/ActionTypes';

export function addTask(event, value) {
  event.preventDefault();
  return { type: types.ADD_TASK, value };
}

export function toggleDone(index) {
  return { type: types.TOGGLE_DONE, index };
}

export function deleteTask(index) {
  return { type: types.DELETE_TASK, index };
}

export function editTask(event, index, new_value) {
  event.preventDefault();
  return { type: types.EDIT_TASK, index, new_value };
}

export function showDoneTasks(boolean) {
  return { type: types.SHOW_DONE_TASKS, boolean };
}
