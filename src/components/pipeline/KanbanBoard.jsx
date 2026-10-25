import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Box } from "@mui/material";

import KanbanColumn from "./KanbanColumn";
import JobCard from "./JobCard";
import { useJobs } from "../../hooks/useJobs";
import { APPLICATION_STATUS } from "../../constants/application";

export default function KanbanBoard() {
  const { jobs, updateJobStatus } = useJobs();
  const [activeId, setActiveId] = useState(null);

  // A small drag distance lets a plain click still open the details page.
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 },
    })
  );

  const activeJob = jobs.find((j) => j.id === activeId);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (over && APPLICATION_STATUS.includes(over.id)) {
      updateJobStatus(active.id, over.id);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <Box
        sx={{
          display: "grid",
          gap: 2,
          alignItems: "start",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(5, minmax(0, 1fr))",
          },
        }}
      >
        {APPLICATION_STATUS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={jobs.filter((job) => job.status === status)}
          />
        ))}
      </Box>

      <DragOverlay>
        {activeJob ? <JobCard job={activeJob} dragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
