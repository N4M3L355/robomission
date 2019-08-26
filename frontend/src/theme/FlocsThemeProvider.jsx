import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import theme2 from './newTheme'


export default function FlocsThemeProvider({ children }) {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <ThemeProvider theme={theme2}>
        <div>
          {children}
        </div>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

FlocsThemeProvider.propTypes = {
  children: PropTypes.node,
};

FlocsThemeProvider.defaultProps = {
  children: null,
};
