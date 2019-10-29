import {createMuiTheme} from "@material-ui/core";
import {amber, cyan, grey} from "@material-ui/core/colors";
let fullWhite = "#FFF";


const theme = createMuiTheme({

  overrides: {
    MuiButton:{
      outlined:{
        color: "rgba(255, 255, 255, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.7)",
      }
    }
  },
  palette: {
    type: 'dark',
    primary: cyan,
    secondary: amber,
    text: {
      primary: fullWhite,
      secondary: "rgba(255, 255, 255, 0.7)"

    }
  },

  textColor: fullWhite,
  secondaryTextColor: grey[700],
  alternateTextColor: '#303030',
  canvasColor: '#303030',
  borderColor: grey[300],
  disabledColor: grey[300],
  pickerHeaderColor: grey[100],
  clockCircleColor: grey[100],

  successColor: cyan[700],

  raisedButton: {
    color: grey[700],
  },
  toggle: {
    thumbOffColor: grey[400],
    trackOffColor: grey[600],
  },
  dialog: {
    bodyFontSize: 18,
    bodyColor: fullWhite,
  },
});

export default theme;