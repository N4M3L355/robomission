import cyan from '@material-ui/core/colors/cyan';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
//green700, green200, green800, green900,
import { fade } from '@material-ui/core/styles/colorManipulator';

const white = "#FFF";
// for defaults, meaning and customization, see:
// https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
const theme = {
  themeName: 'Flocs Theme',
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan[500],
    primary2Color: cyan[700],
    primary3Color: cyan[100],
    accent1Color: amber[500],
    accent2Color: amber[700],
    accent3Color: amber[100],
    textColor: white,
    secondaryTextColor: fade(white, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(white, 0.3),
    disabledColor: fade(white, 0.3),
    pickerHeaderColor: fade(white, 0.12),
    clockCircleColor: fade(white, 0.12),

    successColor: cyan[700],
  },
  raisedButton: {
    color: grey[700],
  },
  toggle: {
    thumbOffColor: grey[400],
    trackOffColor: grey[600],
  },
  dialog: {
    bodyFontSize: 18,
    bodyColor: white,
  },
};


export default theme;
