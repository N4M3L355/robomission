import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import SpeedControl from '../components/SpeedControl';
import { translate } from '../localization';
import Instructable from '../containers/Instructable';
import {withTheme} from "@material-ui/styles";

function GameControls({ controls, speed, onClick, theme }) {
  function visible(controlName) {
    return controls[controlName] === 'active' || controls[controlName] === 'passive';
  }

  function disabled(controlName) {
    return controls[controlName] === 'passive';
  }

  function handleSpeedChange(speed) {
    return onClick('speed', speed);
  }

  function conditionallyRenderControlButton(name, label, emph = null, minWidth = 50) {
    if (!(visible(name))) {
      return null;
    }
    let button = (
      <Button
        aria-label={label}
        disabled={disabled(name)}
        style={{ margin: 2, minWidth }}
        onClick={() => onClick(name)}
        color="primary"
        variant='outlined'
      >
        {label}
      </Button>
    );
    if (name === 'run') {
      button = (
        <Instructable instruction="task-controls" position="bottom-left">
          {button}
        </Instructable>
      );
    }
    return button;
  }

  function conditionallyRenderSpeedControl() {
    if (!(visible('speed'))) {
      return null;
    }
    return (
      <SpeedControl
        speed={speed}
        onChange={handleSpeedChange}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        {(visible('fly') || visible('left') || visible('right') || visible('shoot')) &&
        <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
          {conditionallyRenderControlButton('left', '↖', 'primary')}
          {conditionallyRenderControlButton('fly', '↑', 'primary')}
          {conditionallyRenderControlButton('right', '↗', 'primary')}
          {conditionallyRenderControlButton('shoot', '★', 'primary')}
        </div>
        }
      <div style={{display: 'flex', justifyContent: 'center', flex: 1, padding: `0 ${theme.spacing(2)}px`}}>

        {conditionallyRenderControlButton('run', translate('Run'), 'primary', 88)}
        {conditionallyRenderControlButton('reset', 'Reset', 'secondary', false, 88)}
        {conditionallyRenderSpeedControl()}
      </div>

    </div>
  );
}

GameControls.propTypes = {
  controls: PropTypes.object,
  onClick: PropTypes.func,
};

GameControls.defaultProps = {
  controls: { commands: 'active', run: 'active', reset: 'hidden' },
  onClick: null,
};
export default withTheme(GameControls)