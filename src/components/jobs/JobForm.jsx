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
import {
  APPLICATION_STATUS,
  PRIORITIES,
  WORK_TYPES,
} from "../../constants/application";
import { todayISO } from "../../utils/helpers";

const emptyJob = () => ({
  company: "",
  position: "",
  location: "",
  workType: "",
  salary: "",
  status: "Applied",
  priority: "Medium",
  dateApplied: todayISO(),
  jobUrl: "",
  contactName: "",
  contactEmail: "",
  notes: "",
});

function Form({ editingJob, onClose }) {
  const { addJob, updateJob } = useJobs();
  const [job, setJob] = useState(() =>
    editingJob ? { ...emptyJob(), ...editingJob } : emptyJob()
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!job.company.trim()) next.company = "Company is required";
    if (!job.position.trim()) next.position = "Position is required";
    if (job.jobUrl && !/^https?:\/\//i.test(job.jobUrl.trim())) {
      next.jobUrl = "Must start with http:// or https://";
    }
    if (job.contactEmail && !/^\S+@\S+\.\S+$/.test(job.contactEmail.trim())) {
      next.contactEmail = "Enter a valid email";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const clean = {
      ...job,
      company: job.company.trim(),
      position: job.position.trim(),
    };

    if (editingJob) {
      // Notes are managed on the details page when editing.
      // eslint-disable-next-line no-unused-vars
      const { notes, ...rest } = clean;
      updateJob(editingJob.id, rest);
    } else {
      addJob(clean);
    }
    onClose();
  };

  const field = (name, label, extra = {}) => (
    <TextField
      name={name}
      label={label}
      value={job[name] ?? ""}
      onChange={handleChange}
      error={Boolean(errors[name])}
      helperText={errors[name]}
      fullWidth
      {...extra}
    />
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <DialogTitle>
        {editingJob ? "Edit application" : "Add new application"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {field("company", "Company", { required: true, autoFocus: true })}
          {field("position", "Position", { required: true })}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {field("location", "Location")}
            {field("workType", "Work type", {
              select: true,
              children: [
                <MenuItem key="none" value="">
                  Not specified
                </MenuItem>,
                ...WORK_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                )),
              ],
            })}
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {field("status", "Status", {
              select: true,
              children: APPLICATION_STATUS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              )),
            })}
            {field("priority", "Priority", {
              select: true,
              children: PRIORITIES.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              )),
            })}
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {field("salary", "Salary")}
            {field("dateApplied", "Date applied", {
              type: "date",
              slotProps: { inputLabel: { shrink: true } },
            })}
          </Stack>
          {field("jobUrl", "Job posting URL")}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {field("contactName", "Recruiter / contact")}
            {field("contactEmail", "Contact email")}
          </Stack>
          {!editingJob &&
            field("notes", "Notes", { multiline: true, minRows: 3 })}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          {editingJob ? "Save changes" : "Add application"}
        </Button>
      </DialogActions>
    </form>
  );
}

export default function JobForm({ open, onClose, editingJob = null }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* Remount on open so the form always starts from fresh state. */}
      {open && (
        <Form
          key={editingJob?.id ?? "new"}
          editingJob={editingJob}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
