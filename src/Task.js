import React, { Component } from 'react';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      new_value: 'new_value',
    };
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.index);
  }

  toggleDone = () => {
    this.props.toggleDone(this.props.index);
  }

  toggleEdit = () => {
    this.setState({
      edit: this.state.edit ? false : true,
      new_value: this.props.task.title,
    });
  }

  onChange = (event) => {
    this.setState({ new_value: event.target.value });
  }

  saveEdit = (event) => {
    event.preventDefault();
    this.props.saveEdit(this.state.new_value, this.props.index);
    this.setState({
      edit: false,
    });
  }

  displayDoneTasks = () => {
    return !this.props.task.done && this.props.showDoneTasks ? 'none' : 'block';
  }

  renderTask = () => {
    if (this.state.edit) {
      return(
        <form onSubmit={this.saveEdit}>
          <input value={this.state.new_value} onChange={this.onChange} />
          <button>Submit</button>
        </form>
      );
    }
    return(
      <div>
        <span onClick={this.toggleDone}>
          {this.props.task.done ? '[X]' : '[ ]'}
        </span>
        <span> {this.props.task.title}</span>
        <span onClick={this.toggleEdit}> (edit)</span>
        <span onClick={this.deleteTask}> (delete)</span>
      </div>
    );
  }

  render() {
    return (
      <li style={{display: this.displayDoneTasks()}}>
        { this.renderTask() }
        { this.props.showDoneTasks }
      </li>
    );
  }
}
