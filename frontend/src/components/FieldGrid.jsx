import React from 'react';

export default function FieldGrid({ keyX, keyY }) {
  let fieldStyle = {
    strokeWidth: 0.02,
    stroke:  '#555',
    fill: "none"
  };
  return (
    <rect width="1" height="1" x={keyX} y={keyY} style={fieldStyle}/>
  );
}
