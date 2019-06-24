import React, { Component } from 'react';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tasks: [],
      showDoneTasks: false,
    };
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  addTask = (event) => {
    event.preventDefault();
    const tasks = this.state.tasks;
    tasks.unshift({ title: this.state.value, done: false });
    this.setState({ value: '', tasks });
    this.focusInput();
  }

  toggleDone = (index) => {
    const tasks = this.state.tasks;
    tasks[index].done = tasks[index].done ? false : true;
    this.setState({ tasks });
  }

  saveEdit = (value, index) => {
    const tasks = this.state.tasks;
    tasks[index].title = value;
    this.setState({ tasks });
  }

  deleteTask = (index) => {
    const tasks = this.state.tasks;
    tasks.splice(index, 1);
    this.setState({ tasks });
  }

  doneTasks = () => {
    return this.state.tasks.filter(task => task.done);
  }

  progress = () => {
    const done = this.doneTasks().length;
    const total = this.state.tasks.length;
    return this.state.tasks.length ? Math.floor(done / total * 100) : 0;
  }

  toggleDoneTasks = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks });
  }

  focusInput = () => {
    document.querySelector('input').focus();
  }

  componentDidMount = () => {
    this.focusInput();
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleDoneTasks} disabled={!this.doneTasks().length}>
          { this.state.showDoneTasks ? 'See all tasks' : 'See what\'s done' }
        </button>
        <div>Progress: { this.progress() }% done</div>
        <form onSubmit={this.addTask}>
          <input value={this.state.value}
                 onChange={this.onChange}
                 placeholder="What needs to be done?"
          />
          <button disabled={!this.state.value}>Submit</button>
        </form>
        <List tasks={this.state.tasks}
              deleteTask={this.deleteTask}
              toggleDone={this.toggleDone}
              saveEdit={this.saveEdit}
              showDoneTasks={this.state.showDoneTasks}
        />
      </div>
    );
  }
}
