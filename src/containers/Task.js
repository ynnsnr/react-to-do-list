import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleDone, deleteTask, editTask } from '../actions';
import { Row, List, Form, Button, Input, Icon, Typography } from 'antd';

export class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, new_value: 'new_value' };
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
        <Form layout="inline" onSubmit={(event) => {
            this.props.editTask(event, this.props.index, this.state.new_value);
            this.setState({ edit: false });
          }
        }>
          <Form.Item>
            <Input value={this.state.new_value} onChange={this.onChange} />
          </Form.Item>
          <Form.Item style={{ marginRight: '0px' }}>
            <Button type="primary" htmlType="submit">EDIT TASK</Button>
          </Form.Item>
        </Form>
      );
    }
    return(
      <Row type="flex" justify="space-between" align="middle">
        <Row type="flex" align="middle">
          <Icon onClick={() => this.props.toggleDone(this.props.index)}
                style={{ fontSize: '24px', marginRight: '4px' }}
                type={this.props.task.done ? 'check-square' : 'border'}
          />
          <Typography.Text strong delete={this.props.task.done}>
            {this.props.task.title}
          </Typography.Text>
        </Row>
        <div>
          <Button type="info" onClick={this.toggleEdit}>
            <Icon type="edit" />
          </Button>
          <Button type="danger"
                  onClick={() => this.props.deleteTask(this.props.index)}
          >
            <Icon type="delete" />
          </Button>
        </div>
      </Row>
    );
  }

  render() {
    return (
      <List.Item style={{display: this.displayTask()}}>
        { this.renderTask() }
      </List.Item>
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
