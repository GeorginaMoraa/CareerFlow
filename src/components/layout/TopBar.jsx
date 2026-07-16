import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  NotificationsOutlined,
  DarkModeOutlined,
  Search,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { DRAWER_WIDTH } from "./Layout";

export default function TopBar({ onMenuClick }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"

      elevation={0}

      sx={{
        width: {
          md: `calc(100% - ${DRAWER_WIDTH}px)`,
          xs: "100%",
        },

        ml: {
          md: `${DRAWER_WIDTH}px`,
          xs: 0,
        },

        background: "rgba(255, 255, 255, 0.8)",

        backdropFilter: "blur(8px)",

        color: "#111827",

        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",

        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",

        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          height: 70,

          px: {
            xs: 2,
            md: 4,
          },
        }}
      >
        {isMobile && (
          <IconButton onClick={onMenuClick} sx={{ mr: 2, color: "#111827" }}>
            <MenuIcon />
          </IconButton>
        )}

        <Box flexGrow={1}>
          <Typography
            variant="h6"

            fontWeight={700}

            sx={{
              lineHeight: 1.2,
              color: "#111827",
            }}
          >
            Good Evening, Georgina 👋
          </Typography>

          <Typography
            variant="body2"

            color="text.secondary"
          >
            Track your job applications and career progress
          </Typography>
        </Box>

        <Tooltip title="Search">
          <IconButton sx={{ color: "#6B7280" }}>
            <Search />
          </IconButton>
        </Tooltip>

        <Tooltip title="Dark mode">
          <IconButton sx={{ color: "#6B7280" }}>
            <DarkModeOutlined />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton sx={{ color: "#6B7280" }}>
            <NotificationsOutlined />
          </IconButton>
        </Tooltip>

        <Avatar
          sx={{
            ml: 2,

            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",

            fontWeight: 700,

            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
          }}
        >
          G
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
