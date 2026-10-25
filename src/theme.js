import { createTheme } from "@mui/material/styles";

export function createAppTheme(mode = "light") {
  const dark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#10B981",
        light: "#34D399",
        dark: "#059669",
        contrastText: "#FFFFFF",
      },
      secondary: { main: "#8B5CF6" },
      success: { main: "#10B981" },
      warning: { main: "#F59E0B" },
      error: { main: "#EF4444" },
      info: { main: "#06B6D4" },
      background: dark
        ? { default: "#0B1220", paper: "#111A2E" }
        : { default: "#F5F7F9", paper: "#FFFFFF" },
      divider: dark ? "rgba(255,255,255,0.1)" : "#E5E7EB",
      text: dark
        ? { primary: "#F1F5F9", secondary: "#94A3B8" }
        : { primary: "#111827", secondary: "#6B7280" },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 10 } },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
      MuiCard: {
        defaultProps: { variant: "outlined" },
        styleOverrides: { root: { borderRadius: 16 } },
      },
      MuiTableCell: {
        styleOverrides: { head: { fontWeight: 700, whiteSpace: "nowrap" } },
      },
    },
  });
}
