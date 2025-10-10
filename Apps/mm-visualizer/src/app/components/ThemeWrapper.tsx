"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "../../theme/theme";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { Fab } from "@mui/material";
import React from "react";
import { storeCookieTheme } from "./actions";

export default function ThemeWrapper({
  children,
  initialTheme
}: {
  children: React.ReactNode;
  initialTheme: string
}) {
  const [themeMode, setThemeMode] = React.useState(initialTheme);

  const handleClick = async() => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      await storeCookieTheme('dark')
    } else {
      setThemeMode('light')
      await storeCookieTheme('light')
    }
  };
  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
      <Fab
        aria-label="theme-button"
        onClick={() => handleClick()}
        color="primary"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 9999,
        }}
      >
        {themeMode === 'dark' ? <SunnyIcon /> : <BedtimeIcon />}
      </Fab>
    </ThemeProvider>
  );
}
