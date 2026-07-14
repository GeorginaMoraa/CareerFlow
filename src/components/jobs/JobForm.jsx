import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import { useJobs } from "../../context/JobContext";
import { APPLICATION_STATUS } from "../../constants/application";

const statuses = APPLICATION_STATUS;

const defaultJob = {
  company: "",
  position: "",
  location: "",
  salary: "",
  status: "Applied",
  dateApplied: "",
  notes: "",
};

export default function JobForm({
  open,
  handleClose,
  editingJob = null,
}) {
  const { addJob, updateJob } = useJobs();

  const [job, setJob] = useState(defaultJob);

  useEffect(() => {
    if (editingJob) {
      setJob(editingJob);
    } else {
      setJob(defaultJob);
    }
  }, [editingJob, open]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (editingJob) {
      updateJob({
        ...job,
        updatedAt: new Date().toISOString(),
      });
    } else {
      addJob(job);
    }

    setJob(defaultJob);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {editingJob ? "Edit Application" : "Add New Application"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Company"
            name="company"
            value={job.company}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Position"
            name="position"
            value={job.position}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Location"
            name="location"
            value={job.location}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Salary"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Status"
            name="status"
            value={job.status}
            onChange={handleChange}
            fullWidth
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            type="date"
            label="Date Applied"
            name="dateApplied"
            value={job.dateApplied}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            multiline
            rows={4}
            label="Notes"
            name="notes"
            value={job.notes}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editingJob ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
