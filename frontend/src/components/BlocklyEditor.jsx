import React from 'react';
import PropTypes from 'prop-types';
import ReactBlocklyComponent from 'react-blockly-component';
import { blocklyXmlToRoboAst } from '../core/blockly';
import { generateBlocklyXml } from '../core/blocklyXmlGenerator';
import { completeToolbox } from '../core/toolbox';
import { countStatements } from '../core/roboCodeSyntaxChecker';


const workspaceConfiguration = {
  trashcan: true,
};


// Blockly editor requires global Blockly object
// It fills the parent div completely and resize on dimensions change
export default class BlocklyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.blocklyEditor = React.createRef();
  }
  componentDidMount() {
    this.setHighlight();
  }

  // Sometimes, we need to set a new program, e.g. when a new task is set.
  // However, ReactBlocklyComponent only sets an initial XML.
  // So we need to be able set a new XML manually, but we can't do that
  // every time - we would destroy Blockly internal ID's and we could also
  // easily end up in an infinite update-dispatch loop.
  // Hence, we will use an explicit flag (editorSessionId) to distinguish
  // between an internal change (within Blockly) and an external change (in our
  // reducers).
  componentDidUpdate(prevProps) {
    if (prevProps.editorSessionId !== this.props.editorSessionId) {
      this.setRoboAst(this.props.roboAst);
    }
    this.checkLengthLimit(this.props.roboAst);
    this.setHighlight();
  }

  setRoboAst(roboAst) {
    const newXml = generateBlocklyXml(roboAst);
    this.setXml(newXml);
  }

  setXml(xml) {
    this.blocklyWorkspace.clear();
    this.blocklyEditor.current.importFromXml(xml);
  }

  resize() {
    this.blocklyEditor.current.resize();
  }

  // TODO: unhack
  checkLengthLimit(roboAst) {
    if (this.blocklyEditor.current == null) {
      return; // blockly hasn't been loaded yet
    }
    const disable = (this.props.lengthLimit !== null)
                    && (countStatements(roboAst) >= this.props.lengthLimit);
    for (const block of this.blocklyWorkspace.flyout_.workspace_.getAllBlocks()) {
      const type = block.type;
      if (['fly', 'left', 'right', 'shoot', 'if', 'if-else', 'repeat', 'while'].includes(type)) {
        if (disable) {
          this.blocklyWorkspace.flyout_.permanentlyDisabled_.push(block);
          block.setDisabled(true);
        } else {
          block.setDisabled(false);
        }
      }
    }
  }

  setHighlight() {
    this.blocklyWorkspace.highlightBlock(this.props.highlightedBlock);
  }

  // Return Blockly.Toolbox
  // (node_modules/node-blockly/blockly/core/toolbox.js)
  get blocklyToolbox() {
    console.log(this.blocklyWorkspace);
    return this.blocklyWorkspace.flyout_.workspace_;
  }

  // Return Blockly.Workspace
  // (node_modules/node-blockly/blockly/core/workspace.js)
  get blocklyWorkspace() {
    return this.workspaceComponent.state.workspace;
  }

  // Return ReactBlocklyComponent.BlocklyWorkspace
  // (node_modules/react-blockly-component/src/BlocklyWorkspace.jsx)
  get workspaceComponent() {
    console.log(this.blocklyEditor);
    return this.blocklyEditor.current.workspace;
  }

  render() {
    const initialXml = generateBlocklyXml(this.props.roboAst);
    // factor out to a method
    const xmlDidChange = newXml => {
      const roboAst = blocklyXmlToRoboAst(newXml);
      this.props.onChange(roboAst);
      this.checkLengthLimit(roboAst);
    };
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'absolute',
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px',
          color: 'green',
        }}
      >
        <ReactBlocklyComponent.BlocklyEditor
          ref={ this.blocklyEditor }
          workspaceConfiguration={workspaceConfiguration}
          toolboxBlocks={this.props.toolboxBlocks}
          initialXml={initialXml}
          xmlDidChange={xmlDidChange}
          wrapperDivClassName="flocs-blockly"
        />
      </div>
    );
  }
}

BlocklyEditor.propTypes = {
  toolboxBlocks: PropTypes.array,
  roboAst: PropTypes.object,
  onChange: PropTypes.func,
  editorSessionId: PropTypes.number,
  lengthLimit: PropTypes.number,
  highlightedBlock: PropTypes.string,
};

BlocklyEditor.defaultProps = {
  toolboxBlocks: completeToolbox,
  roboAst: { head: 'start', body: [] },
  onChange: null,
  editorSessionId: 0,
  lengthLimit: null,
  highlightedBlock: null,
};
