import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {amber, cyan, grey} from "@material-ui/core/colors";
let fullWhite = "#FFF";

//TODO: clean unused colors and reuse existing

const theme = createMuiTheme({

  overrides: {
    MuiButton:{
      outlined:{
        color: "rgba(255, 255, 255, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: '2px'
      },
      outlinedPrimary:{
        borderWidth: '2px'

      }
    },
    MuiGridListTile:{
      root:{
        color: "rgba(255, 255, 255, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '12px'
      }
    },
    MuiCard:{
      root:{
        background: "none"
      }
    },
    MuiPaper:{
      outlined:{
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: '2px',
        borderStyle: 'solid'
      }
    },
    MuiAvatar:{

      colorDefault:{
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: '2px',
        borderStyle: 'solid',
        background: 'none',
        backgroundColor: 'none'

      }
    },
    MuiAppBar:{
      colorTransparent:{
        color: "none"         //this was originally inherit and it was making text black
      }
    }
  },
  palette: {
    type: 'dark',
    primary: cyan,
    secondary: amber,
  },
/*
  textColor: fullWhite,
  secondaryTextColor: grey[700],
  alternateTextColor: '#303030',
  canvasColor: '#000',
  borderColor: grey[300],
  disabledColor: grey[300],
  pickerHeaderColor: grey[100],
  clockCircleColor: grey[100],

  successColor: cyan[700],*/
  typography:{
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  },
  /*
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
  },*/
  shape: {
    borderRadius: 10
  }
});

export default responsiveFontSizes(theme);