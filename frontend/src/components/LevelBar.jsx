import React from 'react';
import PropTypes from 'prop-types';
import { Line as ProgressBar } from 'rc-progress';
import {useTheme} from "@material-ui/styles";


const propTypes = {
  level: PropTypes.number.isRequired,
  activeCredits: PropTypes.number.isRequired,
  maxCredits: PropTypes.number.isRequired,
  percent: PropTypes.number,  // if not set, it's computed from active and max credits
  mini: PropTypes.bool,
};

const defaultProps = {
  mini: false,
};

export default function LevelBar(props) {
  const theme = useTheme();

    const styleDefault = {
      display: 'inline-block',
      width: 250,
      marginLeft: 8,
      marginRight: 8,
    };
    const styleMini = {
      display: 'inline-block',
      width: 54,
      marginLeft: 8,
      fontSize: 12,
      lineHeight: '9px',
      textAlign: 'center',
    };
    let percent = props.percent;
    if (percent === undefined || percent === null) {
      percent = Math.floor(100 * props.activeCredits / props.maxCredits);
    }
    if (props.mini) {
      return (
        <span>
          <span style={{ fontSize: 18 }}>
            L{ props.level }
          </span>
          <span style={styleMini}>
            {props.activeCredits} / {props.maxCredits}
            <ProgressBar
              percent={percent}
              strokeWidth={8}
              strokeColor="#E3E3E3"
              trailColor="#F3F3F3"
            />
          </span>
        </span>
      );
    }
    return (
      <span>
        <span style={{ fontSize: 18 }}>
          L{ props.level }
        </span>
        <span style={styleDefault}>
          <ProgressBar
            percent={percent}
            strokeWidth={5}
            trailWidth={5}
            strokeColor={theme.palette.secondary.main}
            trailColor="#a3a3a3"
          />
        </span>
        {props.activeCredits} / {props.maxCredits}
      </span>
    );
}


LevelBar.propTypes = propTypes;
LevelBar.defaultProps = defaultProps;
