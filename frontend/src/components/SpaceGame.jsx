import React from 'react';
import PropTypes from 'prop-types';
import GameStatus from './GameStatus';
import SpaceWorld from './SpaceWorld';
import GameControls from './GameControls';
import {Box} from "@material-ui/core";


export default class SpaceGame extends React.Component {
    componentDidMount() {
        let spacegameBB = document.querySelector('#spaceWorldContainer');
        spacegameBB.scrollBy(0,spacegameBB.scrollTopMax);                       //TODO: this is hack so the user sees bottom of the simulator.
        /*
        let spacegameBB = document.querySelector('#spaceWorldContainer').getBoundingClientRect();       //this wanted to be scrolling to rocket on every command, but it didn't work well
        let spaceshipBB = document.querySelector('.instructable-task-spaceship').getBoundingClientRect();
        console.log(spaceshipBB.bottom - spacegameBB.bottom, spacegameBB.top - spaceshipBB.top)
        if (spaceshipBB.bottom - spacegameBB.bottom > 0) document.querySelector('#spaceWorldContainer').scrollBy(0, spaceshipBB.bottom - spacegameBB.bottom)
        if (spacegameBB.top - spaceshipBB.top > 0) document.querySelector('#spaceWorldContainer').scrollBy(0, -spaceshipBB.top - spacegameBB.top)*/
    }

    render() {
        let {
            taskId,
            level,
            gameState,
            pastActions,
            lengthLimit,
            width,
            controls,
            speed,
            pauseLength,
            onControlClicked,
            showHeader,
            scrollable
        } = this.props;
        const {fields, stage, diamonds, energy} = gameState;
        const gameOver = (stage === 'solved' || stage === 'dead');
        const initialStage = (stage === 'initial');
        const preparing = (stage === 'preparing');
        const controlsSetting = {
            fly: evaluateVisibility(
                controls.indexOf('fly') < 0 || preparing,
                gameOver),
            left: evaluateVisibility(
                controls.indexOf('left') < 0 || preparing,
                gameOver),
            right: evaluateVisibility(
                controls.indexOf('right') < 0 || preparing,
                gameOver),
            shoot: evaluateVisibility(
                controls.indexOf('shoot') < 0 || preparing,
                gameOver),
            run: evaluateVisibility(
                controls.indexOf('run') < 0 || preparing || !(initialStage),
                false),
            reset: evaluateVisibility(
                controls.indexOf('reset') < 0 || preparing || (initialStage && controls.indexOf('run') >= 0),
                initialStage),
            speed: (controls.indexOf('speed') >= 0) ? 'active' : 'hidden',
        };
        const gameStatus = (
            <GameStatus
                taskId={taskId}
                level={level}
                diamonds={diamonds}
                energy={energy}
                length={lengthLimit}
                solved={stage === 'solved'}
                dead={stage === 'dead'}
            />
        );
        const spaceWorld = (
            <SpaceWorld
                fields={fields}
                pastActions={pastActions}
                width={width}
                pauseLength={pauseLength}
                scrollable={scrollable}
            />
            )
        return (
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column"
            }}>
                {showHeader && gameStatus}
                {scrollable ?
                    <div id="spaceWorldContainer" style={{flex: 1, position: "relative", overflowY: "auto"}}>
                        {spaceWorld}
                    </div> :
                    <div id="spaceWorldContainer" style={{position: "relative"}}>
                        {spaceWorld}
                    </div>
                }
                <Box m={1}>
                    <GameControls
                        controls={controlsSetting}
                        speed={speed}
                        onClick={onControlClicked}
                    />
                </Box>
            </div>
        );
    }
}

SpaceGame.propTypes = {
  taskId: PropTypes.string,
  gameState: PropTypes.object.isRequired,
  lengthLimit: PropTypes.object,
  onControlClicked: PropTypes.func,
  controls: PropTypes.array,
  speed: PropTypes.number.isRequired,
  width: PropTypes.number,
  showHeader: PropTypes.bool,
  scrollable: PropTypes.bool,
};

SpaceGame.defaultProps = {
  taskId: 'nameless-task',
  lengthLimit: { limit: null },
  controls: [],
  width: 280,
  showHeader: false,
  scrollable: true,
};


function evaluateVisibility(hiddenCondition, passiveCondition) {
  if (hiddenCondition) {
    return 'hidden';
  }
  if (passiveCondition) {
    return 'passive';
  }
  return 'active';
}

