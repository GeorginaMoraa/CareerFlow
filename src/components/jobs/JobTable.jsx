import { useNavigate } from "react-router-dom";
import {
  Chip,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteOutlined,
  EditOutlined,
  OpenInNew,
  VisibilityOutlined,
} from "@mui/icons-material";

import StatusChip from "../common/StatusChip";
import { formatDate } from "../../utils/helpers";

const PRIORITY_COLOR = { High: "error", Medium: "warning", Low: "default" };

export default function JobTable({ jobs, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 4 }}
    >
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Position</TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              Location
            </TableCell>
            <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
              Applied
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
              Priority
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} hover>
              <TableCell>
                <Link
                  component="button"
                  underline="hover"
                  onClick={() => navigate(`/applications/${job.id}`)}
                  sx={{ fontWeight: 700, textAlign: "left" }}
                >
                  {job.company}
                </Link>
                {job.salary && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="text.secondary"
                  >
                    {job.salary}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                {job.location || "—"}
                {job.workType && (
                  <Typography
                    variant="caption"
                    sx={{ display: "block" }}
                    color="text.secondary"
                  >
                    {job.workType}
                  </Typography>
                )}
              </TableCell>
              <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                {formatDate(job.dateApplied)}
              </TableCell>
              <TableCell>
                <StatusChip status={job.status} />
              </TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <Chip
                  size="small"
                  variant="outlined"
                  label={job.priority}
                  color={PRIORITY_COLOR[job.priority] || "default"}
                />
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                <Tooltip title="View details">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/applications/${job.id}`)}
                  >
                    <VisibilityOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
                {job.jobUrl && (
                  <Tooltip title="Open job posting">
                    <IconButton
                      size="small"
                      component="a"
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <OpenInNew fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    color="warning"
                    onClick={() => onEdit(job)}
                  >
                    <EditOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(job)}
                  >
                    <DeleteOutlined fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
