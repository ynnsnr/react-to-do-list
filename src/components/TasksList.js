import React from 'react';
import Task from '../containers/Task';
import { List } from 'antd';

const TasksList = props => (
  <List>
    {
      props.tasks.map((task, index) =>
        <Task task={task} key={index} index={index} />
      )
    }
  </List>
);

export default TasksList;
