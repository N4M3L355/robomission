import React from 'react';
import PropTypes from 'prop-types';
import { Circle as ProgressCircle } from 'rc-progress';
import { Avatar } from ' @material-ui/core';


const propTypes = {
  skill: PropTypes.number,
  text: PropTypes.string,
};

const defaultProps = {
  text: '',
};

class Skillometer extends React.Component {
  getCircleBackgroundColor() {
    // TODO: Send the binary mastery decision from server.
    if (this.props.skill >= 0.95) {
      return this.props.muiTheme.palette.success.main;
    } else {
      return '#a3a3a3';
    }
  }

  render() {
    const percent = Math.floor(100 * this.props.skill);
    // TODO: Include this.props.text (center).
    return (
      <Avatar
        style={{
          display: 'inline-block',
          //marginRight: 10,
        }}
        backgroundColor={this.getCircleBackgroundColor()}
      >
        <span style={{
            display: 'inline-block',
            width: '100%',
            height: '100%',
          }}
        >
          <ProgressCircle
            percent={percent}
            strokeWidth={15}
            trailWidth={15}
            strokeColor={this.props.muiTheme.palette.success.main}
            trailColor="#737373"
          />
        </span>
      </Avatar>
    );
  }
}


Skillometer.propTypes = propTypes;
Skillometer.defaultProps = defaultProps;

export default Skillometer;
