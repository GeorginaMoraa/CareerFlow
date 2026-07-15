import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Calendar as CalendarIcon, Plus, X } from "lucide-react";
import { useJobs } from "../context/JobContext";
import Layout from "../components/layout/Layout";

// Simple calendar implementation
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { jobs } = useJobs();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      date: new Date().toISOString().split("T")[0],
      title: "Google Interview",
      type: "interview",
      time: "10:00 AM",
      company: "Google",
    },
    {
      id: 2,
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      title: "Amazon Assessment",
      type: "assessment",
      time: "2:00 PM",
      company: "Amazon",
    },
  ]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "interview",
    time: "",
    company: "",
  });

  // Get calendar days
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setOpenDialog(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time || !selectedDate) return;

    const event = {
      id: Date.now(),
      date: selectedDate,
      ...newEvent,
    };

    setEvents([...events, event]);
    setNewEvent({ title: "", type: "interview", time: "", company: "" });
    setOpenDialog(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e.id !== eventId));
  };

  const getEventsForDate = (date) => {
    return events.filter((e) => e.date === date);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "interview":
        return theme.palette.primary.main;
      case "assessment":
        return theme.palette.warning.main;
      case "offer":
        return theme.palette.success.main;
      case "followup":
        return theme.palette.info.main;
      default:
        return theme.palette.secondary.main;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "interview":
        return "Interview";
      case "assessment":
        return "Assessment";
      case "offer":
        return "Offer";
      case "followup":
        return "Follow-up";
      default:
        return type;
    }
  };

  return (
    <Layout>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="700" gutterBottom>
          Calendar
        </Typography>
        <Typography color="text.secondary" variant="body2">
          Track interviews, assessments, and important dates
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Calendar */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {/* Month Navigation */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Button size="small" onClick={handlePrevMonth}>
                  ← Previous
                </Button>
                <Typography variant="h6" fontWeight="bold">
                  {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Typography>
                <Button size="small" onClick={handleNextMonth}>
                  Next →
                </Button>
              </Box>

              {/* Day headers */}
              <Box
                display="grid"
                gridTemplateColumns="repeat(7, 1fr)"
                gap={1}
                mb={2}
              >
                {DAYS_OF_WEEK.map((day) => (
                  <Box key={day} textAlign="center">
                    <Typography variant="caption" fontWeight="bold">
                      {day}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Calendar days */}
              <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
                {calendarDays.map((day, index) => {
                  const dateStr =
                    day &&
                    `${currentDate.getFullYear()}-${String(
                      currentDate.getMonth() + 1
                    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayEvents = day ? getEventsForDate(dateStr) : [];
                  const isCurrentDay = day && isToday(day);

                  return (
                    <Box
                      key={index}
                      onClick={() => day && handleDateClick(day)}
                      sx={{
                        aspectRatio: "1",
                        p: 1,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        cursor: day ? "pointer" : "default",
                        backgroundColor: isCurrentDay
                          ? theme.palette.primary.light
                          : "transparent",
                        "&:hover": day
                          ? { backgroundColor: theme.palette.action.hover }
                          : {},
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      {day && (
                        <>
                          <Typography
                            variant="caption"
                            fontWeight="bold"
                            color={
                              isCurrentDay ? "primary.contrastText" : "inherit"
                            }
                          >
                            {day}
                          </Typography>
                          {dayEvents.length > 0 && (
                            <Box mt={0.5} flex={1} overflow="hidden">
                              {dayEvents.slice(0, 2).map((event) => (
                                <Box
                                  key={event.id}
                                  sx={{
                                    fontSize: "0.65rem",
                                    backgroundColor: getTypeColor(event.type),
                                    color: "white",
                                    p: 0.25,
                                    borderRadius: 0.5,
                                    mb: 0.25,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {event.title}
                                </Box>
                              ))}
                              {dayEvents.length > 2 && (
                                <Typography variant="caption" color="text.secondary">
                                  +{dayEvents.length - 2} more
                                </Typography>
                              )}
                            </Box>
                          )}
                        </>
                      )}
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="bold">
                  Upcoming Events
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setOpenDialog(true)}
                  startIcon={<Plus size={16} />}
                >
                  Add
                </Button>
              </Box>

              <Box>
                {events
                  .filter((e) => e.date >= new Date().toISOString().split("T")[0])
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 5)
                  .map((event) => (
                    <Box
                      key={event.id}
                      mb={2}
                      p={2}
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        borderLeft: `4px solid ${getTypeColor(event.type)}`,
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" fontWeight="bold">
                          {event.title}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleDeleteEvent(event.id)}
                          sx={{ minWidth: "auto", p: 0 }}
                        >
                          <X size={16} />
                        </Button>
                      </Box>
                      <Chip
                        label={getTypeLabel(event.type)}
                        size="small"
                        sx={{
                          backgroundColor: getTypeColor(event.type),
                          color: "white",
                          mb: 1,
                        }}
                      />
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">
                          {new Date(event.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.time}
                        </Typography>
                      </Box>
                      {event.company && (
                        <Typography variant="caption" color="primary" mt={0.5} display="block">
                          {event.company}
                        </Typography>
                      )}
                    </Box>
                  ))}

                {events.filter(
                  (e) => e.date >= new Date().toISOString().split("T")[0]
                ).length === 0 && (
                  <Typography color="text.secondary" variant="body2" textAlign="center">
                    No upcoming events
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            margin="normal"
            placeholder="e.g., Google Interview"
          />
          <TextField
            fullWidth
            select
            label="Event Type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            margin="normal"
          >
            <MenuItem value="interview">Interview</MenuItem>
            <MenuItem value="assessment">Assessment</MenuItem>
            <MenuItem value="offer">Offer</MenuItem>
            <MenuItem value="followup">Follow-up</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Company (optional)"
            value={newEvent.company}
            onChange={(e) => setNewEvent({ ...newEvent, company: e.target.value })}
            margin="normal"
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block" }}>
            Date: {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Select a date"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEvent}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}