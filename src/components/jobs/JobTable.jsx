import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useJobs } from "../../context/JobContext";

import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDialog from "../common/ConfirmDialog";
import { STATUS_COLORS } from "../../constants/application";


export default function JobTable({ search, statusFilter, onEdit }) {
  const navigate = useNavigate();
  const { jobs, deleteJob } = useJobs();
  const [jobToDelete, setJobToDelete] = useState(null);
  const filteredJobs = jobs.filter((job)=>{

const matchesSearch=

job.company
.toLowerCase()
.includes(search.toLowerCase())

||

job.position
.toLowerCase()
.includes(search.toLowerCase());

const matchesStatus=

statusFilter==="All"

||

job.status===statusFilter;

return matchesSearch && matchesStatus;

});
  

  if (filteredJobs.length === 0) {
    return (
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Typography align="center" color="text.secondary">
          No applications yet.
          <br />
          <br />
          Click <strong>+ Add Application</strong> to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>Company</b></TableCell>
            <TableCell><b>Position</b></TableCell>
            <TableCell><b>Location</b></TableCell>
            <TableCell><b>Salary</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {filteredJobs.map((job) => (

            <TableRow key={job.id} hover>

             <TableCell
  sx={{
    cursor: "pointer",
    color: "primary.main",
    fontWeight: "bold",
  }}
  onClick={() => navigate(`/applications/${job.id}`)}
>
  {job.company}
</TableCell>

              <TableCell>{job.position}</TableCell>

              <TableCell>{job.location}</TableCell>

              <TableCell>{job.salary}</TableCell>

              <TableCell>
                <Chip
    label={job.status}
    color={STATUS_COLORS[job.status]}
/>
              </TableCell>

              <TableCell align="center">

  <IconButton
    color="primary"
    onClick={() => navigate(`/applications/${job.id}`)}
  >
    <VisibilityIcon />
  </IconButton>

  <IconButton
  color="warning"
  onClick={() => onEdit(job)}
>
  <EditIcon />
</IconButton>

  <IconButton
    color="error"
    onClick={() => setJobToDelete(job)}
  >
    <DeleteIcon />
  </IconButton>
  <ConfirmDialog
  open={Boolean(jobToDelete)}
  title="Delete Application"
  message={
    jobToDelete
      ? `Are you sure you want to delete your application to ${jobToDelete.company}?`
      : ""
  }
  onCancel={() => setJobToDelete(null)}
  onConfirm={() => {
    deleteJob(jobToDelete.id);
    setJobToDelete(null);
  }}
/>

</TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
}