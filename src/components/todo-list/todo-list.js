import React from "react";
import PropTypes from "prop-types";

import ToDoItem from "../todo-item/todo-item";

import "./todo-list.scss";

const ToDoList = ({ tasksList, removeTask, completeTask, editTask }) => (
  <ul className="todo-list">
    {tasksList.map(({ id, text, isCompleted }) => (
      <ToDoItem
        key={id}
        id={id}
        text={text}
        isCompleted={isCompleted}
        removeTask={removeTask}
        completeTask={completeTask}
        editTask={editTask}
      />
    ))}
  </ul>
);

ToDoList.propTypes = {
  tasksList: PropTypes.array,
  removeTask: PropTypes.func,
  completeTask: PropTypes.func
};

ToDoList.defaultProps = {
  tasksList: [],
  removeTask: () => {},
  completeTask: () => {}
};

export default ToDoList;
