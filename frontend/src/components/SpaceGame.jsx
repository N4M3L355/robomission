import React from 'react';
import PropTypes from 'prop-types';
import GameStatus from './GameStatus';
import SpaceWorld from './SpaceWorld';
import GameControls from './GameControls';


export default class SpaceGame extends React.Component {
    componentDidMount() {
        let spacegameBB = document.querySelector('#spaceWorldContainer');
        spacegameBB.scrollBy(0,spacegameBB.scrollTopMax);                       //TODO: this is hack so the user sees bottom of the simulator.
        /*
        let spacegameBB = document.querySelector('#spaceWorldContainer').getBoundingClientRect();
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
        const loadHandler = (e) => {

        }


        return (
            <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column"
            }}>
                {showHeader && gameStatus}
                <div id="spaceWorldContainer" onLoad={loadHandler} style={{flex: 1, position: "relative", overflowY: "auto"}}>
                    <SpaceWorld
                        fields={fields}
                        pastActions={pastActions}
                        width={width}
                        pauseLength={pauseLength}
                    />

                </div>

                <GameControls
                    controls={controlsSetting}
                    speed={speed}
                    onClick={onControlClicked}
                />
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
};

SpaceGame.defaultProps = {
  taskId: 'nameless-task',
  lengthLimit: { limit: null },
  controls: [],
  width: 280,
  showHeader: false,
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

