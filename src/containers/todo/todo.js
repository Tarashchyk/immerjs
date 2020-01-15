import React, { Component } from "react";
import { connect } from "react-redux";

import { addTask } from "../../actions/actionCreator";

import ToDoInput from "../../components/todo-input/todo-input";
import ToDoList from "../../components/todo-list/todo-list";
import Footer from "../../components/footer/footer";

import "./todo.scss";

class Todo extends Component {
  state = {
    activeFilter: "all",
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
    const { activeFilter, taskText } = this.state;
    const { tasks } = this.props;
    const isTasksExist = tasks && tasks.length > 0;

    return (
      <div className="todo-wrapper">
        <ToDoInput
          onChange={this.handleChangeInput}
          value={taskText}
          onKeyPress={this.addTask}
        />
        {isTasksExist && <ToDoList tasksList={tasks} />}
        {isTasksExist && (
          <Footer amount={tasks.length} activeFilter={activeFilter} />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    tasks: state.tasks
  }),
  { addTask }
)(Todo);
