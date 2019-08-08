import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TaskIcon from 'material-ui/svg-icons/av/play-arrow';
import Instructable from '../containers/Instructable';
import TaskName from './TaskName';
import { theme } from '../theme';


export default function NextTaskButton({ task }) {
  const style = {
    minWidth: 200,
    display: 'inline-block',
    border: '1px solid white',
    borderColor: theme.palette.primary1Color,
    backgroundColor: "#00000000"
  };
  if (task === null) {
    // When all mission are completed (or recommendation is unavailable for
    // other reason), don't show anything.
    return null;
    // (TODO: Make localized pages for "Next goals".)
    //return (
    //    <RaisedButton
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
        <RaisedButton
          icon={<TaskIcon style={{ marginLeft: 8 }}/>}
          style={style}
          backgroundColor="#00000000"
          labelColor={theme.palette.primary1Color}
          label={<span style={{ position: 'relative', top: 1 }}><TaskName taskId={task.taskId} /></span>}
          primary={false}
        />
      </Instructable>
    </Link>
  );
}


NextTaskButton.propTypes = {
  task: PropTypes.object,
};
