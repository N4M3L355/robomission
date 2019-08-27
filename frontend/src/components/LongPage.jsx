/**
 * Shared component for all "classic" scrollable pages
 */
import React from 'react';
import PropTypes from 'prop-types';
import {useTheme} from "@material-ui/styles";



export default function LongPage(props){

  const theme = useTheme();
  const { children } = props;
  const longPageStyle = {
    maxWidth: 1200,
    margin: '20px auto',
    minHeight: '90vh',
    backgroundColor: theme.palette.canvasColor,
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

