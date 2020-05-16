import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {amber, cyan} from "@material-ui/core/colors";
//TODO: clean unused colors and reuse existing

const theme = createMuiTheme({

  overrides: {
    MuiButton:{
      outlined:{
        color: "rgba(255, 255, 255, 0.7)",
        borderColor: "rgba(255, 255, 255, 0.7)",
        borderWidth: '2px !important'     //im sorry for !important, but this was the most sane way of doing so and we probably won't need to change it
      },
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
        color: "rgba(255, 255, 255, 0.7)",
        borderWidth: '2px',
        borderStyle: 'solid',
        background: 'none',
        backgroundColor: 'none'

      }
    },
    MuiAppBar:{
      colorTransparent:{
        borderBottom: "2px solid white"
      }
    }
  },
  palette: {
    type: 'dark',
    primary: cyan,
    secondary: amber,
  },
  typography:{
    fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
  },
  shape: {
    borderRadius: 10
  }
});

export default responsiveFontSizes(theme);