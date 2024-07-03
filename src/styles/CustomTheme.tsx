import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#616161", // Gray
    },
    secondary: {
      main: "#FFC107", // Yellow
    },
    background: {
      default: "#121212", // Dark gray
      paper: "#212121", // Slightly lighter gray
    },
    text: {
      primary: "#FFFFFF", // White
      secondary: "#BDBDBD", // Light gray
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Rounded corners
          boxShadow: "none", // Remove default shadow
          "&:hover": {
            boxShadow: "none", // Remove hover shadow
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 20, // Rounded corners
            "& fieldset": {
              borderColor: "#BDBDBD", // Light gray border
            },
          },
        },
      },
    },
  },
});

const MyDarkThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};

export default MyDarkThemeProvider;
