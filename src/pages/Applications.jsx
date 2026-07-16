import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Plus } from "lucide-react";
import Layout from "../components/layout/Layout";
import JobForm from "../components/jobs/JobForm";
import JobTable from "../components/jobs/JobTable";

// ✅ FIXED: Clean, organized layout structure
export default function Applications() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleCloseForm = () => {
    setOpen(false);
    setEditingJob(null);
  };

  const statusOptions = [
    { value: "All", label: "All Status" },
    { value: "Applied", label: "Applied" },
    { value: "Interview", label: "Interview" },
    { value: "Assessment", label: "Assessment" },
    { value: "Offer", label: "Offer" },
    { value: "Rejected", label: "Rejected" },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <Box mb={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          mb={3}
          flexDirection={isMobile ? "column" : "row"}
        >
          <div>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              gutterBottom
            >
              Applications
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Track and manage your job applications in one place
            </Typography>
          </div>

          <Button
            variant="contained"
            startIcon={<Plus size={20} />}
            onClick={handleAdd}
            sx={{
              alignSelf: isMobile ? "stretch" : "auto",
              whiteSpace: "nowrap",
            }}
          >
            Add Application
          </Button>
        </Box>

        {/* Filters Section */}
        <Box
          display="flex"
          gap={2}
          flexDirection={isMobile ? "column" : "row"}
          sx={{
            p: 2,
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: theme.shape.borderRadius / 2,
            border: "1px solid rgba(255, 255, 255, 0.4)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <TextField
            label="Search by company or position"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g., Google, Software Engineer"
            sx={{
              flex: isMobile ? 1 : 1.5,
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.shape.borderRadius / 2,
              },
            }}
          />

          <TextField
            select
            label="Filter by status"
            variant="outlined"
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: "160px",
              "& .MuiOutlinedInput-root": {
                borderRadius: theme.shape.borderRadius / 2,
              },
            }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Clear Filters Button */}
          {(search || statusFilter !== "All") && (
            <Box display="flex" alignItems="center">
              <Chip
                label="Clear filters"
                onDelete={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                size="small"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Job Form Modal */}
      <JobForm
        open={open}
        handleClose={handleCloseForm}
        editingJob={editingJob}
        setEditingJob={setEditingJob}
      />

      {/* Job Table */}
      <Box mt={4}>
        <JobTable
          search={search}
          statusFilter={statusFilter}
          onEdit={handleEdit}
        />
      </Box>
    </Layout>
  );
}
