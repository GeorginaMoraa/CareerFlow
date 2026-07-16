import React from "react";

import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import AppDrawer from "./AppDrawer";
import TopBar from "./TopBar";

export const DRAWER_WIDTH = 260;

export default function Layout({ children }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();

  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  const drawerOpen = isMobile ? mobileDrawerOpen : true;

  // Auto-close the mobile drawer whenever the route changes
  React.useEffect(() => {
    if (isMobile) {
      setMobileDrawerOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        position: "relative",
        background: "#F5F5F5",
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.06) 0%, transparent 45%),
          radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.05) 0%, transparent 40%)
        `,
        backgroundAttachment: "fixed",

        // Custom scrollbar, applied globally within the layout
        "& *": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(16, 185, 129, 0.3) transparent",
        },
        "& *::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "& *::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "& *::-webkit-scrollbar-thumb": {
          background: "rgba(16, 185, 129, 0.25)",
          borderRadius: 8,
        },
        "& *::-webkit-scrollbar-thumb:hover": {
          background: "rgba(16, 185, 129, 0.45)",
        },
      }}
    >
      <AppDrawer
        open={drawerOpen}
        mobile={isMobile}
        onClose={() => setMobileDrawerOpen(false)}
      />

      <Box
        component="main"

        sx={{
          flexGrow: 1,

          width: "100%",

          minWidth: 0,

          ml: {
            xs: 0,
            md: 0,
          },
        }}
      >
        <TopBar onMenuClick={() => setMobileDrawerOpen((prev) => !prev)} />

        {/* pushes content below fixed navbar */}

        <Toolbar />

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 3,
              md: 3,
            },

            py: {
              xs: 2,
              md: 3,
            },

            maxWidth: "1500px",

            mx: "auto",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
