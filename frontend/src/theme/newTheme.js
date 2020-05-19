import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {amber, cyan, grey} from "@material-ui/core/colors";
import {fade} from '@material-ui/core/styles/colorManipulator';
//TODO: clean unused colors and reuse existing

const theme = createMuiTheme({

  overrides: {
    MuiFab:{
      secondary:{
        color: fade(amber[500], 0.7),
        borderColor: fade(amber[500], 0.7),
        backgroundColor: 'initial',
        "&:hover":{
          color: amber[500],
          borderColor: amber[500],
          backgroundColor: fade(amber[500], 0.08),
        },

      },
      root:{
        borderWidth: '2px !important',     //im sorry for !important, but this was the most sane way of doing so and we probably won't need to change it
        borderStyle: 'solid',
        "&:disabled":{
          color: fade(grey[500], 0.7),
          borderColor: fade(grey[500], 0.7),
          backgroundColor: 'initial',
        }
      },
      label:{
        "&:disabled":{
          color: fade(grey[500], 0.7),
          borderColor: fade(grey[500], 0.7),
          backgroundColor: 'initial',
        }
      }

    },
    MuiButton:{
      outlined:{
        color: fade(grey[500], 0.7),
        borderColor: fade(grey[500], 0.7),
        "&:hover":{
          color: grey[500],
          borderColor: grey[500]
        },
        borderWidth: '2px !important'     //im sorry for !important, but this was the most sane way of doing so and we probably won't need to change it

      },
      outlinedPrimary:{
        color: fade(cyan[500], 0.7),
        borderColor: fade(cyan[500], 0.7),
        "&:hover":{
          color: cyan[500],
          borderColor: cyan[500]
        },
        borderWidth: '2px !important'     //im sorry for !important, but this was the most sane way of doing so and we probably won't need to change it

      },
      outlinedSecondary:{
        color: fade(amber[500], 0.7),
        borderColor: fade(amber[500], 0.7),
        "&:hover":{
          color: amber[500],
          borderColor: amber[500]
        },
        borderWidth: '2px !important'     //im sorry for !important, but this was the most sane way of doing so and we probably won't need to change it
      },
      root:{
        "&$disabled": {
          color: fade(grey[500], 0.7),
          borderColor: fade(grey[500], 0.7),
          "&:hover": {
            color: grey[500],
            borderColor: grey[500]
          },
          borderWidth: '2px !important'     //im sorry for !important, but this was the most sane way of doing so and we probably won't need to change it

        }
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
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h1:{
      fontFamily: `"Righteous", "Arial", sans-serif`
    },
    h2:{
      fontFamily: `"Righteous", "Arial", sans-serif`
    }
  },
  shape: {
    borderRadius: 10
  }
});

export default responsiveFontSizes(theme);