import React, { Component } from 'react';
import List from '../components/List';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTask, showDoneTasks } from '../actions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  doneTasks = () => {
    return this.props.tasks.filter(task => task.done);
  }

  progress = () => {
    const done = this.doneTasks().length;
    const total = this.props.tasks.length;
    return this.props.tasks.length ? Math.floor(done / total * 100) : 0;
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
        <button onClick={() => this.props.showDoneTasks(this.props.showDone)}
                disabled={!this.doneTasks().length}
        >
          { this.props.showDone ? 'See all tasks' : 'See what\'s done' }
        </button>
        <div>Progress: {this.progress()}% done</div>
        <form onSubmit={(event) => {
          this.props.addTask(event, this.state.value);
          this.setState({ value: '' });
          this.focusInput();
        }}>
          <input value={this.state.value}
                 onChange={this.onChange}
                 placeholder="What needs to be done?"
          />
          <button disabled={!this.state.value}>Submit</button>
        </form>
        <List tasks={this.props.tasks} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tasks: state.tasks, showDone: state.showDone };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask, showDoneTasks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
