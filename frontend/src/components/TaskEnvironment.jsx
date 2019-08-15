import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import { Scrollbars } from 'react-custom-scrollbars';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import BlocklyEditorContainer from '../containers/BlocklyEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';
import { theme } from '../theme';


export default class TaskEnvironment extends React.Component {
  constructor(props) {
    super(props);
    this.onGamePanelWidthChange = this.changeGamePanelWidth.bind(this);
    this.blocklyEditor = React.createRef();
  }

  changeGamePanelWidth(width) {
    this.props.changeGamePanelWidth(width);
    this.resize();
  }

  resize() {
    if (this.blocklyEditor.current != null) {
      this.blocklyEditor.current.resize();
    }
  }


  render() {
    const { taskEnvironmentId,
            editorType,
            gamePanelWidth,
            controls } = this.props;
    return (
      <SplitPane
        split="vertical"
        minSize={200}
        maxSize={-400}
        size={gamePanelWidth}
        resizerStyle={{
          backgroundColor: '#aaa',
          width: 4,
          cursor: 'col-resize',
        }}
        onChange={this.onGamePanelWidthChange}
      >
        <Scrollbars
          style={{
            display: 'inline-block',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.canvasColor,
            color: theme.palette.textColor,
          }}
        >
          <SpaceGameContainer
            taskEnvironmentId={taskEnvironmentId}
            controls={controls}
          />
        </Scrollbars>
        <span
          style={{
            display: 'inline-block',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          { editorType === 'code' &&
            <CodeEditorContainer taskEnvironmentId={taskEnvironmentId} />
          }
          { editorType === 'blockly' &&
            <BlocklyEditorContainer
              taskEnvironmentId={taskEnvironmentId}
              //ref={ref => { this.blocklyEditor = ref ? ref.getWrappedInstance() : null; }}
              ref = {this.blocklyEditor}
            />
          }
        </span>
      </SplitPane>
    );
  }
}

TaskEnvironment.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  editorType: PropTypes.oneOf(['code', 'blockly']).isRequired,
  controls: PropTypes.array,
  gamePanelWidth: PropTypes.number.isRequired,
  changeGamePanelWidth: PropTypes.func,
};


TaskEnvironment.defaultProps = {
  controls: ['run', 'reset', 'speed'],
  gamePanelWidth: 280,
};
