import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import PageHeader from "../components/common/PageHeader";
import InterviewDialog from "../components/jobs/InterviewDialog";
import { useJobs } from "../hooks/useJobs";

export default function Calendar() {
  const { jobs } = useJobs();
  const theme = useTheme();
  const [dialog, setDialog] = useState({ open: false });

  const events = useMemo(
    () =>
      jobs.flatMap((job) =>
        job.interviews.map((interview) => ({
          id: interview.id,
          title: `${interview.time ? `${interview.time} ` : ""}${job.company}`,
          start: interview.date,
          allDay: true,
          backgroundColor: "#10B981",
          borderColor: "#10B981",
          extendedProps: { jobId: job.id, interview },
        }))
      ),
    [jobs]
  );

  const openNew = (date) => setDialog({ open: true, date });

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle="Interviews across all your applications. Click a day to schedule one."
        action={
          <Button
            variant="contained"
            startIcon={<Add />}
            disabled={jobs.length === 0}
            onClick={() => openNew(undefined)}
          >
            Schedule interview
          </Button>
        }
      />

      {jobs.length === 0 && (
        <Typography color="text.secondary" mb={2}>
          Add an application first, then you can schedule interviews here.
        </Typography>
      )}

      <Card>
        <CardContent
          sx={{
            "& .fc": {
              "--fc-border-color": theme.palette.divider,
              "--fc-page-bg-color": "transparent",
              "--fc-neutral-bg-color": theme.palette.action.hover,
              "--fc-today-bg-color": "rgba(16,185,129,0.12)",
              "--fc-button-bg-color": "#10B981",
              "--fc-button-border-color": "#10B981",
              "--fc-button-hover-bg-color": "#059669",
              "--fc-button-hover-border-color": "#059669",
              "--fc-button-active-bg-color": "#047857",
              "--fc-button-active-border-color": "#047857",
              fontFamily: "inherit",
            },
            "& .fc a": { color: "inherit", textDecoration: "none" },
            "& .fc-event": { cursor: "pointer", color: "#fff" },
          }}
        >
          <Box>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="auto"
              events={events}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              dayMaxEvents={3}
              dateClick={(info) => jobs.length && openNew(info.dateStr)}
              eventClick={({ event }) =>
                setDialog({
                  open: true,
                  jobId: event.extendedProps.jobId,
                  interview: event.extendedProps.interview,
                })
              }
            />
          </Box>
        </CardContent>
      </Card>

      <InterviewDialog
        open={dialog.open}
        onClose={() => setDialog({ open: false })}
        jobId={dialog.jobId}
        interview={dialog.interview}
        date={dialog.date}
      />
    </>
  );
}
