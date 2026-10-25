import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

import { useJobs } from "../../hooks/useJobs";
import { INTERVIEW_TYPES } from "../../constants/application";
import { todayISO } from "../../utils/helpers";

/**
 * Add or edit an interview.
 * - `lockedJobId`: fix the application (used on the details page).
 * - `interview` + `jobId`: edit an existing interview.
 * - `date`: pre-fill the date (used when clicking a calendar day).
 */
function Form({ lockedJobId, jobId, interview, date, onClose }) {
  const { jobs, saveInterview, deleteInterview } = useJobs();
  const [selectedJob, setSelectedJob] = useState(lockedJobId || jobId || "");
  const [data, setData] = useState({
    date: interview?.date || date || todayISO(),
    time: interview?.time || "10:00",
    type: interview?.type || INTERVIEW_TYPES[0],
    notes: interview?.notes || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!selectedJob) next.job = "Choose an application";
    if (!data.date) next.date = "Pick a date";
    setErrors(next);
    if (Object.keys(next).length) return;

    saveInterview(selectedJob, { ...interview, ...data });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <DialogTitle>
        {interview ? "Edit interview" : "Schedule interview"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {!lockedJobId && (
            <TextField
              select
              label="Application"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              disabled={Boolean(interview)}
              error={Boolean(errors.job)}
              helperText={errors.job}
              fullWidth
            >
              {jobs.map((j) => (
                <MenuItem key={j.id} value={j.id}>
                  {j.company} — {j.position}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              type="date"
              name="date"
              label="Date"
              value={data.date}
              onChange={handleChange}
              error={Boolean(errors.date)}
              helperText={errors.date}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
            <TextField
              type="time"
              name="time"
              label="Time"
              value={data.time}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
            />
          </Stack>
          <TextField
            select
            name="type"
            label="Type"
            value={data.type}
            onChange={handleChange}
            fullWidth
          >
            {INTERVIEW_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="notes"
            label="Notes"
            value={data.notes}
            onChange={handleChange}
            multiline
            minRows={2}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {interview && (
          <Button
            color="error"
            sx={{ mr: "auto" }}
            onClick={() => {
              deleteInterview(selectedJob, interview.id);
              onClose();
            }}
          >
            Delete
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </DialogActions>
    </form>
  );
}

export default function InterviewDialog({ open, onClose, ...rest }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      {open && (
        <Form
          key={`${rest.interview?.id ?? "new"}-${rest.date ?? ""}`}
          onClose={onClose}
          {...rest}
        />
      )}
    </Dialog>
  );
}
