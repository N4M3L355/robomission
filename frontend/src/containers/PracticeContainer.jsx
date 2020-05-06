import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskEnvironmentContainer from './TaskEnvironmentContainer';
import { isSolved, getFailReason } from '../selectors/gameState';
import { isTaskCompletionDialogOpen } from '../selectors/taskEnvironment';
import { getLevelStatus, getRecommendation } from '../selectors/practice';
import { closeTaskCompletionDialog,
         resetGame,
         showLevelProgress,
         startTask } from '../actions';
import CompleteTaskModal from '../components/CompleteTaskModal';
import TaskFailedModal from '../components/TaskFailedModal';

function getProps(state, props) {
  return {
    taskEnvironmentId: props.taskEnvironmentId,
    taskId: props.taskId,
    solved: isSolved(state, props.taskEnvironmentId),
    taskCompletionDialogPosition: props.taskCompletionDialogPosition,
    isTaskCompletionDialogOpen: isTaskCompletionDialogOpen(state, props.taskEnvironmentId),
    levelStatus: getLevelStatus(state),
    failReason: getFailReason(state, props.taskEnvironmentId),
    recommendation: getRecommendation(state),
  };
}


const actionCreators = {
  showLevelProgress: showLevelProgress.start,
  startTask: startTask.request,
  closeTaskCompletionDialog,
  resetGame,
};

class PracticeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.closeTaskCompletionDialog = this.props.closeTaskCompletionDialog.bind(this, this.props.taskEnvironmentId);
    this.resetGame = this.props.resetGame.bind(this, this.props.taskEnvironmentId);
  }

  componentDidMount() {
    this.startTask(this.props.taskId);
  }

  componentDidUpdate(props) {
    //if (!this.props.solved && props.solved) {
    //  this.solveTask();
    //}
    if (this.props.taskId !== props.taskId) {
      this.startTask(props.taskId);
    }
  }

  startTask(taskId) {
    this.props.startTask(this.props.taskEnvironmentId, taskId);
  }

  render() {
    return (
      <div style={{
        flex:1,
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={this.props.containerStyle}>
          <TaskEnvironmentContainer taskEnvironmentId={this.props.taskEnvironmentId} />
        </div>
        <CompleteTaskModal
          open={this.props.isTaskCompletionDialogOpen}
          position={this.props.taskCompletionDialogPosition}
          handleClose={this.closeTaskCompletionDialog}
          levelStatus={this.props.levelStatus}
          showLevelProgress={this.props.showLevelProgress}
          recommendation={this.props.recommendation}
        />
        <TaskFailedModal
          open={this.props.failReason !== null}
          reason={this.props.failReason}
          resetGame={this.resetGame}
        />
      </div>
    );
  }
}


PracticeContainer.propTypes = {
  taskEnvironmentId: PropTypes.string,
  taskId: PropTypes.string,
  solved: PropTypes.bool,
  startTaskInTaskEnvironment: PropTypes.func,
  solveTaskInTaskEnvironment: PropTypes.func,
  taskCompletionDialogPosition: PropTypes.string,
  containerStyle: PropTypes.object,
  recommendation: PropTypes.object,
};


PracticeContainer.defaultProps = {
  taskCompletionDialogPosition: 'modal',
  containerStyle: {},
};

PracticeContainer = connect(getProps, actionCreators)(PracticeContainer)
export default PracticeContainer;
