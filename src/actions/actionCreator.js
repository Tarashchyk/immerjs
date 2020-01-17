import {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK,
  CHANGE_FILTER,
  EDIT_TASK
} from "../constants";

export const addTask = (id, text, isCompleted, isEditing) => ({
  type: ADD_TASK,
  id,
  text,
  isCompleted,
  isEditing
});

export const removeTask = id => ({
  type: REMOVE_TASK,
  id
});

export const completeTask = id => ({
  type: COMPLETE_TASK,
  id
});

export const changeFilter = activeFilter => ({
  type: CHANGE_FILTER,
  activeFilter
});

export const editTask = (id, text) => ({
  type: EDIT_TASK,
  id,
  text
});
