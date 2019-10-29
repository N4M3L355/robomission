import React from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import theme2 from './newTheme'


export default function FlocsThemeProvider({ children }) {
  return (
      <ThemeProvider theme={theme2}>
        <div>
          {children}
        </div>
      </ThemeProvider>
  );
}

FlocsThemeProvider.propTypes = {
  children: PropTypes.node,
};

FlocsThemeProvider.defaultProps = {
  children: null,
};
