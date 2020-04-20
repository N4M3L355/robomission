import React from 'react';
import PropTypes from 'prop-types';
import SvgImage from './SvgImage';
import Instructable from '../containers/Instructable';
//import { Keyframes, Frame } from 'react-keyframes';

export default function GameObject({ imageId, width, height, position, x, y, lastAction, pauseLength }) {
  let animationName = `animation${Math.round(Math.random() * 2 ** 16)}`;
  let startPosition;
  if(imageId === "spaceship"){
    switch (lastAction) {
      case "fly":
        startPosition = `0% {-webkit-transform:translate(0px, ${height}px)}`;
        break;
      case "left":
        startPosition = `0% {-webkit-transform:translate(${height}px, ${height}px)}`;
        break;
      case "right":
        startPosition = `0% {-webkit-transform:translate(${-height}px, ${height}px)}`;
        break;
      default:
        startPosition = `0% {-webkit-transform:translate(0px, 0px)}`;
    }
  }

    let styleSheet = document.styleSheets[0];

    let keyframes =
      `@-webkit-keyframes ${animationName} {
        ${startPosition}
        100% {-webkit-transform:translate(0px, 0px)}
    }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);


  const imageStyle = {
    WebkitTransform: "translate(0px, 0px)",
    position,
    animationName: animationName,
    animationDuration: `${pauseLength*0.5}ms`,
  };
  return (
      <Instructable instruction={`task-${imageId}`} position="bottom-left">
          <SvgImage imageId={imageId} x={x} y={y} width={width} height={height} style={imageStyle} />
      </Instructable>
  );
}

GameObject.propTypes = {
  imageId: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.string,
  bottom: PropTypes.number,
  left: PropTypes.number,
};

GameObject.defaultProps = {
  position: 'relative',
  bottom: 0,
  left: 0,
};
