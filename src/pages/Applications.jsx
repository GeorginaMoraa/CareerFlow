import { useState } from "react";

import Layout from "../components/layout/Layout";
import JobForm from "../components/jobs/JobForm";
import JobTable from "../components/jobs/JobTable";

import {
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";

export default function Applications() {

  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAdd = () => {
  setEditingJob(null);
  setOpen(true);
};

const handleEdit = (job) => {
  setEditingJob(job);
  setOpen(true);
};

  return (
    <Layout>

      <Box
        display="flex"
        justifyContent="space-between"
        mb={4}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Applications
        </Typography>
        <br />
        <Box 
        display="flex" 
        gap={2}
        mb={3}
        >
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            select
            label="Status"
            variant="outlined"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 180 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Assessment">Assessment</MenuItem>
            <MenuItem value="Offer">Offer</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </Box>

<br />
        <Button
  variant="contained"
  onClick={handleAdd}
>
  + Add Application
</Button>
      </Box>
<br />
      <JobForm
        open={open}
        handleClose={() => setOpen(false)}
        editingJob={editingJob}
        setEditingJob={setEditingJob}
      />
      <Box mt={4}>
        <JobTable search={search} statusFilter={statusFilter} onEdit={handleEdit} />
      </Box>

    </Layout>
  );
}