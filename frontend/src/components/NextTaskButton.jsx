import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TaskIcon from '@material-ui/icons/PlayArrow';
import Instructable from '../containers/Instructable';
import TaskName from './TaskName';


export default function NextTaskButton({ task }) {

  if (task === null) {
    // When all mission are completed (or recommendation is unavailable for
    // other reason), don't show anything.
    return null;
    // (TODO: Make localized pages for "Next goals".)
    //return (
    //    <Button
    //      style={style}
    //      label="..."
    //      primary={true}
    //      disabled={false}
    //    />
    //);
  }
  return (
    <Link to={task.url}>
      <Instructable instruction="env-recommended-task-button" position="top">
        <Button
          color='primary'
          variant="outlined"
        >
          <TaskIcon/>
          <TaskName taskId={task.taskId} />
        </Button>
      </Instructable>
    </Link>
  );
}


NextTaskButton.propTypes = {
  task: PropTypes.object,
};
