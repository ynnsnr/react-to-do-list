import React from 'react';
import Task from './Task';

const List = props => (
  <ul>
    {
      props.tasks.map((task, index) =>
        <Task task={task}
              key={index}
              index={index}
              deleteTask={props.deleteTask}
              toggleDone={props.toggleDone}
              saveEdit={props.saveEdit}
              showDoneTasks={props.showDoneTasks}
        />
      )
    }
  </ul>
);

export default List;
