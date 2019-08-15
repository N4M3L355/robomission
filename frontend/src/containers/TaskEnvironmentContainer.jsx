import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskEnvironment from '../components/TaskEnvironment';
import { createTaskEnvironment, changeGamePanelWidth } from '../actions';
import { getEditorType, getGamePanelWidth } from '../selectors/taskEnvironment';


class TaskEnvironmentWrapper extends React.Component {
  constructor(props) {
    super(props);
    const { taskEnvironmentId } = this.props;
    this.changeGamePanelWidth = this.props.changeGamePanelWidth.bind(this, taskEnvironmentId);
  }

  componentDidMount() {
    this.props.createTaskEnvironment(this.props.taskEnvironmentId);
  }

  resize() {
    this.taskEnvironment.resize();
  }

  render() {
    return (
      <TaskEnvironment
        ref={ref => { this.taskEnvironment = ref; }}
        taskEnvironmentId={this.props.taskEnvironmentId}
        editorType={this.props.editorType}
        controls={this.props.controls}
        gamePanelWidth={this.props.gamePanelWidth}
        changeGamePanelWidth={this.changeGamePanelWidth}
      />
    );
  }
}

TaskEnvironmentWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  createTaskEnvironment: PropTypes.func.isRequired,
  controls: PropTypes.array,
  editorType: PropTypes.oneOf(['code', 'blockly']).isRequired,
  gamePanelWidth: PropTypes.number.isRequired,
  changeGamePanelWidth: PropTypes.func.isRequired,
};


function mapStateToProps(state, props) {
  return {
    taskEnvironmentId: props.taskEnvironmentId,
    editorType: getEditorType(state, props.taskEnvironmentId),
    gamePanelWidth: getGamePanelWidth(state, props.taskEnvironmentId),
  };
}


const actionCreators = { createTaskEnvironment, changeGamePanelWidth };
const TaskEnvironmentContainer = connect(mapStateToProps,
                                         actionCreators,
                                         null,
                                         { forwardRef: true })(TaskEnvironmentWrapper);
export default TaskEnvironmentContainer;
