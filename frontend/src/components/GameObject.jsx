import React from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import Instructable from '../containers/Instructable';

export default function GameObject({ imageId, width, height, position, x, y }) {
  const imageStyle = {
    position,
  };
  return (
    <Instructable instruction={`task-${imageId}`} position="bottom-left">
      <Image imageId={imageId} x={x} y={y} width={width} height={height} style={imageStyle} />
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
  bottom: 0,
  left: 0,
};
