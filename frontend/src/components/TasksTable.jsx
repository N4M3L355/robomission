import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {
  Avatar, withTheme, ExpansionPanelDetails, ExpansionPanel,
  ExpansionPanelSummary, Box, Link, Paper, Grid, Typography
} from '@material-ui/core';
import TaskName from './TaskName';
import Rating from './Rating';
import {theme} from '../theme';
import {translate} from '../localization';
import {flatten} from '../utils/arrays';
import Instructable from '../containers/Instructable';
import {makeStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1)
  },
  noBackground: {
    background: "none",
    backgroundColor: "none"
  }
}));

function TaskTable({ urlBase, missions, recommendation, levelStatus }) {
  return (
    <div>
      { missions.map(mission =>
        <MissionOverview
          key={mission.id}
          urlBase={urlBase}
          mission={mission}
          recommendation={recommendation}
          levelStatus={levelStatus}
        />)
      }
    </div>
  );
}

TaskTable.propTypes = {
  urlBase: PropTypes.string,
  missions: PropTypes.array.isRequired,
  recommendation: PropTypes.object.isRequired,
  levelStatus: PropTypes.object.isRequired,
};

TaskTable.defaultProps = {
  urlBase: '/task/',
};


function MissionOverview({ mission, urlBase, recommendation, levelStatus }) {
  const classes = useStyles();
  const tasks = flatten(mission.phases.map(phase => phase.tasks));
  const isRecommended = recommendation.mission === mission.id
  let badgeColor;

  if (isRecommended) {
    badgeColor = theme.palette.secondary.main;
  } else if (mission.level < levelStatus.level) {
    badgeColor = theme.palette.success.main;
  }
  return (

      <Paper
          variant={"outlined"}
          style={{borderColor: badgeColor,margin: "1rem"}}
          className={[classes.paper, classes.noBackground]}
      >
        <ExpansionPanel
            className={classes.noBackground}
            defaultExpanded={isRecommended}
        >
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
        >
            <Instructable instruction="overview-levels" position="top">
            <Avatar style={{borderColor: badgeColor, color: badgeColor}}
            >
              L{mission.level}
            </Avatar>
          </Instructable>
          <Box mx={1}>
            <Typography variant="body1">
              {`${translate(`ps.story.${mission.id}`)}`}
            </Typography>
            <Typography variant="body2" style={{color:theme.palette.text.disabled}}>
              {<FormattedMessage id={`ps.${mission.id}`}/>}
            </Typography>
          </Box>



        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container
                spacing={3}
              //cols={Math.min(5, Math.ceil(window.innerWidth / 250))}
          >
            {tasks.map(task => (
                <TaskTile
                    key={task.id}
                    urlBase={urlBase}
                    task={task}
                    recommendation={recommendation}
                />))}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel></Paper>

  );
}


MissionOverview.propTypes = {
  mission: PropTypes.object.isRequired,
  urlBase: PropTypes.string,
  recommendation: PropTypes.object.isRequired,
};


function TaskTile({ task, urlBase, recommendation, style }) {
  const classes = useStyles();
  let color = '#888';
  if (task.id === recommendation.task) {
    color = theme.palette.secondary.main;
  } else if (task.solved) {
    color = theme.palette.primary.main;
  } else if (task.problemSet === recommendation.phase) {
    color = '#ddd';
    //color = theme.palette.accent3Color;
  }

  let subtitle = '';
  if (task.id === recommendation.task) {
    subtitle = translate('recommended');
  } else {
    // TODO: Add explicit branch for task.solved/unsolved
    subtitle = formatSolvingTime(task.time);
  }

  let tile = (

      <Grid item
          key={<TaskName taskId={task.id}/>}
          style={style}
            xs={6} sm={4} md={3}
      >
        <Link key={task.id} href={`${urlBase}${task.id}`} style={{color:"initial"}}>
        <Paper className={[classes.paper, classes.noBackground]} variant={"outlined"} square={false} style={{borderColor: color, textAlign: 'center'}}>
          <Typography style={{color: color}}>{subtitle}</Typography>
          <Typography variant="h5">
            {<TaskName taskId={task.id} />}
          </Typography>
          <Instructable instruction="overview-difficulty" position="top">
            <Rating style={{color: color}} value={task.solved ? task.levels[1] : 0} max={task.levels[1]} />
          </Instructable>
        </Paper>
        </Link>
      </Grid>
  );
  if (task.solved) {
    tile = (
      <Instructable instruction="overview-solved-task" position="top">
        {tile}
      </Instructable>
    );
  } else if (task.id === recommendation.task) {
    tile = (
      <Instructable instruction="overview-recommended-task" position="top">
        {tile}
      </Instructable>
    );
  }
  return tile;
}


function formatSolvingTime(time) {
  // assumes time as a number of seconds
  if (time == null) {
    return translate('not tackled');
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const paddedSeconds = ('0' + seconds).slice(-2);
  return `${minutes}:${paddedSeconds}`;
}

export default withTheme(TaskTable);