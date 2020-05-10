import React from 'react';
import PropTypes from 'prop-types';
import CodeEditorContainer from '../containers/CodeEditorContainer';
import BlocklyEditorContainer from '../containers/BlocklyEditorContainer';
import SpaceGameContainer from '../containers/SpaceGameContainer';
import Grid from "@material-ui/core/Grid";

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
            controls } = this.props;
    return (
            <Grid container spacing={0} alignItems={"stretch"} style={{
                flex:1,
                display: "flex",
            }}>
                <Grid item xs={12} sm={4} style={{
                    flex:1,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <SpaceGameContainer
                        taskEnvironmentId={taskEnvironmentId}
                        controls={controls}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
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
