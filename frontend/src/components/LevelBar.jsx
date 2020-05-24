import React from 'react';
import PropTypes from 'prop-types';
import { Line as ProgressBar } from 'rc-progress';
import {useTheme} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


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
    if (true||props.mini) {
      return (
        <Grid container alignContent="center" alignItems="center" wrap="nowrap" style={{width: props.mini?"100px":"100%"}}>
          <Grid item>
            <Box m={1}>
              <Typography variant="h6">
                L{props.level}
              </Typography>
            </Box>
          </Grid>
          <Grid item container style={{flexDirection: "column", alignItems: "center"}}>
            <Typography variant="body2">
              {props.activeCredits} / {props.maxCredits}
            </Typography>
            { props.mini?
                <ProgressBar
                percent={percent}
                strokeWidth={8}
                strokeColor="#E3E3E3"
                trailColor="#F3F3F3"
            /> :
                <ProgressBar
                    percent={percent}
                    strokeWidth={5}
                    trailWidth={5}
                    strokeColor={theme.palette.secondary.main}
                    trailColor="#a3a3a3"
                />

            }

          </Grid>


        </Grid>
      );
    }
}


LevelBar.propTypes = propTypes;
LevelBar.defaultProps = defaultProps;
