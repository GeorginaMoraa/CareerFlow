import { Box } from "@mui/material";
import { useJobs } from "../../context/JobContext";
import KanbanColumn from "./KanbanColumn";
import { DndContext } from "@dnd-kit/core";

const columns = ["Applied", "Assessment", "Interview", "Offer", "Rejected"];

export default function KanbanBoard() {
  const { jobs, updateJobStatus } = useJobs();

  const handleDragEnd = (event) => {
    console.log("Drag ended", event);

    const { active, over } = event;

    if (!over) return;

    updateJobStatus(active.id, over.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(5, 1fr)",
          },
          gap: 3,
        }}
      >
        {columns.map((column) => (
          <KanbanColumn
            key={column}
            title={column}
            jobs={jobs.filter((job) => job.status === column)}
          />
        ))}
      </Box>
    </DndContext>
  );
}
