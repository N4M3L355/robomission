import React from 'react';
import {Button, Fab} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
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
import Link from "@material-ui/core/Link";
import rocketWithFlame from "../images/RocketWithFlame.svg";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


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

              perspectiveOriginX: "100%",
              position: "relative",
              transformStyle: "preserve-3d",
            ...style,
          }}
        >
          {content}
            {footer&&(
                <div style={{flex: 0.5, display: "flex", justifyContent: "center", flexDirection: "column"}}>
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
        content: (
          <div style={{width: "100%"}}>
            <Grid container justify={"space-around"}>
              <Grid item sm={12} md={6} style={{flexBasis:"45%"}}>
                <Typography variant="h1" className={classes.banner}><Text id="intro.learn-programming" /></Typography>
                <NextTaskButtonContainer />
                <Link href="/tasks">
                    <Button className={classes.button} variant='outlined'><Text id="Tasks" /></Button>
                </Link>

              </Grid>
              <Grid item sm={12} md={4}>
                  <img src={rocketWithFlame}/>
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
                <Grid container justify="space-between" alignContent="center" alignItems="center" style={{flex:1}}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5"><Text id="intro.explore-universe"/></Typography>
                        <Typography variant="h5"><Text id="intro.collect-diamonds"/></Typography>
                    </Grid>
                    <Grid item container xs={12} md={6} justify="center" style={{minHeight:"40vh"}}>
                        <Grid item container xs={12} sm={8} md={6}>
                            <SpaceGameContainer
                                taskEnvironmentId="home-commands"
                                showHeader={false}
                                controls={['fly', 'left', 'right', 'reset']}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>

                        <p style={{visibility: props.spaceWorldDemoSolved ? 'visible' : 'hidden'}}>
                            <Text id='excellent-task-solved'/>
                        </p>

                        <Typography variant="h5"><Text id="intro.game-driven-by-ai"/></Typography>
                        <Typography variant="h5"><Text id="intro.adapting-to-your-skills"/></Typography>
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
              <Paper>
                  <Card elevation={3}>
                      <CardContent>
                          <Typography variant="h5"><Text id="intro.developed-by-alg"/></Typography>
                          <Typography variant="h5"><Text id="intro.at-fi-mu"/></Typography>
                          <Link href="https://www.fi.muni.cz/adaptivelearning/?a=projects">
                              <Button className={classes.button} color="secondary" variant='outlined'>{<Text
                                  id="ALG"/>}</Button>
                          </Link>
                          <Link href="https://www.fi.muni.cz/about/index.xhtml.cs">
                              <Button className={classes.button} color="secondary" variant='outlined'><Text id="FI-MU"/></Button>
                          </Link>
                      </CardContent>
                  </Card>
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
      <div style={{perspective: "1px"}}>

          <Sky/>
        {slides.map(renderSlide)}
      </div>
    );
}
