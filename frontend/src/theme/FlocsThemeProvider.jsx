import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import theme from './theme';


export default function FlocsThemeProvider({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  );
}

FlocsThemeProvider.propTypes = {
  children: PropTypes.node,
};

FlocsThemeProvider.defaultProps = {
  children: null,
};
