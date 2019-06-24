import React from 'react';
import Task from '../containers/Task';

const List = props => (
  <ul>
    {
      props.tasks.map((task, index) =>
        <Task task={task} key={index} index={index} />
      )
    }
  </ul>
);

export default List;
