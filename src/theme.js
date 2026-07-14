import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#4F46E5",
    },
    success: {
      main: "#22C55E",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F5F7FB",
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;