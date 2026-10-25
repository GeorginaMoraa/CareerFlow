import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Add, FileDownloadOutlined, WorkOutlined } from "@mui/icons-material";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import JobForm from "../components/jobs/JobForm";
import JobTable from "../components/jobs/JobTable";
import { useJobs } from "../hooks/useJobs";
import { APPLICATION_STATUS } from "../constants/application";
import { downloadFile, jobsToCSV } from "../utils/helpers";

const SORTS = {
  newest: {
    label: "Newest first",
    fn: (a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""),
  },
  oldest: {
    label: "Oldest first",
    fn: (a, b) => (a.createdAt || "").localeCompare(b.createdAt || ""),
  },
  company: {
    label: "Company A–Z",
    fn: (a, b) => a.company.localeCompare(b.company),
  },
  status: {
    label: "Status",
    fn: (a, b) =>
      APPLICATION_STATUS.indexOf(a.status) -
      APPLICATION_STATUS.indexOf(b.status),
  },
};

export default function Applications() {
  const { jobs, deleteJob, loadSampleData } = useJobs();
  const [searchParams, setSearchParams] = useSearchParams();

  const [formOpen, setFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  // The search text lives in the URL so the top-bar search can drive it.
  const search = searchParams.get("q") || "";
  const setSearch = (value) =>
    setSearchParams(value ? { q: value } : {}, { replace: true });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs
      .filter((job) => {
        const matchesSearch =
          !q ||
          [job.company, job.position, job.location].some((v) =>
            (v || "").toLowerCase().includes(q)
          );
        return (
          matchesSearch &&
          (statusFilter === "All" || job.status === statusFilter)
        );
      })
      .sort(SORTS[sort].fn);
  }, [jobs, search, statusFilter, sort]);

  const openAdd = () => {
    setEditingJob(null);
    setFormOpen(true);
  };
  const openEdit = (job) => {
    setEditingJob(job);
    setFormOpen(true);
  };

  const hasFilters = search || statusFilter !== "All";

  return (
    <>
      <PageHeader
        title="Applications"
        subtitle="Track and manage your job applications in one place"
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadOutlined />}
              disabled={jobs.length === 0}
              onClick={() =>
                downloadFile(
                  "careerflow-applications.csv",
                  jobsToCSV(jobs),
                  "text/csv"
                )
              }
            >
              Export CSV
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={openAdd}>
              Add application
            </Button>
          </Box>
        }
      />

      {jobs.length === 0 ? (
        <EmptyState
          icon={<WorkOutlined />}
          title="No applications yet"
          message="Add your first application, or load some sample data to explore CareerFlow."
        >
          <Button variant="contained" startIcon={<Add />} onClick={openAdd}>
            Add application
          </Button>
          <Button variant="outlined" onClick={loadSampleData}>
            Load sample data
          </Button>
        </EmptyState>
      ) : (
        <>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 3,
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <TextField
              size="small"
              label="Search"
              placeholder="Company, position or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, minWidth: 220 }}
            />
            <TextField
              select
              size="small"
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="All">All statuses</MenuItem>
              {APPLICATION_STATUS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label="Sort by"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
            {hasFilters && (
              <Chip
                label="Clear filters"
                onDelete={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                variant="outlined"
              />
            )}
          </Paper>

          {filtered.length === 0 ? (
            <EmptyState
              title="No matching applications"
              message="Try a different search or clear the filters."
            />
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" mb={1.5}>
                Showing {filtered.length} of {jobs.length}
              </Typography>
              <JobTable
                jobs={filtered}
                onEdit={openEdit}
                onDelete={setJobToDelete}
              />
            </>
          )}
        </>
      )}

      <JobForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        editingJob={editingJob}
      />

      <ConfirmDialog
        open={Boolean(jobToDelete)}
        title="Delete application"
        message={
          jobToDelete
            ? `Delete your application to ${jobToDelete.company}? This can't be undone.`
            : ""
        }
        onCancel={() => setJobToDelete(null)}
        onConfirm={() => {
          if (jobToDelete) deleteJob(jobToDelete.id);
          setJobToDelete(null);
        }}
      />
    </>
  );
}
