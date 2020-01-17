import React, { Component } from "react";
import { connect } from "react-redux";

import {
  addTask,
  removeTask,
  completeTask,
  changeFilter,
  editTask
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

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case "completed":
        return tasks.filter(task => task.isCompleted);
      case "active":
        return tasks.filter(task => !task.isCompleted);
      default:
        return tasks;
    }
  };

  getActiveTasksCounter = tasks =>
    tasks.filter(task => !task.isCompleted).length;

  render() {
    const { taskText } = this.state;
    const {
      tasks,
      removeTask,
      completeTask,
      filters,
      changeFilter,
      editTask
    } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTasks(tasks, filters);
    const taskCounter = this.getActiveTasksCounter(tasks);

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
            tasksList={filteredTasks}
            removeTask={removeTask}
            editTask={editTask}
          />
        )}
        {isTasksExist && (
          <Footer
            amount={taskCounter}
            activeFilter={filters}
            changeFilter={changeFilter}
          />
        )}
      </div>
    );
  }
}

export default connect(
  ({ tasks, filters }) => ({
    tasks,
    filters
  }),
  { addTask, removeTask, completeTask, changeFilter, editTask }
)(Todo);
