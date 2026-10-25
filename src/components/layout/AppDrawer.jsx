import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  BarChart,
  CalendarMonth,
  Dashboard,
  Person,
  Settings,
  ViewKanban,
  Work,
} from "@mui/icons-material";

export const DRAWER_WIDTH = 260;

const menu = [
  { text: "Dashboard", icon: <Dashboard />, path: "/", end: true },
  { text: "Applications", icon: <Work />, path: "/applications" },
  { text: "Pipeline", icon: <ViewKanban />, path: "/pipeline" },
  { text: "Calendar", icon: <CalendarMonth />, path: "/calendar" },
  { text: "Analytics", icon: <BarChart />, path: "/analytics" },
  { text: "Profile", icon: <Person />, path: "/profile" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

export default function AppDrawer({ open, mobile, onClose }) {
  return (
    <Drawer
      variant={mobile ? "temporary" : "permanent"}
      open={mobile ? open : true}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: mobile ? 0 : DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          background: "#0F172A",
          color: "#fff",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        },
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <Box>
          <Typography variant="h5" fontWeight={800} sx={{ color: "#10B981" }}>
            CareerFlow
          </Typography>
          <Typography variant="caption" sx={{ color: "#94A3B8" }}>
            Career management
          </Typography>
        </Box>
      </Toolbar>

      <List sx={{ px: 2, mt: 1 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            end={item.end}
            onClick={mobile ? onClose : undefined}
            sx={{
              borderRadius: 3,
              mb: 0.5,
              color: "#CBD5E1",
              "&:hover": { background: "#1E293B" },
              "&.active": {
                background: "rgba(16,185,129,0.18)",
                color: "#fff",
                boxShadow: "inset 3px 0 0 #10B981",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              slotProps={{ primary: { fontWeight: 600 } }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
