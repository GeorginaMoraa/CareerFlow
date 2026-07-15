import {
  Paper,
  Typography,
} from "@mui/material";

import JobCard from "./JobCard";
import { useDroppable } from "@dnd-kit/core";

export default function KanbanColumn({
  title,
  jobs,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });
  return (
    <Paper
      ref={setNodeRef}
      sx={{
    p:2,
    borderRadius:3,
    minHeight:500,

    backgroundColor: isOver
        ? "#E3F2FD"
        : "background.paper",

    transition:"0.2s",
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