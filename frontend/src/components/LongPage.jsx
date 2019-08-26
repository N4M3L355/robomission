/**
 * Shared component for all "classic" scrollable pages
 */
import React from 'react';
import PropTypes from 'prop-types';


class LongPage extends React.Component {
  render() {
    const { children, muiTheme } = this.props;
    const longPageStyle = {
      maxWidth: 1200,
      margin: '20px auto',
      minHeight: '90vh',
      backgroundColor: muiTheme.palette.canvasColor,
    };
    return (
      <div style={longPageStyle}>
        {children}
      </div>
    );
  }
}

LongPage.propTypes = {
  children: PropTypes.node,
  muiTheme: PropTypes.object,
};

LongPage.defaultProps = {
};

export default LongPage;
