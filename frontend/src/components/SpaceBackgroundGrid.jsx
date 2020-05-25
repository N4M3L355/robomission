import React from 'react';
import PropTypes from 'prop-types';
import FieldBackground from './FieldBackground';
import spaceBackgroundPath from '../images/background-space.png';
import FieldGrid from "./FieldGrid";

export default function SpaceBackgroundGrid({backgroundColors}) {
  return (
    <svg width={backgroundColors[0].length}>
      <defs>
        <pattern id="bgimg" x="0" y="0" width="5" height="5"
                 patternUnits="userSpaceOnUse" preserveAspectRatio="xMidYMid slice">
          <image x="0" y="0" width="5" height="5"
                 href={spaceBackgroundPath}/>
        </pattern>
      </defs>
      <rect fill="url(#bgimg)" width={backgroundColors[0].length} height={backgroundColors.length} />
      {backgroundColors.map((backgroundsRow, index) =>
        backgroundsRow.map((background, bgIndex) => (
            <FieldBackground key={`${bgIndex}|${bgIndex}bg`} keyX={bgIndex} keyY={index} color={background}/>
          )
        )
      )}
      {backgroundColors.map((backgroundsRow, index) =>
        backgroundsRow.map((background, bgIndex) => (
            <FieldGrid key={`${bgIndex}|${bgIndex}grid`} keyX={bgIndex} keyY={index}/>
          )
        )
      )}
    </svg>
  );
}
SpaceBackgroundGrid.propTypes = {
  backgroundColors: PropTypes.array.isRequired,
};
