import React from 'react';
import PropTypes from 'prop-types';
import blueBackgroundPath from '../images/background-blue-goal.png';
import redBackgroundPath from '../images/background-red.png';
import greenBackgroundPath from '../images/background-green.png';
import yellowBackgroundPath from '../images/background-yellow.png';

export default function FieldBackground({ color, size, keyX, keyY }) {
  const backgroundImgPath = {
    r: redBackgroundPath,
    g: greenBackgroundPath,
    b: blueBackgroundPath,
    y: yellowBackgroundPath,
  }[color];
  return (
    <image width={size} height={size} x={keyX*size} y={keyY*size} href={backgroundImgPath} />
  )
}

FieldBackground.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
