import React from 'react';
import PropTypes from 'prop-types';

export default function SvgImage({ imageId, style, ...otherProps }) {
  // default extension is 'png'
  const name = imageId.includes('.') ? imageId : `${imageId}.png`;
  // eslint-disable-next-line global-require
  const sourcePath = require(`../images/${name}`);
  return (
    <image href={sourcePath} alt={imageId} style={style} {...otherProps} />
  );
}

SvgImage.propTypes = {
  imageId: PropTypes.string.isRequired,
  style: PropTypes.object,
};

SvgImage.defaultProps = {
  style: {},
};
