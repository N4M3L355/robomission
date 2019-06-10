import React from 'react';
import PropTypes from 'prop-types';

export default function FieldGrid({ size, keyX, keyY }) {
  let fieldStyle = {
    strokeWidth: 1,
    stroke:  '#555',
    fill: "none"
  };
  return (
    <rect width={size} height={size} x={keyX*size} y={keyY*size} style={fieldStyle}/>
  );
}

FieldGrid.propTypes = {
  size: PropTypes.number.isRequired,
};
