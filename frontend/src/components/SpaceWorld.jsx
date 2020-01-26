import React from 'react';
import PropTypes from 'prop-types';
import GameObject from './GameObject';
import SpaceBackgroundGrid from './SpaceBackgroundGrid';
import Instructable from '../containers/Instructable';

export default function SpaceWorld({ fields, width, pastActions, pauseLength }) {
  const { cols, backgrounds, objects, rows } = prepareFields(fields);
  const fieldSize = width / cols;
  const height = fieldSize * rows;
  console.log(pastActions,pastActions[pastActions.length-1]);
  /*const worldStyle = {
    display: 'block',
    position: 'relative',
  };*/
  return (
    <Instructable instruction="task-space-world" position="bottom">
      <svg width={width} height={height}>
        <SpaceBackgroundGrid backgroundColors={backgrounds} fieldSize={fieldSize} width={width} height={height}/>
        <svg width={width} height={height}>
          {objects.map((object, index) =>
            <GameObject
              pauseLength={pauseLength}
              // The key must change if the object type changes in order to
              // unregister old instructable and register the new one.
              lastAction = {pastActions[pastActions.length-1]}
              key={`${index}-${object.imageId}`}
              imageId={object.imageId}
              width={fieldSize}
              height={fieldSize}
              y={object.row * fieldSize}
              x={object.col * fieldSize}
            />
          )}
        </svg>
      </svg>
    </Instructable>
  );
}

SpaceWorld.propTypes = {
  fields: PropTypes.array.isRequired,
  width: PropTypes.number,
};


SpaceWorld.defaultProps = {
  width: 280,
};


const IMAGE_TYPES = {
  S: 'spaceship',
  A: 'asteroid',
  M: 'meteoroid',
  D: 'diamond',
  W: 'wormhole',
  X: 'wormhole2',
  Y: 'wormhole3',
  Z: 'wormhole4',
  explosion: 'explosion',
  laser: 'laser',
  'laser-start': 'laser-start',
  'laser-end': 'laser-end',
  'spaceship-broken': 'spaceship-broken',
  'spaceship-out-left': 'spaceship-out-left',
  'spaceship-out-right': 'spaceship-out-right',
  'spaceship-out-top': 'spaceship-out-top',
};


const emptyWorld = {
  rows: 1,
  cols: 1,
  backgrounds: [['k']],
  objects: [],
};


function prepareFields(fields) {
  if (fields == null || fields.length === 0) {
    return emptyWorld;
  }
  const rows = fields.length;
  const cols = fields[0].length;
  const backgrounds = fields.map(row => row.map(field => field[0]));
  const objects = [];
  fields.forEach((row, i) => row.forEach((field, j) => field[1].forEach(object => {
    objects.push({ imageId: IMAGE_TYPES[object], row: i, col: j });
  })));
  return { rows, cols, backgrounds, objects };
}
