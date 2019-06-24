import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleDone, deleteTask, editTask } from '../actions';

export class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      new_value: 'new_value',
    };
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

  displayTask = () => {
    return !this.props.task.done && this.props.showDone ? 'none' : 'block';
  }

  renderTask = () => {
    if (this.state.edit) {
      return(
        <form onSubmit={(event) => {
          this.props.editTask(event, this.props.index, this.state.new_value);
          this.setState({ edit: false });
        }}>
          <input value={this.state.new_value} onChange={this.onChange} />
          <button>Submit</button>
        </form>
      );
    }
    return(
      <div>
        <span onClick={() => this.props.toggleDone(this.props.index)}>
          {this.props.task.done ? '[X]' : '[ ]'}
        </span>
        <span> {this.props.task.title}</span>
        <span onClick={this.toggleEdit}> (edit)</span>
        <span onClick={() => this.props.deleteTask(this.props.index)}> (delete)</span>
      </div>
    );
  }

  render() {
    return (
      <li style={{display: this.displayTask()}}>{ this.renderTask() }</li>
    );
  }
}

function mapStateToProps(state) {
  return { showDone: state.showDone };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleDone, deleteTask, editTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
