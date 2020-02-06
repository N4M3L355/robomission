import React from 'react';
import { connect } from 'react-redux';
import PracticeContainer from '../containers/PracticeContainer';
import { practicePageTaskEnvironmentId } from '../selectors/taskEnvironment';


function getProps(state, props) {
  return {
    taskId: props.match.params.taskId,
  };
}

class PracticePage extends React.Component {
  render() {
    return (
      <div
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <PracticeContainer
          taskEnvironmentId={practicePageTaskEnvironmentId}
          taskId={this.props.taskId}
        />
      </div>
    );
  }
}

PracticePage = connect(getProps)(PracticePage);

export default PracticePage;
