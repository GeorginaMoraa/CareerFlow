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
} from "@mui/material";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;

const menu = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Applications", icon: <Work />, path: "/applications" },
  { text: "Analytics", icon: <BarChart />, path: "/analytics" },
  { text: "Calendar", icon: <CalendarMonth />, path: "/calendar" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
  { text: "Profile", icon: <Person />, path: "/profile" },
];

export default function AppDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: "#ffffff",
          borderRight: "1px solid #E2E8F0",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#eb25cd",
          }}
        >
          CareerFlow
        </Typography>
      </Toolbar>

      <List>
        {menu.map((item) => (
          <NavLink
            key={item.text}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItemButton
                selected={isActive}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  mb: 1,
                  "&.Mui-selected": {
                    backgroundColor: "#2563EB",
                    color: "#fff",
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>

                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}