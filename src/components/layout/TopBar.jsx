import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import {
  Notifications,
  DarkMode,
} from "@mui/icons-material";

export default function TopBar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
          }}
        >
          Good Evening, Georgina 👋
        </Typography>

        <Box display="flex" gap={1}>
          <IconButton>
            <DarkMode />
          </IconButton>

          <IconButton>
            <Notifications />
          </IconButton>

          <Avatar>G</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}