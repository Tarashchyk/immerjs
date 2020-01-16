import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addTask,
  removeTask,
  completeTask,
  changeFilter
} from "../../actions/actionCreator";

import ToDoInput from "../../components/todo-input/todo-input";
import ToDoList from "../../components/todo-list/todo-list";
import Footer from "../../components/footer/footer";

import "./todo.scss";

class Todo extends Component {
  state = {
    taskText: ""
  };

  handleChangeInput = ({ target: { value } }) => {
    this.setState({
      taskText: value
    });
  };

  addTask = ({ key }) => {
    const { taskText } = this.state;

    if (taskText.length > 3 && key === "Enter") {
      const { addTask } = this.props;
      addTask(new Date().getTime(), taskText, false);
      this.setState({
        taskText: ""
      });
    }
  };
  render() {
    const { taskText } = this.state;
    const {
      tasks,
      removeTask,
      completeTask,
      filter,
      changeFilter
    } = this.props;
    const isTasksExist = tasks && tasks.length > 0;

    return (
      <div className="todo-wrapper">
        <ToDoInput
          onChange={this.handleChangeInput}
          value={taskText}
          onKeyPress={this.addTask}
        />
        {isTasksExist && (
          <ToDoList
            completeTask={completeTask}
            tasksList={tasks}
            removeTask={removeTask}
          />
        )}
        {isTasksExist && (
          <Footer
            amount={tasks.length}
            activeFilter={filter}
            changeFilter={changeFilter}
          />
        )}
      </div>
    );
  }
}

export default connect(
  ({ tasks, filter }) => ({
    tasks,
    filter
  }),
  { addTask, removeTask, completeTask, changeFilter }
)(Todo);
