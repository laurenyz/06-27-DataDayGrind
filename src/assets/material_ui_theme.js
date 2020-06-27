import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#1067b1',
        },
        secondary: {
          main: '#1067b1',
        },
        background: {
          paper: '#eeeeee',
          default: '#eeeeee'
        },
        text: {
          primary: "#424242"
        },
      },
    typography: {
      fontFamily: [
        "Open Sans",
        'sans-serif',
      ].join(','),
    },
  });

export default theme