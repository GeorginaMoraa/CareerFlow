import { Box, Toolbar } from "@mui/material";
import AppDrawer from "./AppDrawer";
import TopBar from "./TopBar";

const drawerWidth = 22;

export default function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
        }}
      >
        <TopBar />

        <Toolbar />

        <Box p={4}>{children}</Box>
      </Box>
    </Box>
  );
}