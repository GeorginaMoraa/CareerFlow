import { Suspense, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import AppDrawer from "./AppDrawer";
import TopBar from "./TopBar";

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppDrawer
        mobile={isMobile}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <Toolbar sx={{ minHeight: 70 }} />

        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 2, md: 3 },
            maxWidth: 1500,
            mx: "auto",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Suspense
                fallback={
                  <Box sx={{ display: "grid", placeItems: "center", py: 10 }}>
                    <CircularProgress />
                  </Box>
                }
              >
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
