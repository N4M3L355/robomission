import React from 'react';
import PropTypes from 'prop-types';
import Slider from '@material-ui/core/Slider';
import SvgImage from '../components/SvgImage';
import Text from '../localization/Text';
import {withTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";


const propTypes = {
  speed: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const defaultProps = {
  width: 200,
  min: 1,
  max: 5,
};

class SpeedControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = (event, value) => {
      this.props.onChange(value);
    };
  }

  render() {
    return (
        <div style={{display: "flex", flex: 1}}>
            <svg style={{height:35, width: 35}}>
                <SvgImage style={{height: '100%'}} imageId="speedometer"/>
            </svg>
            <div style={{display: "flex", flex: 1, flexDirection: 'column'}}>
                <Typography id="Speed" variant="body1">
                    <Text id="Speed" />{`: ${this.props.speed}`}</Typography>

                <Slider
                    min={this.props.min}
                    max={this.props.max}
                    step={1}
                    value={this.props.speed}
                    onChange={this.handleChange}
                />
            </div>
        </div>

    );
  }
}


SpeedControl.propTypes = propTypes;
SpeedControl.defaultProps = defaultProps;

export default withTheme(SpeedControl);
