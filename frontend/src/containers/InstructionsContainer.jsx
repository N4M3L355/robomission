import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joyride, {EVENTS, STATUS, ACTIONS} from 'react-joyride';
import { translate } from '../localization';
import { showInstructions, seeInstruction } from '../actions';
import { getScheduledInstructions } from '../selectors/instructions';
import {withTheme} from "@material-ui/styles";

const getProps = (state) => ({
  shown: state.instructions.shown,
  scheduledInstructions: getScheduledInstructions(state),
});
const actionCreators = {
  showInstructions,
  seeInstruction: seeInstruction.request,
};

class InstructionsContainer extends React.Component {
  static propTypes = {
    muiTheme: PropTypes.object,
    scheduledInstructions: PropTypes.array,
    shown: PropTypes.bool,
    showInstructions: PropTypes.func,
    seeInstruction: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.showInstructions = props.showInstructions.bind(this);
    this.seeInstruction = props.seeInstruction.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    this.setInstructions(props.scheduledInstructions);
    this.muiTheme = props.muiTheme;
    this.joyride = React.createRef();
  }
    UNSAFE_componentWillReceiveProps(nextProps) {       //TODO: this should be migrated to new version and mechanics
        this.setInstructions(nextProps.scheduledInstructions);
    }

  componentDidUpdate(prevProps) {
    this.setInstructions(prevProps.scheduledInstructions);
    if (!prevProps.shown && this.props.shown) {
        this.joyride.current&&this.joyride.current.getHelpers(({reset}) => reset(true));
    }
  }

  setInstructions(instructions) {
    this.steps = instructions.map(instruction => ({
      content: translate(`instruction.${instruction.id}`),
      target: instruction.selector,  // '.instructable-task-spaceworld',
      placement: instruction.position, // 'bottom-left',
      event: 'hover',
        disableBeacon: true
    }));
  }
    getHelpers = (helpers) => {
        this.helpers = helpers;
    };
  handleJoyrideCallback({ index, action,status, type }) {
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.NEXT) {
      const instructionId = this.props.scheduledInstructions[index].id;
      this.seeInstruction(instructionId);
    } else if (status === STATUS.FINISHED || action === ACTIONS.CLOSE) {
      this.showInstructions({ show: false });
    }
  }

  render() {
    /*if (!this.props.shown) {
      return null;
    }*/
    return (
          <Joyride
              callback={this.handleJoyrideCallback}
              continuous={true}
              debug={true}
              getHelpers={this.getHelpers}
              locale={{
                  back: translate('Previous'),
                  close: translate('I understand'),
                  next: translate('I understand'),
                  last: translate('I understand'),
                  skip: 'Skip',
              }}
              run={true}
              steps={this.steps}
              showProgress={true}
              scrollToFirstStep={true}

              styles = {{
                  options: {
                      primaryColor: this.props.theme.palette.primary.main,
                      zIndex: 10000
                  }
              }}

          />

    );
  }

}

InstructionsContainer = connect(getProps, actionCreators)(InstructionsContainer);


export default withTheme(InstructionsContainer);
