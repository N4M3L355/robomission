import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {Avatar, Card, CardContent, CardHeader} from '@material-ui/core';
import TaskName from './TaskName';
import Rating from './Rating';
import {theme} from '../theme';
import {translate} from '../localization';
import {flatten} from '../utils/arrays';
import Instructable from '../containers/Instructable';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    background: "none",
    backgroundColor: "none"
  }
}));

export default function TaskTable({ urlBase, missions, recommendation, levelStatus }) {
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
  const tasks = flatten(mission.phases.map(phase => phase.tasks));
  const isRecommended = recommendation.mission === mission.id
  let badgeTextColor = theme.canvasColor;
  let badgeBackgroundColor = theme.disabledColor;
  if (isRecommended) {
    badgeTextColor = theme.palette.accent2Color;
  } else if (mission.level < levelStatus.level) {
    badgeBackgroundColor = theme.successColor;
  }
  return (
    <Card>
      <CardHeader
        avatar={
          <Instructable instruction="overview-levels" position="top">
            <Avatar
            >
              L{mission.level}
            </Avatar>
          </Instructable>}
        title={`${translate(`ps.story.${mission.id}`)}`}
        subtitle={<FormattedMessage id={`ps.${mission.id}`} />}
      />
      <CardContent
        //expandable={true}
      >
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
      </CardContent>
    </Card>
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
            xs={3}
      >
        <Link key={task.id} to={`${urlBase}${task.id}`} style={{color:"initial"}}>
        <Paper className={classes.paper} variant={"outlined"} square={false}>
          {subtitle}
          <br/>
          <Typography variant="h5">
            {<TaskName taskId={task.id} />}
          </Typography>
          <Instructable instruction="overview-difficulty" position="top">
            <Rating value={task.solved ? task.levels[1] : 0} max={task.levels[1]} />
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
