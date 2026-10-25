import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useNavigate } from "react-router-dom";
import { Box, Chip, Paper, Typography } from "@mui/material";

import JobCard from "./JobCard";
import { STATUS_HEX } from "../../constants/application";

function DraggableJob({ job }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: job.id,
  });

  return (
    <JobCard
      ref={setNodeRef}
      job={job}
      onOpen={() => navigate(`/applications/${job.id}`)}
      style={{ opacity: isDragging ? 0.35 : 1 }}
      {...attributes}
      {...listeners}
    />
  );
}

export default function KanbanColumn({ status, jobs }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Paper
      ref={setNodeRef}
      variant="outlined"
      sx={{
        p: 1.5,
        borderRadius: 3,
        minHeight: 420,
        bgcolor: isOver ? "action.hover" : "background.paper",
        borderColor: isOver ? STATUS_HEX[status] : "divider",
        borderTop: `4px solid ${STATUS_HEX[status]}`,
        transition: "background-color .15s, border-color .15s",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography fontWeight={700}>{status}</Typography>
        <Chip size="small" label={jobs.length} />
      </Box>

      {jobs.map((job) => (
        <DraggableJob key={job.id} job={job} />
      ))}

      {jobs.length === 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", py: 4 }}
        >
          Drop applications here
        </Typography>
      )}
    </Paper>
  );
}
