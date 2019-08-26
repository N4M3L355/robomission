import {createMuiTheme} from "@material-ui/core";
import {amber, cyan, grey} from "@material-ui/core/colors";
import {cyan700, fullWhite} from "material-ui/styles/colors";
import {fade} from "material-ui/utils/colorManipulator";


let theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: amber,
    text: {
      primary: "#FFF",
      secondary: "rgba(255, 255, 255, 0.7)"
    }
  },

  textColor: fullWhite,
  secondaryTextColor: fade(fullWhite, 0.7),
  alternateTextColor: '#303030',
  canvasColor: '#303030',
  borderColor: fade(fullWhite, 0.3),
  disabledColor: fade(fullWhite, 0.3),
  pickerHeaderColor: fade(fullWhite, 0.12),
  clockCircleColor: fade(fullWhite, 0.12),

  successColor: cyan700,

  raisedButton: {
    color: grey[700],
  },
  toggle: {
    thumbOffColor: grey[400],
    trackOffColor: grey[600],
  },
  dialog: {
    bodyFontSize: 18,
    bodyColor: "#FFF",
  },
});

export default theme;