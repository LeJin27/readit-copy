import { createTheme } from "@mui/material/styles"
declare module '@mui/material/styles' {
  interface PaletteOptions {
    backgroundLight?: {
      main: string;
    };
  }
}

const commonTheme = {
  typography: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", sans-serif`,
    fontWeightMedium: 400,
    fontWeightRegular: 400,
    fontSize: 13,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCssBaseline: {
    },
  },
};

export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: "#007fff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: '#f58a07',
    },
    background: {
      default: "#f8f8f8",
      paper: "#ffffff",
    },
    backgroundLight: {
      main: '#2B2F36',
    }
  },
});

export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: "#007fff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: '#3CCD93',
    },
    background: {
      default: "#1A1A1A",
      paper: "#202127",
    },
    backgroundLight: {
      main: '#414752',
    }
  },
});

