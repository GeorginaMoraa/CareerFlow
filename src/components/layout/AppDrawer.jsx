import {
  Dashboard,
  Work,
  BarChart,
  CalendarMonth,
  Settings,
  Person,
} from "@mui/icons-material";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";

import { NavLink } from "react-router-dom";

import { DRAWER_WIDTH } from "./Layout";

const menu = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/",
  },

  {
    text: "Applications",
    icon: <Work />,
    path: "/applications",
  },

  {
    text: "Analytics",
    icon: <BarChart />,
    path: "/analytics",
  },

  {
    text: "Calendar",
    icon: <CalendarMonth />,
    path: "/calendar",
  },

  {
    text: "Settings",
    icon: <Settings />,
    path: "/settings",
  },

  {
    text: "Profile",
    icon: <Person />,
    path: "/profile",
  },
];

export default function AppDrawer({ open, mobile, onClose }) {
  return (
    <Drawer
      variant={mobile ? "temporary" : "permanent"}

      open={open}

      onClose={onClose}

      ModalProps={{
        keepMounted: true,
      }}

      sx={{
        width: DRAWER_WIDTH,

        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,

          boxSizing: "border-box",

          background: "rgba(15, 23, 42, 0.95)",

          backdropFilter: "blur(12px)",

          color: "#fff",

          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography
            variant="h5"

            fontWeight={800}

            sx={{
              color: "#10B981",
            }}
          >
            CareerFlow
          </Typography>

          <Typography
            variant="caption"

            sx={{
              color: "#94A3B8",
            }}
          >
            Career Management
          </Typography>
        </Box>
      </Toolbar>

      <List
        sx={{
          px: 2,

          mt: 2,
        }}
      >
        {menu.map((item) => (
          <NavLink
            key={item.text}

            to={item.path}

            style={{
              textDecoration: "none",

              color: "inherit",
            }}
          >
            {({ isActive }) => (
              <ListItemButton
                selected={isActive}

                sx={{
                  borderRadius: 3,

                  mb: 1,

                  "&:hover": {
                    background: "#1E293B",
                  },

                  "&.Mui-selected": {
                    background: "rgba(16, 185, 129, 0.2)",

                    backdropFilter: "blur(8px)",

                    borderLeft: "3px solid #10B981",

                    paddingLeft: "calc(16px - 3px)",

                    "&:hover": {
                      background: "rgba(16, 185, 129, 0.25)",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",

                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}

                  primaryTypographyProps={{
                    fontWeight: 600,
                  }}
                />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
