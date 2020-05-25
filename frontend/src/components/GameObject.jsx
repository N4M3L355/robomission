import React from 'react';
import PropTypes from 'prop-types';
import SvgImage from './SvgImage';
import Instructable from '../containers/Instructable';

export default function GameObject({ imageId, position, x, y, lastAction, pauseLength, cols, rows }) {
  let animationName = `animation${Math.round(Math.random() * 2 ** 16)}`;
  let startPosition;
  if(imageId === "spaceship"){
    switch (lastAction) {
      case "fly":
        startPosition = `0% {-webkit-transform:translate(0, ${100/rows}%)}`;
        break;
      case "left":
        startPosition = `0% {-webkit-transform:translate(${100/cols}%, ${100/rows}%)}`;
        break;
      case "right":
        startPosition = `0% {-webkit-transform:translate(-${100/cols}%,${100/rows}%)}`;
        break;
      default:
        startPosition = `0% {-webkit-transform:translate(0, 0)}`;
    }
  }

    let styleSheet = document.styleSheets[0];

    let keyframes =
      `@-webkit-keyframes ${animationName} {
        ${startPosition}
        100% {-webkit-transform:translate(0, 0)}
    }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);


  const imageStyle = {
    WebkitTransform: "translate(0, 0)",
    position,
    animationName: animationName,
    animationDuration: `${pauseLength*0.5}ms`,    //well the 0.5 is magic number, i am sorry but pauseLength*1 was glitchy with lower speeds of simulation TODO: well this could be better
  };
  return (
      <Instructable instruction={`task-${imageId}`} position="bottom-left">
          <SvgImage imageId={imageId} x={x} y={y}  width="1" height="1" style={imageStyle} />
      </Instructable>
  );
}

GameObject.propTypes = {
  imageId: PropTypes.string.isRequired,
  position: PropTypes.string,
  bottom: PropTypes.number,
  left: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  cols: PropTypes.number,
  rows: PropTypes.number,
};

GameObject.defaultProps = {
  position: 'relative',
  bottom: 0,
  left: 0,
};
