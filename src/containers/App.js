import React, { Component } from 'react';
import TasksList from '../components/TasksList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTask, showDoneTasks } from '../actions';
import {
  Layout, Row, Progress, Form, Button, Input, Icon, Typography, Divider, Empty
} from 'antd';

const { Title } = Typography;

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

  renderEmpty = () => {
    if (!this.props.tasks.length) {
      return(
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
               description={<span>No Task</span>}
        />
      )
    }
  }

  renderButton = () => {
    if (this.doneTasks().length && this.props.tasks.length > 1) {
      return(
        <div>
          <Divider />
          <Row type="flex" justify="center">
            <Button onClick={() => this.props.showDoneTasks(this.props.showDone)}>
              { this.props.showDone ? 'SEE ALL TASKS' : 'SEE DONE TASKS' }
            </Button>
          </Row>
        </div>
      )
    }
  }

  render() {
    return (
      <Layout className="main-container">
        <div>
          <Row style={{textAlign: 'center'}}>
            <Title type="secondary" level={2}>TO DO</Title>
          </Row>
          <Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                    percent={this.progress()}
          />
          <Form layout="inline" onSubmit={(event) => {
                  this.props.addTask(event, this.state.value);
                  this.setState({ value: '' });
                  this.focusInput();
                }
          }>
            <Form.Item>
              <Input prefix={<Icon type="plus" style={{ color: 'rgba(0,0,0,.25)' }} />}
                     value={this.state.value}
                     onChange={this.onChange}
                     placeholder="What needs to be done?"
              />
            </Form.Item>
            <Form.Item style={{ marginRight: '0px' }}>
              <Button type="primary"
                      disabled={!this.state.value}
                      htmlType="submit"
              >
                ADD TASK
              </Button>
            </Form.Item>
          </Form>
          <TasksList tasks={this.props.tasks} />
          {this.renderEmpty()}
          {this.renderButton()}
        </div>
      </Layout>
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
