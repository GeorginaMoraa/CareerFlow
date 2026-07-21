import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";

const cardSx = {
  borderRadius: 3,
  background: "#FFFFFF",
  border: "1px solid rgba(229, 231, 235, 0.8)",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
};

export default function Calendar() {
  const { jobs, updateJob } = useJobs();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openEventDetail, setOpenEventDetail] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editingInterview, setEditingInterview] = useState(null);
  const [formData, setFormData] = useState({
    jobId: "",
    date: "",
    time: "10:00",
  });

  const events = jobs.flatMap((job) =>
    (job.interviews || []).map((interview) => ({
      id: `${job.id}-${interview.date}`,
      title: `${job.company} Interview`,
      date: interview.date,
      backgroundColor: "#10B981",
      borderColor: "#10B981",
      textColor: "#ffffff",
      extendedProps: {
        company: job.company,
        position: job.position,
        time: interview.time || "Time not set",
        jobId: job.id,
        interviewDate: interview.date,
      },
    }))
  );

  // Handle event click
  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setOpenEventDetail(true);
  };

  // Handle delete event
  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    const jobId = selectedEvent.extendedProps.jobId;
    const job = jobs.find((j) => j.id === jobId);

    if (job && job.interviews) {
      const updatedInterviews = job.interviews.filter(
        (interview) =>
          interview.date !== selectedEvent.extendedProps.interviewDate
      );
      updateJob(jobId, { interviews: updatedInterviews });
    }

    setOpenEventDetail(false);
    setSelectedEvent(null);
  };

  // Handle edit event
  const handleEditEvent = () => {
    if (!selectedEvent) return;
    setEditingInterview(selectedEvent);
    setFormData({
      jobId: selectedEvent.extendedProps.jobId,
      date: selectedEvent.extendedProps.interviewDate,
      time: selectedEvent.extendedProps.time,
    });
    setOpenEventDetail(false);
    setOpenAddDialog(true);
  };

  // Handle add/edit interview
  const handleSaveInterview = () => {
    if (!formData.jobId || !formData.date || !formData.time) {
      alert("Please fill in all fields");
      return;
    }

    const job = jobs.find((j) => j.id === formData.jobId);
    if (!job) return;

    let updatedInterviews = job.interviews || [];

    if (editingInterview) {
      // Update existing interview
      updatedInterviews = updatedInterviews.map((interview) =>
        interview.date === editingInterview.extendedProps.interviewDate
          ? { date: formData.date, time: formData.time }
          : interview
      );
    } else {
      // Add new interview
      updatedInterviews.push({ date: formData.date, time: formData.time });
    }

    updateJob(formData.jobId, { interviews: updatedInterviews });

    // Reset form
    setFormData({ jobId: "", date: "", time: "10:00" });
    setEditingInterview(null);
    setOpenAddDialog(false);
  };

  const handleCloseEventDetail = () => {
    setOpenEventDetail(false);
    setSelectedEvent(null);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setEditingInterview(null);
    setFormData({ jobId: "", date: "", time: "10:00" });
  };

  const upcomingEvents = events
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .filter((event) => new Date(event.date) >= new Date());

  return (
    <Layout>
      <Box mb={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#111827",
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Interview Calendar
          </Typography>

          <Tooltip title="Schedule an interview">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddDialog(true)}
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                color: "white",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                },
              }}
            >
              Schedule Interview
            </Button>
          </Tooltip>
        </Box>

        <Typography color="text.secondary" mt={0.5}>
          View and manage all your upcoming interviews in one place.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        {/* MAIN CALENDAR */}
        <Card sx={{ flex: 1, ...cardSx }}>
          <CardContent>
            <Box
              sx={{
                "& .fc-button": {
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  border: "none",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  boxShadow: "0 2px 8px rgba(16, 185, 129, 0.2)",
                  fontSize: "0.875rem",
                  padding: "6px 12px",
                  transition: "all 0.2s ease",
                },
                "& .fc-button:hover": {
                  background:
                    "linear-gradient(135deg, #059669 0%, #047857 100%)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  transform: "translateY(-1px)",
                },
                "& .fc-button:focus": {
                  boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.3)",
                  outline: "none",
                },
                "& .fc-button-active": {
                  background: "#047857 !important",
                },
                "& .fc-button-primary:not(:disabled).fc-button-active": {
                  background: "#047857 !important",
                  borderColor: "#047857 !important",
                },
                "& .fc-toolbar-title": {
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                },
                "& .fc-daygrid-day": {
                  minHeight: "110px",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                },
                "& .fc-daygrid-day:hover": {
                  background: "rgba(16, 185, 129, 0.05)",
                },
                "& .fc-daygrid-day-number": {
                  color: "#1F2937",
                  fontWeight: 500,
                },
                "& .fc-col-header-cell": {
                  background: "rgba(16, 185, 129, 0.04)",
                },
                "& .fc-col-header-cell-cushion": {
                  color: "#059669",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                },
                "& .fc-day-today": {
                  background: "rgba(16, 185, 129, 0.1) !important",
                },
                "& .fc-day-today .fc-daygrid-day-number": {
                  background: "#10B981",
                  color: "white",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                },
                "& .fc-event": {
                  borderRadius: "6px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  padding: "2px 6px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(16, 185, 129, 0.15)",
                },
                "& .fc-event:hover": {
                  boxShadow: "0 4px 8px rgba(16, 185, 129, 0.3)",
                  transform: "translateY(-1px)",
                },
                "& .fc-event-title": {
                  whiteSpace: "normal",
                  overflow: "visible",
                },
                "& .fc-theme-standard td, & .fc-theme-standard th": {
                  borderColor: "rgba(229, 231, 235, 0.6)",
                },
                "& .fc-theme-standard .fc-scrollgrid": {
                  borderColor: "rgba(229, 231, 235, 0.6)",
                },
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="700px"
                events={events}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "",
                }}
                eventClick={handleEventClick}
                eventDisplay="block"
                dayMaxEvents={true}
                dayMaxEventRows={3}
              />
            </Box>
          </CardContent>
        </Card>

        {/* UPCOMING EVENTS SIDEBAR */}
        <Card sx={{ width: { xs: "100%", lg: 380 }, ...cardSx }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 24,
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: 1,
                }}
              />
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: "#111827" }}
              >
                Upcoming Events
              </Typography>
              <Chip
                label={upcomingEvents.length}
                size="small"
                sx={{
                  ml: "auto",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#059669",
                  fontWeight: 700,
                }}
              />
            </Box>

            <Divider sx={{ mb: 2, opacity: 0.5 }} />

            {upcomingEvents.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography color="text.secondary" variant="body2">
                  No upcoming interviews scheduled.
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                  display="block"
                  mt={1}
                >
                  Click "Schedule Interview" to add one
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {upcomingEvents.slice(0, 8).map((event) => (
                  <Box
                    key={event.id}
                    onClick={() => {
                      setSelectedEvent(event);
                      setOpenEventDetail(true);
                    }}
                    sx={{
                      p: 2.5,
                      background: "rgba(16, 185, 129, 0.05)",
                      borderRadius: 2.5,
                      borderLeft: "4px solid #10B981",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      "&:hover": {
                        background: "rgba(16, 185, 129, 0.12)",
                        borderLeftColor: "#059669",
                        transform: "translateX(4px)",
                        boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
                      },
                    }}
                  >
                    <Typography
                      fontWeight={700}
                      color="#111827"
                      sx={{
                        fontSize: "0.95rem",
                        mb: 0.5,
                      }}
                    >
                      {event.extendedProps.company}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="#4B5563"
                      sx={{ mb: 0.75, fontSize: "0.85rem" }}
                    >
                      {event.extendedProps.position}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <Chip
                        label="Interview"
                        size="small"
                        sx={{
                          background: "rgba(16, 185, 129, 0.2)",
                          color: "#059669",
                          fontWeight: 600,
                          height: "20px",
                          fontSize: "0.75rem",
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>

                    <Typography
                      variant="caption"
                      display="block"
                      mt={1}
                      color="#059669"
                      fontWeight={600}
                    >
                      {event.extendedProps.time}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* EVENT DETAILS DIALOG */}
      <Dialog
        open={openEventDetail}
        onClose={handleCloseEventDetail}
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(16, 185, 129, 0.03) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(16, 185, 129, 0.1)",
          },
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                pb: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>Interview Details</span>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ pt: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  Company
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#111827"
                  sx={{ mt: 0.5 }}
                >
                  {selectedEvent.extendedProps.company}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  Position
                </Typography>
                <Typography variant="body1" color="#4B5563" sx={{ mt: 0.5 }}>
                  {selectedEvent.extendedProps.position}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  Date
                </Typography>
                <Typography
                  variant="body1"
                  color="#111827"
                  fontWeight={600}
                  sx={{ mt: 0.5 }}
                >
                  {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  Time
                </Typography>
                <Typography
                  variant="body1"
                  color="#059669"
                  fontWeight={700}
                  sx={{ mt: 0.5 }}
                >
                  {selectedEvent.extendedProps.time}
                </Typography>
              </Box>

              <Chip
                label="Interview"
                sx={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#059669",
                  fontWeight: 600,
                }}
              />
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={handleCloseEventDetail}
                sx={{
                  color: "#059669",
                  fontWeight: 600,
                  "&:hover": {
                    background: "rgba(16, 185, 129, 0.1)",
                  },
                }}
              >
                Close
              </Button>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Edit this interview">
                  <IconButton
                    onClick={handleEditEvent}
                    sx={{
                      color: "#10B981",
                      "&:hover": { background: "rgba(16, 185, 129, 0.1)" },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete this interview">
                  <IconButton
                    onClick={handleDeleteEvent}
                    sx={{
                      color: "#EF4444",
                      "&:hover": { background: "rgba(239, 68, 68, 0.1)" },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ADD/EDIT INTERVIEW DIALOG */}
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(16, 185, 129, 0.03) 100%)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(16, 185, 129, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            pb: 1,
          }}
        >
          {editingInterview ? "Edit Interview" : "Schedule Interview"}
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <FormControl fullWidth>
            <InputLabel>Select Position</InputLabel>
            <Select
              value={formData.jobId}
              onChange={(e) =>
                setFormData({ ...formData, jobId: e.target.value })
              }
              label="Select Position"
            >
              {jobs.map((job) => (
                <MenuItem key={job.id} value={job.id}>
                  {job.company} - {job.position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Interview Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="Interview Time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseAddDialog}
            sx={{
              color: "#6B7280",
              fontWeight: 600,
              "&:hover": {
                background: "rgba(107, 114, 128, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveInterview}
            sx={{
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              color: "white",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
              },
            }}
          >
            {editingInterview ? "Update Interview" : "Schedule Interview"}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
