import React from 'react';
import PropTypes from 'prop-types';
import SvgImage from './SvgImage';

export default function Icon({ name, style }) {
  const iconStyle = {
    height: '1em',
    position: 'relative',
    top: '0.1em',
    ...style,
  };

  return (
    <SvgImage imageId={`icon-${name}.svg`} style={iconStyle} />
  );
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
};

Icon.defaultProps = {
  style: {},
};
