import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  ArrowBack,
  DeleteOutlined,
  EditOutlined,
  EventAvailable,
  OpenInNew,
} from "@mui/icons-material";

import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import StatusChip from "../components/common/StatusChip";
import JobForm from "../components/jobs/JobForm";
import InterviewDialog from "../components/jobs/InterviewDialog";
import ApplicationTimeline from "../components/jobs/ApplicationTimeline";
import { useJobs } from "../hooks/useJobs";
import { APPLICATION_STATUS } from "../constants/application";
import { formatDate } from "../utils/helpers";

const Row = ({ label, children }) =>
  children ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        py: 0.75,
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography
        component="div"
        variant="body2"
        fontWeight={600}
        sx={{ textAlign: "right" }}
      >
        {children}
      </Typography>
    </Box>
  ) : null;

const Section = ({ title, action, children }) => (
  <Card sx={{ height: "100%" }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {action}
      </Box>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

export default function ApplicationDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getJobById, updateJob, deleteJob, addNote, deleteNote } = useJobs();
  const job = getJobById(id);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [interviewDialog, setInterviewDialog] = useState({
    open: false,
    interview: null,
  });
  const [noteText, setNoteText] = useState("");

  if (!job) {
    return (
      <>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/applications")}
          sx={{ mb: 2 }}
        >
          Back to applications
        </Button>
        <EmptyState
          title="Application not found"
          message="It may have been deleted."
        />
      </>
    );
  }

  const interviews = [...job.interviews].sort((a, b) =>
    `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`)
  );

  const submitNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addNote(job.id, noteText.trim());
    setNoteText("");
  };

  return (
    <>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/applications")}
        sx={{ mb: 2 }}
      >
        Back to applications
      </Button>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}
          >
            {job.company}
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            {job.position}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <TextField
            select
            size="small"
            label="Status"
            value={job.status}
            onChange={(e) => updateJob(job.id, { status: e.target.value })}
            sx={{ minWidth: 150 }}
          >
            {APPLICATION_STATUS.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            startIcon={<EditOutlined />}
            onClick={() => setEditOpen(true)}
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlined />}
            onClick={() => setDeleteOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Details">
            <Row label="Status">
              <StatusChip status={job.status} />
            </Row>
            <Row label="Priority">{job.priority}</Row>
            <Row label="Location">{job.location}</Row>
            <Row label="Work type">{job.workType}</Row>
            <Row label="Salary">{job.salary}</Row>
            <Row label="Date applied">
              {job.dateApplied ? formatDate(job.dateApplied) : ""}
            </Row>
            <Row label="Contact">{job.contactName}</Row>
            <Row label="Contact email">
              {job.contactEmail && (
                <Link href={`mailto:${job.contactEmail}`}>
                  {job.contactEmail}
                </Link>
              )}
            </Row>
            {job.jobUrl && (
              <Button
                size="small"
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNew fontSize="small" />}
                sx={{ mt: 1 }}
              >
                View job posting
              </Button>
            )}
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section
            title="Interviews"
            action={
              <Button
                size="small"
                startIcon={<EventAvailable />}
                onClick={() =>
                  setInterviewDialog({ open: true, interview: null })
                }
              >
                Schedule
              </Button>
            }
          >
            {interviews.length === 0 ? (
              <Typography color="text.secondary">
                No interviews scheduled yet.
              </Typography>
            ) : (
              <List disablePadding>
                {interviews.map((iv) => (
                  <ListItem
                    key={iv.id}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setInterviewDialog({ open: true, interview: iv })
                        }
                      >
                        <EditOutlined fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      slotProps={{ primary: { component: "div" } }}
                      primary={
                        <>
                          {formatDate(iv.date, "EEE, MMM d")} ·{" "}
                          {iv.time || "time not set"}{" "}
                          <Chip
                            size="small"
                            label={iv.type || "Interview"}
                            sx={{ ml: 0.5 }}
                          />
                        </>
                      }
                      secondary={iv.notes}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Notes">
            <Box
              component="form"
              onSubmit={submitNote}
              sx={{ display: "flex", gap: 1, mb: 2 }}
            >
              <TextField
                size="small"
                placeholder="Add a note…"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                fullWidth
                multiline
                maxRows={4}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!noteText.trim()}
              >
                Add
              </Button>
            </Box>
            {job.notes.length === 0 ? (
              <Typography color="text.secondary">No notes yet.</Typography>
            ) : (
              <List disablePadding>
                {job.notes.map((note) => (
                  <ListItem
                    key={note.id}
                    disableGutters
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => deleteNote(job.id, note.id)}
                        aria-label="Delete note"
                      >
                        <DeleteOutlined fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={note.text}
                      secondary={formatDate(note.createdAt)}
                      slotProps={{
                        primary: { sx: { whiteSpace: "pre-wrap", pr: 4 } },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Timeline">
            <ApplicationTimeline timeline={job.timeline} />
          </Section>
        </Grid>
      </Grid>

      <JobForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editingJob={job}
      />

      <InterviewDialog
        open={interviewDialog.open}
        onClose={() => setInterviewDialog({ open: false, interview: null })}
        lockedJobId={job.id}
        jobId={job.id}
        interview={interviewDialog.interview}
      />

      <ConfirmDialog
        open={deleteOpen}
        title="Delete application"
        message={`Delete your application to ${job.company}? This can't be undone.`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteJob(job.id);
          navigate("/applications");
        }}
      />
    </>
  );
}
