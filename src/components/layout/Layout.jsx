import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import AppDrawer from "./AppDrawer";
import TopBar from "./TopBar";
import React from "react";

// ✅ FIXED: Changed from 22px to proper 256px drawer width
const DRAWER_WIDTH = 256;
const DRAWER_WIDTH_COLLAPSED = 80;

export default function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(!isMobile);

  const actualDrawerWidth = drawerOpen ? DRAWER_WIDTH : (isMobile ? 0 : DRAWER_WIDTH_COLLAPSED);

  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer open={drawerOpen} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : `${actualDrawerWidth}px`,
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          transition: "margin-left 0.3s ease",
        }}
      >
        <TopBar 
          onMenuClick={() => setDrawerOpen(!drawerOpen)}
          drawerOpen={drawerOpen}
        />

        <Toolbar /> {/* Spacing for fixed app bar */}

        <Box 
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}