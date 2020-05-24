import React from 'react';
import PropTypes from 'prop-types';
import GameObject from './GameObject';
import SpaceBackgroundGrid from './SpaceBackgroundGrid';
import Instructable from '../containers/Instructable';

export default function SpaceWorld({ fields, pastActions, pauseLength, scrollable }) {
  const { cols, backgrounds, objects, rows } = prepareFields(fields);

  return (
    <Instructable instruction="task-space-world" position="bottom">
      <div style={scrollable?{position: "absolute", top: 0, bottom: 0, left: 0, right:0, display: "flex", alignItems: "start"}:{display: "flex"}}>
          <svg width="100%"  style={{maxHeight: scrollable?"100vh":"40vh"}} viewBox={`0 0 ${cols} ${rows}`}>
            <SpaceBackgroundGrid backgroundColors={backgrounds}/>
            {objects.map((object, index) =>
                <GameObject
                    pauseLength={pauseLength}
                    // The key must change if the object type changes in order to
                    // unregister old instructable and register the new one.
                    lastAction = {pastActions[pastActions.length-1]}
                    key={`${index}-${object.imageId}`}
                    imageId={object.imageId}
                    cols={cols}
                    rows={rows}
                    y={object.row}
                    x={object.col}
                />
            )}
          </svg>
      </div>

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
