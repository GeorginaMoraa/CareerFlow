import {
  Paper,
  Typography,
} from "@mui/material";

import JobCard from "./JobCard";

export default function KanbanColumn({
  title,
  jobs,
}) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        minHeight: 500,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        {title} ({jobs.length})
      </Typography>

      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
        />
      ))}
    </Paper>
  );
}