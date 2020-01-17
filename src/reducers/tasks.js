import { ADD_TASK, REMOVE_TASK, COMPLETE_TASK, EDIT_TASK } from "../constants";
import { load } from "redux-localstorage-simple";
import produce from "immer";

let TASKS = load({ namespace: "todo-list" });

if (!TASKS || !TASKS.tasks || !TASKS.tasks.length) {
  TASKS = {
    tasks: []
  };
}

// const TASKS = [
//   {
//     id: 1,
//     text: "Learn React",
//     isCompleted: true
//   },
//   {
//     id: 2,
//     text: "Learn Redux",
//     isCompleted: false
//   },
//   {
//     id: 3,
//     text: "Learn React Router",
//     isCompleted: false
//   },
//   {
//     id: 4,
//     text: "Learn immerJs",
//     isCompleted: true
//   }
// ];

const tasks = produce(
  (draft = TASKS.tasks, { type, id, text, isCompleted }) => {
    switch (type) {
      case ADD_TASK: {
        draft.push({
          id,
          text,
          isCompleted
        });
        return;
      }
      case REMOVE_TASK: {
        draft.splice(
          draft.findIndex(task => task.id === id),
          1
        );
        return;
      }
      case COMPLETE_TASK: {
        draft.map(task => {
          if (task.id === id) {
            task.isCompleted = !task.isCompleted;
          }
          return task;
        });
        return;
      }
      case EDIT_TASK: {
        draft.find(task => task.id === id).text = text;
        return;
      }
      default: {
        return draft;
      }
    }
  }
);

export default tasks;
