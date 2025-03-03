"use client"; // Ensures MUI is only run on the client

import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

// Define your MUI theme
const theme = createTheme({
  palette: {
    primary: { main: "#007bff" },
    secondary: { main: "#ff4081" },
  },
});

export default function MuiProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensures component renders only after client mount
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <ThemeProvider theme={theme}>
      
      {children}
    </ThemeProvider>
  );
}