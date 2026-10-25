import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  NotificationsOutlined,
  Search,
} from "@mui/icons-material";
import { addDays, isBefore, startOfDay } from "date-fns";

import { DRAWER_WIDTH } from "./AppDrawer";
import { useJobs } from "../../hooks/useJobs";
import { useSettings } from "../../hooks/useSettings";
import {
  formatDate,
  getGreeting,
  interviewDateTime,
} from "../../utils/helpers";

export default function TopBar({ onMenuClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { jobs } = useJobs();
  const { profile, preferences, updatePreferences } = useSettings();

  const [query, setQuery] = useState("");
  const [anchor, setAnchor] = useState(null);

  const today = startOfDay(new Date());
  const weekAhead = addDays(today, 8);
  const upcoming = preferences.interviewReminders
    ? jobs
        .flatMap((job) =>
          job.interviews.map((i) => ({
            job,
            interview: i,
            at: interviewDateTime(i),
          }))
        )
        .filter(
          (x) => x.at && !isBefore(x.at, today) && isBefore(x.at, weekAhead)
        )
        .sort((a, b) => a.at - b.at)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/applications?q=${encodeURIComponent(q)}` : "/applications");
  };

  const initial = (profile.firstName || "?").charAt(0).toUpperCase();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        ml: { md: `${DRAWER_WIDTH}px` },
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ minHeight: 70, gap: 1, px: { xs: 2, md: 4 } }}>
        {isMobile && (
          <IconButton edge="start" onClick={onMenuClick} aria-label="Open menu">
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="h6" noWrap sx={{ lineHeight: 1.2 }}>
            {getGreeting()}
            {profile.firstName ? `, ${profile.firstName}` : ""} 👋
          </Typography>
          {!isMobile && (
            <Typography variant="body2" color="text.secondary" noWrap>
              Track your job applications and career progress
            </Typography>
          )}
        </Box>

        {!isMobile && (
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              alignItems: "center",
              px: 1.5,
              width: 260,
              borderRadius: 3,
              bgcolor: "action.hover",
            }}
          >
            <Search fontSize="small" color="disabled" />
            <InputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search applications…"
              inputProps={{ "aria-label": "Search applications" }}
              sx={{ ml: 1, flex: 1, fontSize: 14 }}
            />
          </Box>
        )}

        <Tooltip title={preferences.darkMode ? "Light mode" : "Dark mode"}>
          <IconButton
            onClick={() =>
              updatePreferences({ darkMode: !preferences.darkMode })
            }
          >
            {preferences.darkMode ? (
              <LightModeOutlined />
            ) : (
              <DarkModeOutlined />
            )}
          </IconButton>
        </Tooltip>

        <Tooltip title="Upcoming interviews">
          <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
            <Badge badgeContent={upcoming.length} color="error">
              <NotificationsOutlined />
            </Badge>
          </IconButton>
        </Tooltip>

        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Box sx={{ width: 320, maxWidth: "90vw" }}>
            <Typography fontWeight={700} sx={{ p: 2, pb: 1 }}>
              Interviews this week
            </Typography>
            {upcoming.length === 0 ? (
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ px: 2, pb: 2 }}
              >
                {preferences.interviewReminders
                  ? "Nothing scheduled in the next 7 days."
                  : "Interview reminders are turned off in Settings."}
              </Typography>
            ) : (
              <List dense disablePadding>
                {upcoming.map(({ job, interview, at }) => (
                  <ListItemButton
                    key={interview.id}
                    onClick={() => {
                      setAnchor(null);
                      navigate(`/applications/${job.id}`);
                    }}
                  >
                    <ListItemText
                      primary={`${job.company} · ${interview.type || "Interview"}`}
                      secondary={`${formatDate(at, "EEE, MMM d")} at ${interview.time || "—"}`}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </Box>
        </Popover>

        <Tooltip title="Profile">
          <IconButton onClick={() => navigate("/profile")} sx={{ p: 0.5 }}>
            <Avatar
              src={profile.photo || undefined}
              sx={{ bgcolor: "primary.main", fontWeight: 700 }}
            >
              {initial}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
