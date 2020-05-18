import React from 'react';
import { Link } from 'react-router-dom';
import {Fab, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Scroll from 'react-scroll';
import SpaceGameContainer from '../containers/SpaceGameContainer';
//import TaskEnvironmentContainer from '../containers/TaskEnvironmentContainer';
import NextTaskButtonContainer from '../containers/NextTaskButtonContainer';
//import neuronsBackgroundPath from '../images/neurons-tile.png';
import fiBackgroundPath from '../images/fi-slide.jpg';
//import spaceBackgroundPath from '../images/background-space.png';
//import spaceshipInSpaceWorldPath from '../images/banner-image.png';
//import diamond from '../images/diamond.svg';
import Text from '../localization/Text';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Sky from "./Sky";
import GitHubIcon from "./GitHubIcon";


const useStyles = makeStyles(theme => ({
  /*fab: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: theme.palette.secondary.main,
    boxShadow: 'none',
    backgroundColor:'rgba(0,0,0,0)',
  },*/
  banner: {
    fontWeight: '200'
  }
}));


export default function Home(props) {

  const classes = useStyles();


  function renderSlide({ style, content, footer }, index) {
    return (
      <Scroll.Element key={index} name={`intro-slide-${index}`}>
        <section
          style={{
            height:'100vh',
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",

            ...style,
          }}
        >
          {content}
            {footer}
        </section>
      </Scroll.Element>
    );
  }


  let styleSheet = document.styleSheets[0];

  let animationName = `animation${Math.round(Math.random() * 2**16)}`;
  animationName = "abc";
  let keyframes =
    `@-webkit-keyframes ${animationName} {
        0% {-webkit-transform:translate(-5%, -5%)} 
        100% {-webkit-transform:translate(105%, 105%)}
    }`;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  keyframes =
    `@-webkit-keyframes rocketAnimation {
        0% {-webkit-transform: translate(0px, 0px)} 
        50% {-webkit-transform: translate(-50px, 50px)}
        100% {-webkit-transform: translate(0px, 0px)}
    }`;
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  keyframes =
    `@-webkit-keyframes diamondAnimation {
        0% {-webkit-transform:translate(-5%, -5%)} 
        100% {-webkit-transform:translate(105%, 105%)}
    }`;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    const slides = [
      // slide 0
      {
        content: (
          <div style={{width: "100%"}}>
              <Sky/>
            <Grid container justify={"space-around"}>
              <Grid item sm={12} md={4} style={{flexBasis:"45%"}}>
                <Typography variant="h1" className={classes.banner}><Text id="intro.learn-programming" /></Typography>
                <NextTaskButtonContainer />
                <Link to="/tasks">
                  <Button className={classes.button} variant='outlined'><Text id="Tasks" /></Button>
                </Link>

              </Grid>
              <Grid item sm={12} md={4}>
                <svg width="100%" height="100%" id="rocket">
                </svg>
              </Grid>
            </Grid>
          </div>
        ),
        footer: (
          <Scroll.Link to="intro-slide-1" smooth={true} duration={500}>

                  <Fab color='secondary' className={classes.fab}>
                      <ArrowDown/>
                  </Fab>
          </Scroll.Link>
        ),
      },
      // slide 1
      {
        content: (
                <Grid container direction="column" justify="space-between" alignContent="center" alignItems="center" style={{flex:1}}>
                    <Grid item xs={4}>
                        <h2><Text id="intro.explore-universe"/><br/><Text id="intro.collect-diamonds"/></h2>
                    </Grid>
                    <Grid item container xs={4} justify="center">
                        <Grid item container xs={12} sm={8} md={6}>
                            <SpaceGameContainer
                                taskEnvironmentId="home-commands"
                                showHeader={false}
                                controls={['fly', 'left', 'right', 'reset']}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>

                        <p style={{visibility: props.spaceWorldDemoSolved ? 'visible' : 'hidden'}}>
                            <Text id='excellent-task-solved'/>
                        </p>

                        <Typography variant="h3"><Text id="intro.game-driven-by-ai"/></Typography>
                        <Typography variant="h3"><Text id="intro.adapting-to-your-skills"/></Typography>
                    </Grid>

                </Grid>
        ),
        footer: (
          <Scroll.Link to="intro-slide-2" smooth={true} duration={500}>
            <Fab color='secondary' disabled={!props.spaceWorldDemoSolved}>
              <ArrowDown/>
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
          backgroundImage: `url(${fiBackgroundPath})`,
          backgroundSize: 'cover',
        },
        content: (
            <div>
                <h2>
                    <Text id="intro.developed-by-alg" />
                    <br />
                    <Text id="intro.at-fi-mu" />
                </h2>
                <span>
              <a href="https://www.fi.muni.cz/adaptivelearning/?a=projects" target="_blank" rel="noreferrer noopener">
                <Button className={classes.button} variant='outlined'>{<Text id="ALG" />}</Button>
              </a>
            </span>
                <a href="https://www.fi.muni.cz/about/index.xhtml.cs" target="_blank" rel="noreferrer noopener">
                    <Button className={classes.button} variant='outlined'><Text id="FI-MU" /></Button>
                </a>
            </div>
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
        content: (
          <div>
            <h2><Text id="intro.fly-into-space" /></h2>
            <NextTaskButtonContainer />
          </div>
        ),
      },
    ];

  /*
  let circle =
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" style={{
    animationName:"abc",
    animationDuration:"4s",
    animationTimingFunction:"linear",
    animationIterationCount: "infinite"
  }}/> */

  /*
  */

  return (
      <div>
        {slides.map(renderSlide)}
      </div>
    );
}
