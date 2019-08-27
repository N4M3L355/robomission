import React from 'react';
import { Link } from 'react-router-dom';
import {Paper, Fab, Button} from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/styles';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Scroll from 'react-scroll';
import SpaceGameContainer from '../containers/SpaceGameContainer';
//import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import NextTaskButtonContainer from '../containers/NextTaskButtonContainer';
import neuronsBackgroundPath from '../images/neurons-tile.png';
import fiBackgroundPath from '../images/fi-slide.jpg';
import spaceBackgroundPath from '../images/background-space.png';
import spaceshipInSpaceWorldPath from '../images/banner-image.png';
import Text from '../localization/Text';


const useStyles = makeStyles(theme => ({
  fab: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    boxShadow: 'none',
    backgroundColor:'rgba(0,0,0,0)',
  },
  banner: {
    fontSize: '6em',
    fontWeight: '200'
  },
  button: {
    borderWidth: '2px'
  }
}));


export default function Home(props) {
  
  const theme = useTheme();
  const classes = useStyles();


  function renderSlide({ style, content, footer }, index) {
    return (
      <Scroll.Element key={index} name={`intro-slide-${index}`}>
        <section
          style={{
            ...slideStyle,
            height: (index === 0) ? '90vh' : '100vh',
            ...style,
          }}
        >
          <div style={{ display: 'table-row' }}>
            <div style={slideContentStyle}>
              {content}
            </div>
          </div>
          {footer && (
            <div style={slideFooterStyle}>
              {footer}
            </div>
          )}
        </section>
      </Scroll.Element>
    );
  }

    const slides = [
      // slide 0
      {
        style: {
          backgroundImage: `url(${spaceshipInSpaceWorldPath})`,
          backgroundSize: 'cover',
          color: '#fff',
        },
        content: (
          <div style={{width:"50%"}}>
            <h1 className={classes.banner}><Text id="intro.learn-programming" /></h1>
            <span style={{ marginRight: 20 }}>
              <NextTaskButtonContainer />
            </span>
            <Link to="/tasks">
              <Button className={classes.button} variant='outlined'><Text id="Tasks" /></Button>
            </Link>
          </div>
        ),
        footer: (
          <Scroll.Link to="intro-slide-1" smooth={true} duration={500}>
            <Fab color='secondary' className={classes.fab}>
              <ArrowDown color='secondary'/>
            </Fab>
          </Scroll.Link>
        ),
      },
      // slide 1
      {
        style: {
          backgroundColor: theme.canvasColor,
          color: '#fff',
        },
        content: (
          <div>
            <h2><Text id="intro.explore-universe" /><br /><Text id="intro.collect-diamonds" /></h2>
            <div>
              <SpaceGameContainer
                taskEnvironmentId="home-commands"
                showHeader={false}
                controls={['fly', 'left', 'right', 'reset']}
              />
            </div>
            <p style={{ visibility: props.spaceWorldDemoSolved ? 'visible' : 'hidden' }}>
            <Text id='excellent-task-solved' />
            </p>
          </div>
        ),
        footer: (
          <Scroll.Link to="intro-slide-2" smooth={true} duration={500}>
            <Fab color='secondary' disabled={!props.spaceWorldDemoSolved} className={classes.fab}>
              <ArrowDown color='secondary'/>
            </Fab>
          </Scroll.Link>
        ),
      },
      // slide 2: temporarily removed
      // TODO: Reintroduce, but with code skeleton and without instructions.
      /*
      {
        style: {
          backgroundColor: theme.palette.primary.main,
        },
        content: (
          <div>
            <h2>
              <Text id="intro.learn-program-spaceship" />
              <br />
              <Text id="intro.using-computer-programs" />
            </h2>
            <div
              style={{
                position: 'relative',
                height: 350,
                width: '94%',
                maxWidth: 800,
                margin: '0 auto',
                border: '2px solid #777'
              }}
            >
              <TaskEnvironmentContainer
                taskEnvironmentId="home-program"
                controls={['run', 'reset']}
              />
            </div>
            <p style={{ visibility: props.programDemoSolved ? 'visible' : 'hidden' }}>
              <Text id='excellent-task-solved' />
            </p>
          </div>
        ),
        footer: (
          <Scroll.Link to="intro-slide-3" smooth={true} duration={500}>
            <Fab secondary={true} disabled={!props.programDemoSolved} className={classes.fab}>
              <ArrowDown color='secondary'/>
            </Fab>
          </Scroll.Link>
        ),
      },
      */
      // slide 3
      {
        style: {
          backgroundImage: `url(${neuronsBackgroundPath})`,
        },
        content: (
          <div>
            <h2>
              <Text id="intro.game-driven-by-ai" />
              <br />
              <Text id="intro.adapting-to-your-skills" />
            </h2>
          </div>
        ),
        footer: (
          <Scroll.Link to="intro-slide-3" smooth={true} duration={500}>
            <Fab color='secondary' className={classes.fab}>
              <ArrowDown color='secondary'/>
            </Fab>
          </Scroll.Link>
        ),
      },
      // slide 4
      {
        style: {
          backgroundImage: `url(${fiBackgroundPath})`,
          backgroundSize: 'cover',
        },
        content: (
          <Paper
            style={{
              display: 'inline-block',
              paddingTop: 10,
              paddingBottom: 40,
              paddingLeft: 50,
              paddingRight: 50,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            zDepth={1}
          >
            <h2>
              <Text id="intro.developed-by-alg" />
              <br />
              <Text id="intro.at-fi-mu" />
            </h2>
            <span style={{ marginRight: 20 }}>
              <a href="https://www.fi.muni.cz/adaptivelearning/?a=projects" target="_blank" rel="noreferrer noopener">
                <Button className={classes.button} variant='outlined'>{<Text id="ALG" />}</Button>
              </a>
            </span>
            <a href="https://www.fi.muni.cz/about/index.xhtml.cs" target="_blank" rel="noreferrer noopener">
              <Button className={classes.button} variant='outlined' style={{ minWidth: 265 }} ><Text id="FI-MU" /></Button>
            </a>
          </Paper>
        ),
        footer: (
          <Scroll.Link to="intro-slide-4" smooth={true} duration={500}>
            <Fab color='secondary' className={classes.fab}>
              <ArrowDown color='secondary' />
            </Fab>
          </Scroll.Link>
        ),
      },
      // slide 5
      {
        style: {
          backgroundImage: `url(${spaceBackgroundPath})`,
          backgroundSize: '500px auto',
          backgroundColor: '#111122',
          color: '#fff',
        },
        content: (
          <div>
            <h2><Text id="intro.fly-into-space" /></h2>
            <NextTaskButtonContainer />
          </div>
        ),
      },
    ];
    return (
      <div style={longPageStyle}>
        {slides.map(renderSlide)}
      </div>
    );
}

const longPageStyle = {
  width: '100%',
  height: '100%',
  margin: 0,
};

const slideStyle = {
  width: '100%',
  padding: '0 7%',
  display: 'table',
  margin: 0,
  height: '100vh',
};

const slideContentStyle = {
  display: 'table-cell',
  verticalAlign: 'middle',
  maxWidth: 1000,
  margin: '20px auto',
  textAlign: 'center',
  lineHeight: 1.3,
};


const slideFooterStyle = {
  display: 'table-row',
  verticalAlign: 'bottom',
  maxWidth: 1000,
  margin: '0 auto',
  height: 90,
  textAlign: 'center',
};

