import React, { Component } from "react";
import PropTypes from "prop-types";

import TodoTextInput from "../todo-text-input/todo-text-input";

import "./todo-item.scss";

class ToDoItem extends Component {
  state = {
    editing: false
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.removeTask(id);
    } else {
      this.props.editTask(id, text);
    }
    this.setState({ editing: false });
  };

  render() {
    // console.log(this.props);
    const { text, isCompleted, removeTask, id, completeTask } = this.props;

    let element;

    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={text}
          editing={this.state.editing}
          onSave={newtext => this.handleSave(id, newtext)}
        />
      );
    } else {
      element = (
        <>
          <i
            onClick={() => completeTask(id)}
            className={
              isCompleted ? "mark far fa-check-circle" : "mark far fa-circle"
            }
          />

          <span
            className={isCompleted ? "completed text" : "text"}
            onDoubleClick={this.handleDoubleClick}
          >
            {text}
          </span>

          <i className="fas fa-times" onClick={() => removeTask(id)} />
        </>
      );
    }
    return <li className="todo-item">{element}</li>;
  }
}

ToDoItem.propTypes = {
  text: PropTypes.string,
  isCompleted: PropTypes.bool,
  removeTask: PropTypes.func,
  id: PropTypes.number
};

ToDoItem.defaultProps = {
  text: "",
  isCompleted: false,
  removeTask: () => {},
  id: 0
};
export default ToDoItem;
