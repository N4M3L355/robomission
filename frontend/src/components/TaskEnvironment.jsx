import React from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';
import { Scrollbars } from 'react-custom-scrollbars';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import BlocklyEditorContainer from '../containers/BlocklyEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';
import { theme } from '../theme';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

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
            <Grid container spacing={0} alignItems={"stretch"} style={{
                flex:1,
                display: "flex",
            }}>
                <Grid item xs={4}>
                    <SpaceGameContainer
                        taskEnvironmentId={taskEnvironmentId}
                        controls={controls}
                    />
                </Grid>
                <Grid item xs={8}>
                    {editorType === 'code' &&
                    <CodeEditorContainer taskEnvironmentId={taskEnvironmentId}/>
                    }
                    {editorType === 'blockly' &&
                    <BlocklyEditorContainer
                        taskEnvironmentId={taskEnvironmentId}
                        //ref={ref => { this.blocklyEditor = ref ? ref.getWrappedInstance() : null; }}
                        ref={this.blocklyEditor}
                    />
                    }
                </Grid>
            </Grid>

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
