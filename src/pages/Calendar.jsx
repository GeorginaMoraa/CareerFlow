import { Box, Typography, Card, CardContent, Chip } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Layout from "../components/layout/Layout";
import { useJobs } from "../context/JobContext";

const cardSx = {
  borderRadius: 4,
  background: "rgba(255, 255, 255, 0.7)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  boxShadow:
    "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
};

export default function Calendar() {
  const { jobs } = useJobs();

  const events = jobs.flatMap((job) =>
    (job.interviews || []).map((interview) => ({
      id: `${job.id}-${interview.date}`,
      title: `${job.company} Interview`,
      date: interview.date,
      backgroundColor: "#10B981",
      borderColor: "#10B981",
      extendedProps: {
        company: job.company,
        position: job.position,
        time: interview.time || "Time not set",
      },
    }))
  );

  return (
    <Layout>
      <Box mb={4}>
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
          Calendar
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          Manage interviews and career events.
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
                },
                "& .fc-button:hover": {
                  background:
                    "linear-gradient(135deg, #059669 0%, #047857 100%)",
                },
                "& .fc-button:focus": {
                  boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.3)",
                },
                "& .fc-button-active": {
                  background: "#047857 !important",
                },
                "& .fc-toolbar-title": {
                  color: "#111827",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                },
                "& .fc-daygrid-day": {
                  minHeight: "110px",
                },
                "& .fc-daygrid-day-number": {
                  color: "#1F2937",
                },
                "& .fc-col-header-cell-cushion": {
                  color: "#6B7280",
                  fontWeight: 600,
                },
                "& .fc-day-today": {
                  background: "rgba(16, 185, 129, 0.08) !important",
                },
                "& .fc-event": {
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 500,
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
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="700px"
                events={events}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "",
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* UPCOMING EVENTS */}
        <Card sx={{ width: { xs: "100%", lg: 350 }, ...cardSx }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
              sx={{
                color: "#111827",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 4,
                  height: 20,
                  background:
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  borderRadius: 1,
                }}
              />
              Upcoming Events
            </Typography>

            {events.length === 0 ? (
              <Typography color="text.secondary">No upcoming events</Typography>
            ) : (
              events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 5)
                .map((event) => (
                  <Box
                    key={event.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      background: "rgba(16, 185, 129, 0.06)",
                      borderRadius: 3,
                      borderLeft: "4px solid #10B981",
                      transition: "all 0.2s ease",
                      "&:hover": { background: "rgba(16, 185, 129, 0.1)" },
                    }}
                  >
                    <Typography fontWeight={700} color="#111827">
                      {event.extendedProps.company}
                    </Typography>

                    <Typography variant="body2" color="#1F2937">
                      {event.extendedProps.position}
                    </Typography>

                    <Chip
                      label="Interview"
                      size="small"
                      sx={{
                        mt: 1,
                        background: "rgba(16, 185, 129, 0.15)",
                        color: "#059669",
                        fontWeight: 600,
                      }}
                    />

                    <Typography
                      variant="caption"
                      display="block"
                      mt={1}
                      color="text.secondary"
                    >
                      {event.date} {" • "} {event.extendedProps.time}
                    </Typography>
                  </Box>
                ))
            )}
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}
