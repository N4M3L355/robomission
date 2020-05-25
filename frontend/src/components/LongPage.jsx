/**
 * Shared component for all "classic" scrollable pages
 */
import React from 'react';
import PropTypes from 'prop-types';



export default function LongPage(props){

  const { children } = props;
  const longPageStyle = {
    maxWidth: 1200,
    margin: '20px auto',
    minHeight: '90vh',
    //backgroundColor: theme.palette.background,
  };
  return (
    <div style={longPageStyle}>
      {children}
    </div>
  );
}

LongPage.propTypes = {
  children: PropTypes.node,
  muiTheme: PropTypes.object,
};

LongPage.defaultProps = {
};

