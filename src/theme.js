import { createTheme } from "@mui/material/styles";

// ✅ NEW DESIGN: Light background with Green/Emerald accent + Glassmorphic sidebar
const theme = createTheme({
  palette: {
    primary: {
      main: "#10B981", // Emerald Green
      light: "#34D399", // Light Emerald
      dark: "#059669", // Dark Emerald
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#14B8A6", // Teal complement
      light: "#2DD4BF",
      dark: "#0D9488",
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
    },
    warning: {
      main: "#F59E0B",
      light: "#FBBF24",
      dark: "#D97706",
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#DC2626",
    },
    info: {
      main: "#06B6D4",
      light: "#22D3EE",
      dark: "#0891B2",
    },
    background: {
      default: "#F5F5F5", // Light gray background
      paper: "#FFFFFF",
    },
    divider: "#E5E7EB",
    text: {
      primary: "#111827", // Darker text for light background
      secondary: "#6B7280",
      disabled: "#9CA3AF",
    },
  },

  shape: {
    borderRadius: 8,
  },

  spacing: 8, // Base 8px spacing system

  typography: {
    fontFamily:
      '"Poppins", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

    // h1: Display heading for hero sections
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },

    // h2: Large section heading
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },

    // h3: Section heading
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    // h4: Card/block heading
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },

    // h5: Subsection heading
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },

    // h6: Small heading
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },

    // Subtitle for descriptive text
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.5,
      color: "#6B7280",
    },

    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
      color: "#6B7280",
    },

    // Body text
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },

    // Buttons
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
    },

    // Captions and labels
    caption: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.66,
      letterSpacing: "0.02em",
    },
  },

  components: {
    // Button customization
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 16px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px rgba(16, 185, 129, 0.15)",
          },
        },
        contained: {
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.12)",
          background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        },
        outlined: {
          borderWidth: "1.5px",
          borderColor: "#10B981",
          color: "#10B981",
          "&:hover": {
            borderWidth: "1.5px",
            background: "rgba(16, 185, 129, 0.05)",
          },
        },
      },
    },

    // Card customization - Glassmorphic effect
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow:
              "0 8px 24px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
            background: "rgba(255, 255, 255, 0.8)",
          },
        },
      },
    },

    // TextField customization
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(8px)",
            "& fieldset": {
              borderColor: "rgba(229, 231, 235, 0.5)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(16, 185, 129, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#10B981",
              borderWidth: "2px",
            },
          },
        },
      },
    },

    // Chip customization
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          background: "rgba(16, 185, 129, 0.1)",
          color: "#059669",
        },
        outlined: {
          borderColor: "rgba(16, 185, 129, 0.3)",
        },
      },
    },

    // AppBar customization
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(8px)",
          color: "#111827",
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        },
      },
    },

    // Drawer customization - Dark glassmorphic
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundImage: "none",
        },
      },
    },

    // Paper component
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        elevation0: {
          border: "1px solid rgba(229, 231, 235, 0.5)",
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(8px)",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
        },
      },
    },

    // Table customization
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(245, 245, 245, 0.5)",
          backdropFilter: "blur(8px)",
          "& .MuiTableCell-head": {
            fontWeight: 600,
            color: "#111827",
            borderColor: "rgba(229, 231, 235, 0.5)",
          },
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(245, 245, 245, 0.6)",
          },
        },
      },
    },
  },
});

export default theme;
