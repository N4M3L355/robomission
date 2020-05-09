import React from 'react';
import PropTypes from 'prop-types';
import SvgImage from './SvgImage';

export default function Icon({ name, style }) {
  const iconStyle = {
    height: '1em',
    width: '1em',
    position: 'relative',
    ...style,
  };

  return (
      <svg style={iconStyle}>
        <SvgImage imageId={`icon-${name}.svg`}  />
      </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Icon.defaultProps = {
  style: {},
};
