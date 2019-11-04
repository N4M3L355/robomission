import React from 'react';
import PropTypes from 'prop-types';
import FieldBackground from './FieldBackground';
import spaceBackgroundPath from '../images/background-space.png';
import FieldGrid from "./FieldGrid";

export default function SpaceBackgroundGrid({backgroundColors, fieldSize, width, height}) {
  return (
    <svg width={width} height={height}>
      <defs>
        <pattern id="bgimg" x="0" y="0" width={width} height={width}
                 patternUnits="userSpaceOnUse" preserveAspectRatio="xMinYMin slice">
          <image x="0" y="0" width={width} height={width}
                 href={spaceBackgroundPath}/>
        </pattern>
      </defs>
      <rect fill="url(#bgimg)" width={width} height={height}/>
      {backgroundColors.map((backgroundsRow, index) =>
        backgroundsRow.map((background, bgIndex) => (
            <FieldBackground keyX={bgIndex} keyY={index} color={background} size={fieldSize}/>
          )
        )
      )}
      {backgroundColors.map((backgroundsRow, index) =>
        backgroundsRow.map((background, bgIndex) => (
            <FieldGrid keyX={bgIndex} keyY={index} size={fieldSize}/>
          )
        )
      )}
    </svg>
  );
}
SpaceBackgroundGrid.propTypes = {
  backgroundColors: PropTypes.array.isRequired,
  fieldSize: PropTypes.number.isRequired,
};
