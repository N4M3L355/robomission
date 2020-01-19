import React from 'react';
import PropTypes from 'prop-types';
import SvgImage from './SvgImage';
import Instructable from '../containers/Instructable';
//import { Keyframes, Frame } from 'react-keyframes';

export default function GameObject({ imageId, width, height, position, x, y }) {
  /*
  let styleSheet = document.styleSheets[0];

  let animationName = `animation${Math.round(Math.random() * 2**16)}`;
  let keyframes =
    `@-webkit-keyframes ${animationName} {
        10% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)} 
        90% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)}
        100% {-webkit-transform:translate(${Math.random() * 300}px, ${Math.random() * 300}px)}
    }`;

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);*/

  const imageStyle = {
    position,
    //animationName: animationName,
    animationDuration: "4s",
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
